"use client";

import React, { forwardRef } from "react";

import Waves from "../Waves/Waves";
import styles from "./Section.module.scss";

type SectionProps = {
  title: string;
  subtitle?: string;
  sectionColor: string;
  nextSectionColor: string;
  textColor: string;
  children: React.ReactNode;
  waveSection?: boolean;
  lastSection?: boolean;
  spaceBelow?: string;
  spaceAfterTitles?: string;
  maxWidth?: number;
  ref?: React.RefObject<HTMLDivElement>;
};

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      title,
      subtitle,
      sectionColor,
      nextSectionColor,
      textColor,
      children,
      waveSection,
      lastSection,
      spaceBelow = "",
      spaceAfterTitles = "",
      maxWidth,
    },
    ref,
  ) => {
    let spacerBelowSize: string = spaceBelow.toString();
    let spacerAfterTitlesSize: string = spaceAfterTitles.toString();

    if (spacerBelowSize == "") {
      if (!waveSection) spacerBelowSize = "spacer-lg";
      else spacerBelowSize = "spacer-md";
    }

    return (
      <>
        {waveSection && (
          <Waves
            wavesNumber={3}
            wavesSmoothing={350}
            wavesColor={sectionColor}
            wavesSpeed={4}
            absolute={true}
          />
        )}
        <section
          className={styles.section}
          style={{ backgroundColor: sectionColor, color: textColor }}
        >
          <div className="maxed-container">
            <h2 className={styles.title}>{title}</h2>

            {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}

            {spacerAfterTitlesSize != "" && (
              <hr className={spacerAfterTitlesSize} />
            )}

            <div
              ref={ref}
              className={styles.children}
              style={{
                maxWidth: maxWidth ? maxWidth + "px" : "100%",
                margin: "auto",
              }}
            >
              {children}
            </div>

            {spacerBelowSize != "" && <hr className={spacerBelowSize} />}
          </div>
          {waveSection && !lastSection && (
            <Waves
              wavesNumber={3}
              wavesSmoothing={350}
              wavesColor={nextSectionColor}
              wavesSpeed={4}
            />
          )}
        </section>
      </>
    );
  },
);

Section.displayName = "Section";

export default Section;
