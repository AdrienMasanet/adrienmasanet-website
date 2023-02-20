import styles from "./AboutMeSection.module.scss";
import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import Section from "../../Section/Section";
import PersonalityTrait from "../../PersonalityTrait/PersonalityTrait";

type AboutMeSectionProps = {
  personalityTraits: any;
};

const AboutMeSection = ({ personalityTraits }: AboutMeSectionProps) => {
  return (
    <Section waveSection={true} title="Mes traits de personnalité" subtitle="Qui suis-je vraiment ?" sectionColor={scssThemeVariables.scssThemeClWhite} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClDarkblue} spaceAfterTitles="spacer-md" maxWidth={900}>
      {personalityTraits &&
        personalityTraits.map((trait: any) => {
          return <PersonalityTrait key={trait.id} name={trait.name} description={trait.description} image={trait.image} />;
        })}
    </Section>
  );
};

export default AboutMeSection;
