import { useRef, useEffect } from "react";
import { CircleChartLogic } from "./logic";
import { CircleChartElement } from "./types";
import styles from "./CircleChart.module.scss";

type CirclechartProps = {
  width: number;
  height: number;
  elements: CircleChartElement[];
  gapBetweenElements?: number;
};

const CircleChart = ({ width, height, elements }: CirclechartProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  let circleChartLogicRef = useRef<CircleChartLogic | null>(null);

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    circleChartLogicRef.current = new CircleChartLogic(containerRef, width, height, 0.75, elements, 0.075, styles, 2);

    return () => {
      circleChartLogicRef.current && circleChartLogicRef.current.destroy();
    };
  }, [width, height, elements]);

  return <div className={styles.circlechart} ref={containerRef}></div>;
};

export default CircleChart;
