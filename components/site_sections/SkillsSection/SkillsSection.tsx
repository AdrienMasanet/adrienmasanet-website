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
    <Section waveSection={true} title="Quelles sont mes compétences ?" sectionColor={scssThemeVariables.scssThemeClWhite} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClDarkblue}>
      <CircleChart width={canvasWidthAndHeight.width} height={canvasWidthAndHeight.height} elements={skills} />
      <p className="paragraph">
        Anim id proident velit laboris. Fugiat Lorem tempor labore laborum culpa et in elit. Consequat aliqua irure elit nulla sunt nulla. Anim proident quis exercitation proident. Reprehenderit sit do minim sunt culpa non cupidatat est esse labore anim. Ea quis non fugiat dolore ad proident sint ex. Ad aliqua officia qui in magna quis do. Id mollit culpa sunt in officia quis eu mollit ipsum. Do officia aute in eu et dolore non ex ut. Aute fugiat non et sunt elit. Tempor occaecat minim veniam sit aute duis laborum ea consectetur incididunt ipsum nisi. Consequat cillum ipsum qui proident nostrud. Consequat ipsum commodo esse anim laboris dolore irure id incididunt dolor incididunt ullamco. Elit ad aliqua ea sit et proident proident dolor cillum elit adipisicing veniam voluptate anim. Fugiat velit id anim minim quis anim minim. Est magna ipsum laboris exercitation elit et ad. In pariatur ipsum ut mollit consequat veniam consectetur velit Lorem in reprehenderit enim duis. Ex amet exercitation aute laboris deserunt reprehenderit nisi in laborum deserunt nisi. Culpa culpa non esse laborum dolor fugiat ad aute quis nostrud voluptate deserunt ipsum. Culpa eu do voluptate do nisi dolor ipsum amet est dolor. Cupidatat sunt dolor in eiusmod nulla pariatur mollit excepteur excepteur sit. Tempor nulla mollit et ad sint. Reprehenderit pariatur aliqua reprehenderit anim elit officia ipsum dolore id ex sunt mollit id fugiat. Aute do ad anim Lorem enim ullamco incididunt. Aliquip quis voluptate amet in fugiat officia veniam aliqua sunt commodo eiusmod. Ad tempor amet ut cupidatat ad Lorem incididunt aute. Occaecat fugiat aliqua irure ullamco ut id adipisicing sunt. In in dolor esse cillum fugiat fugiat id adipisicing laborum. Qui excepteur aliqua nulla veniam pariatur minim ex. Mollit deserunt minim voluptate irure voluptate ea commodo. Nisi occaecat non cillum ullamco commodo officia veniam voluptate ipsum. Minim ex pariatur aliquip ut sit fugiat enim magna et. Culpa enim eiusmod
        id aute dolore Lorem veniam.
      </p>
    </Section>
  );
};

export default SkillsSection;
