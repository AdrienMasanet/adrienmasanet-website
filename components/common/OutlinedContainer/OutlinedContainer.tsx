import { ReactNode } from "react";

import styles from "./OutlinedContainer.module.scss";

type OutlinedContainerProps = {
  children: ReactNode;
};

const OutlinedContainer = ({ children }: OutlinedContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default OutlinedContainer;
