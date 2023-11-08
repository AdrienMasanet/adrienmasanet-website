import ElementsShowcase from "components/common/ElementsShowcase/ElementsShowcase";
import { ReactElement } from "react";

import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import Section from "../../common/Section/Section";
import Achievement from "./Achievement/Achievement";

type AchievementsSectionProps = {
  achievements: any;
};

const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  return (
    <>
      <Section
        title="Quelques réalisations"
        subtitle="Diverses et variées"
        sectionColor={scssThemeVariables.scssThemeClDarkblue}
        nextSectionColor={scssThemeVariables.scssThemeClDarkblue}
        textColor={scssThemeVariables.scssThemeClWhite}
        spaceAfterTitles="spacer-sm"
        maxWidth={1200}
      >
        <ElementsShowcase
          wide
          slides={achievements.map((achievement: any) => (
            <Achievement
              key={achievement.id}
              name={achievement.name}
              link={achievement.link}
              repoLink={achievement.repoLink}
              description={achievement.description}
              techs={achievement.techs}
              media={achievement.media}
            />
          ))}
        />
      </Section>
    </>
  );
};

export default AchievementsSection;
