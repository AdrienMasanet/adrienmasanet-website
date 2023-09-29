"use client";

import { useEffect, useRef } from "react";

import { useLoadingComplete } from "../../hooks/useLoadingComplete";
import styles from "./ClientDelayedLoader.module.scss";

type ClientDelayedLoaderProps = {
  transitionDelay?: number;
};

const ClientDelayedLoader = ({
  transitionDelay = 2000,
}: ClientDelayedLoaderProps) => {
  const { loadingComplete } = useLoadingComplete();
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loadingComplete) mainContainerRef.current?.remove();
    }, transitionDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [loadingComplete, transitionDelay]);

  return (
    <div
      ref={mainContainerRef}
      className={styles.container}
      style={{
        transition: `opacity ${transitionDelay}ms ease-in-out`,
        opacity: loadingComplete ? "0" : "1",
      }}
    ></div>
  );
};

export default ClientDelayedLoader;
