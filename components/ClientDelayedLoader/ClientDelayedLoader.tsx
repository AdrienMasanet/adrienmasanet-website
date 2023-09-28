"use client";

import { useLoadingComplete } from "../../hooks/useLoadingComplete";
import styles from "./ClientDelayedLoader.module.scss";

const ClientDelayedLoader = () => {
  const { loadingComplete } = useLoadingComplete();

  return (
    <div
      className={styles.container}
      style={{ opacity: loadingComplete ? "0" : "1" }}
    ></div>
  );
};

export default ClientDelayedLoader;
