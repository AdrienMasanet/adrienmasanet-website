"use client";

import { useEffect,useRef, useState } from "react";

import styles from "./ClientDelayedLoader.module.scss";

type CircleChartProps = {
  delay?: number;
};

const ClientDelayedLoader = ({ delay = 1000 }: CircleChartProps) => {
  const [fadePercentage, setFadePercentage] = useState<number>(100);

  const decreaseFade = () => {
    if (fadePercentage > 0) {
      setFadePercentage(fadePercentage - 1);
    } else {
      // Delete this node from the DOM
      const container = document.querySelector(`.${styles.container}`);
      container && container.remove();
    }
  };

  useEffect(() => {
    let fadeDelayTimeout = setTimeout(() => {
      requestAnimationFrame(decreaseFade);
    }, delay);

    return () => {
      clearTimeout(fadeDelayTimeout);
    };
  }, [decreaseFade, delay]);

  useEffect(() => {
    if (fadePercentage < 100) {
      requestAnimationFrame(decreaseFade);
    }
  }, [decreaseFade, fadePercentage]);

  return <div className={styles.container} style={{ opacity: fadePercentage + "%" }}></div>;
};

export default ClientDelayedLoader;
