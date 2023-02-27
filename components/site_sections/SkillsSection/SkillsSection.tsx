"use client";

import styles from "./SkillsSection.module.scss";
import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import CircleChart from "../../Circlechart/CircleChart";
import Section from "../../Section/Section";
import { useEffect, useState } from "react";

type SkillsSectionProps = {
  skills: any;
};

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const [canvasWidthAndHeight, setCanvasWidthAndHeight] = useState({
    width: 600,
    height: 600,
  });

  useEffect(() => {
    if (window.innerWidth < 1100) {
      setCanvasWidthAndHeight({
        width: window.innerWidth - 20,
        height: window.innerWidth - 20,
      });
    } else {
      setCanvasWidthAndHeight({
        width: window.innerWidth / 5 + 100,
        height: window.innerWidth / 5 + 100,
      });
    }
  }, []);

  return (
    <Section waveSection={true} title="Mes compétences" sectionColor={scssThemeVariables.scssThemeClWhite} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClDarkblue}>
      <CircleChart width={canvasWidthAndHeight.width} height={canvasWidthAndHeight.height} elements={skills} />
      <div className={styles.introductioncontainer}>
        <p className={styles.paragraph}>Développeur web full-stack, je suis spécialisé dans le développement d&apos;applications web responsives, d&apos;applications natives (smartphones / desktop), de microservices ou d&apos;APIs.</p>
        <p className={styles.paragraph}>J&apos;ai obtenu le diplôme de Concepteur Développeur d&apos;Applications en 2022 à l&apos;Idem Creative Arts School suite à des études en alternance et je suis passionné par la programmation et la technologie en général depuis mon plus jeune âge.</p>
        <p className={styles.paragraph}>Les bonnes pratiques de développement, la qualité du code, le respect des diverses normes, la sécurité sont des points qui me tiennent à cœur et je mets tout en oeuvre pour les respecter.</p>
        <p className={styles.paragraph}>Sociable, j&apos;aime le travail d&apos;équipe et je suis toujours prêt à proposer de nouvelles idées pour contribuer à la qualité d&apos;un projet !</p>
      </div>
    </Section>
  );
};

export default SkillsSection;
