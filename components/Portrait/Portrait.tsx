"use client";

import styles from "./Portrait.module.scss";
import { useRef, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { PortraitLogic } from "./logic";

const Portrait = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const portraitLogicRef = useRef<PortraitLogic | null>(null);
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

    portraitLogicRef.current = new PortraitLogic(containerRef);

    return () => {
      portraitLogicRef.current && portraitLogicRef.current.destroy();
    };
  }, [containerRef]);

  useEffect(() => {
    if (inView && portraitLogicRef.current) {
      portraitLogicRef.current.enable();
    } else if (!inView && portraitLogicRef.current) {
      portraitLogicRef.current.disable();
    }
  }, [inView]);

  return <div className={styles.container} ref={setContainerDoubleRefs}></div>;
};

export default Portrait;
