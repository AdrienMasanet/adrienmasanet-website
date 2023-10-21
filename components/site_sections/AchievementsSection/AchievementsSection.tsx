import Section from "components/common/Section/Section";

import scssThemeVariables from "../../../styles/javascript_variables.module.scss";

// type AchievementsSectionProps = {};

const AchievementsSection = (/* {}: AchievementsSectionProps */) => {
  return (
    <>
      <Section
        title="Quelques réalisations"
        subtitle="Diverses et variées"
        sectionColor={scssThemeVariables.scssThemeClDarkblue}
        nextSectionColor={scssThemeVariables.scssThemeClDarkblue}
        textColor={scssThemeVariables.scssThemeClWhite}
        spaceBelow="spacer-md"
        spaceAfterTitles="spacer-md"
        maxWidth={900}
      >
        <h4>Réalisations</h4>
      </Section>
    </>
  );
};

export default AchievementsSection;
