"use client";

import { useEffect, useRef,useState } from "react";

import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import getElementContentWidthAndHeight from "../../../utils/getElementContentWidthAndHeight";
import CircleChart from "../../Circlechart/CircleChart";
import Section from "../../Section/Section";
import styles from "./SkillsSection.module.scss";

type SkillsSectionProps = {
  skills: any;
};

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canvasWidthAndHeight, setCanvasWidthAndHeight] = useState({
    width: 600,
    height: 600,
  });

  useEffect(() => {
    if (window.innerWidth < 1100) {
      setCanvasWidthAndHeight({
        width: getElementContentWidthAndHeight(sectionRef.current!).width,
        height: getElementContentWidthAndHeight(sectionRef.current!).width,
      });
    } else {
      setCanvasWidthAndHeight({
        width: window.innerWidth / 5 + 100,
        height: window.innerWidth / 5 + 100,
      });
    }
  }, []);

  return (
    <Section
      ref={sectionRef}
      waveSection={true}
      title="Mes compétences"
      sectionColor={scssThemeVariables.scssThemeClWhite}
      nextSectionColor={scssThemeVariables.scssThemeClDarkblue}
      textColor={scssThemeVariables.scssThemeClDarkblue}
    >
      <CircleChart
        width={canvasWidthAndHeight.width}
        height={canvasWidthAndHeight.height}
        elements={skills}
      />
      <div className={styles.introductioncontainer}>
        <p className={styles.paragraph}>
          Développeur curieux et passionné, je m&apos;épanouis dans la
          découverte, l&apos;assimilation et l&apos;application de nouvelles
          compétences, toujours à l&apos;affût de l&apos;evolution constante de
          la technologie.
        </p>
        <p className={styles.paragraph}>
          Mon expérience englobe le développement d&apos;applications web
          responsives, d&apos;applications natives, de microservices et
          d&apos;APIs ou bien encore de projets plus spécifiques
          s&apos;éloignant parfois du développement web traditionnel.
        </p>
        <p className={styles.paragraph}>
          Les bonnes pratiques, la qualité du code, la sécurité et le travail
          d&apos;équipe sont des points qui me tiennent à cœur et je
          m&apos;investis activement dans l&apos;amélioration continue des
          projets sur lesquels je travaille.
        </p>
        <p className={styles.paragraph}>
          Agréable et à l&apos;écoute, je suis également de ceux qui croient
          fermement que l&apos;aspect humain a toute son importance !
        </p>
      </div>
    </Section>
  );
};

export default SkillsSection;
