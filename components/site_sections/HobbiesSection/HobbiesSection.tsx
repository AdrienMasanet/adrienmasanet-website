import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import Hobby from "../../Hobby/Hobby";
import Section from "../../Section/Section";
import styles from "./HobbiesSection.module.scss";

type HobbiesSectionProps = {
  hobbies: any;
};

const HobbiesSection = ({ hobbies }: HobbiesSectionProps) => {
  return (
    <Section title="Mes hobbys" subtitle="Il y a tellement de trucs intéressants dans la vie" sectionColor={scssThemeVariables.scssThemeClDarkblue} nextSectionColor={scssThemeVariables.scssThemeClWhite} textColor={scssThemeVariables.scssThemeClWhite} spaceAfterTitles="spacer-md">
      {hobbies.map((hobby: any) => (
        <Hobby key={hobby.id} images={hobby.images} name={hobby.name} description={hobby.description} />
      ))}
    </Section>
  );
};

export default HobbiesSection;
