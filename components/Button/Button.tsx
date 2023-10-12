"use client";

import React, { useState } from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  color: "primary" | "secondary";
  isSubmit?: boolean;
};

const Button = ({ text, color, isSubmit }: ButtonProps) => {
  const [shinyX, setShinyX] = useState(0);
  const [shinyY, setShinyY] = useState(0);
  const [mouseHovering, setMouseHovering] = useState(false);

  const moveShiny = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setShinyX(e.clientX - rect.left);
    setShinyY(e.clientY - rect.top);
  };

  return (
    <button
      className={`${styles.container} ${
        color === "primary" ? styles.primary : styles.secondary
      }`}
      type={isSubmit ? "submit" : "button"}
      onMouseEnter={() => setMouseHovering(true)}
      onMouseMove={moveShiny}
      onMouseLeave={() => setMouseHovering(false)}
    >
      {text}
      <div
        className={`${styles.shinyeffect} ${
          mouseHovering ? styles.active : ""
        }`}
        style={{ left: shinyX, top: shinyY }}
        data-testid="shiny-effect"
      ></div>
    </button>
  );
};

export default Button;
