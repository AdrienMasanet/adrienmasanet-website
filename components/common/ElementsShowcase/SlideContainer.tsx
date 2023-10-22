import { cloneElement, ReactElement } from "react";

import styles from "./ElementsShowcase.module.scss";

type SlideContainerProps = {
  position: number;
  isDragging: boolean;
  children: ReactElement;
};

const SlideContainer = ({
  position,
  isDragging,
  children,
}: SlideContainerProps) => (
  <div
    className={`
      ${styles.slidecontainer}
      ${isDragging ? styles.grabbing : ""}
    `}
    style={{
      transform: `
        translate3d(
          ${-50 + position * 100}%,
          ${-50 + Math.abs(position) * 10}%,
          0)
        scale(${1 - Math.abs(position) * 0.1 + 0.1})
      `,
      opacity: position === 0 ? 1 : 1 / Math.abs(position * 5),
      zIndex: position === 0 ? 10 : 0,
    }}
  >
    {cloneElement(children, { position })}
  </div>
);

export default SlideContainer;
