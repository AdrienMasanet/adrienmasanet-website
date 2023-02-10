"use client";

import styles from "./LanguagesSection.module.scss";
import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import Section from "../../Section/Section";
import LanguageItem from "./LanguageItem";
import { useEffect } from "react";

type LanguagesSectionProps = {
  languages: any;
};

const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
  useEffect(() => {
    console.log(languages);
  }, [languages]);

  return (
    <Section waveSection={true} title="Langues pratiquées" subtitle="Que je puedo hablar and write" sectionColor={scssThemeVariables.scssThemeClWhite} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClDarkblue} spaceAfterTitles="spacer-md" maxWidth={900}>
      <div className={styles.container}>
        {languages.map((language: any) => (
          <LanguageItem key={language.id} image={language.image} name={language.name} description={language.description} />
        ))}
      </div>
    </Section>
  );
};

export default LanguagesSection;
