"use client";

import { useEffect, useState } from "react";

import { useLoadingComplete } from "../../../hooks/useLoadingComplete";
import styles from "./ClientDelayedLoader.module.scss";

type ClientDelayedLoaderProps = {
  transitionDelay?: number;
};

const ClientDelayedLoader = ({
  transitionDelay = 2000,
}: ClientDelayedLoaderProps) => {
  const { loadingComplete } = useLoadingComplete();
  const [loaderRemoved, setLoaderRemoved] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loadingComplete) setLoaderRemoved(true);
    }, transitionDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [loadingComplete, transitionDelay]);

  if (loaderRemoved) return null;

  return (
    <div
      className={styles.container}
      style={{
        transition: `opacity ${transitionDelay}ms ease-in-out`,
        opacity: loadingComplete ? "0" : "1",
      }}
      data-testid="loader"
    ></div>
  );
};

export default ClientDelayedLoader;
