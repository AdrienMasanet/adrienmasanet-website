import { useRef, useEffect } from "react";
import { CircleChartLogic } from "./logic";
import { CircleChartElement } from "./types";
import styles from "./CircleChart.module.scss";

type CirclechartProps = {
  width: number;
  height: number;
  scale?: number;
  elements: CircleChartElement[];
  gapBetweenElements?: number;
};

const CircleChart = ({ width, height, scale = 0.75, elements, gapBetweenElements = 0.75 }: CirclechartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  let circleChartLogicRef = useRef<CircleChartLogic | null>(null);

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    circleChartLogicRef.current = new CircleChartLogic(containerRef, width, height, scale, elements, gapBetweenElements, styles, 2);

    return () => {
      circleChartLogicRef.current && circleChartLogicRef.current.destroy();
    };
  }, [width, height, elements]);

  return <div className={styles.circlechart} ref={containerRef}></div>;
};

export default CircleChart;
