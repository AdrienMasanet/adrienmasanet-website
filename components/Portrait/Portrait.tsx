"use client";

import styles from "./Portrait.module.scss";
import { useRef, useEffect, useCallback, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PortraitLogic } from "./logic";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Portrait = () => {
  const [loading, setLoading] = useState<boolean>(true);
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

    portraitLogicRef.current = new PortraitLogic(containerRef, setLoading);

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

  return (
    <div className={styles.maincontainer}>
      <div className={`${styles.portraitcontainer} ${!loading ? styles.active : ""}`} ref={setContainerDoubleRefs}></div>
      <LoadingSpinner active={loading} />
    </div>
  );
};

export default Portrait;
