"use client";

import { useRef, useEffect, useCallback } from "react";
import { CircleChartLogic } from "./logic";
import { CircleChartElement } from "./types";
import styles from "./CircleChart.module.scss";
import { useInView } from "react-intersection-observer";

type CircleChartProps = {
  width: number;
  height: number;
  scale?: number;
  elements: CircleChartElement[];
  gapBetweenElements?: number;
  labelsDistance?: number;
};

const CircleChart = ({ width, height, scale = 0.75, elements, gapBetweenElements = 0.75, labelsDistance = 2 }: CircleChartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const circleChartLogicRef = useRef<CircleChartLogic | null>(null);
  const { ref: containerRefIntersectionObserver, inView } = useInView();

  // We set the 2 refs in a useCallback that will set the HTML ref used to contain the Threejs canvas and the IntersectionObserver ref
  const setContainerDoubleRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      containerRefIntersectionObserver(node);
    },
    [containerRefIntersectionObserver]
  );

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    circleChartLogicRef.current = new CircleChartLogic(containerRef, width, height, scale, elements, gapBetweenElements, styles, labelsDistance);

    return () => {
      circleChartLogicRef.current && circleChartLogicRef.current.destroy();
    };
  }, [containerRef, width, height, scale, elements, gapBetweenElements, labelsDistance]);

  useEffect(() => {
    if (inView && circleChartLogicRef.current) {
      circleChartLogicRef.current.enable();
    } else if (!inView && circleChartLogicRef.current) {
      circleChartLogicRef.current.disable();
    }
  }, [inView]);

  return <div className={styles.circlechart} ref={setContainerDoubleRefs}></div>;
};

export default CircleChart;
