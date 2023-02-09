import styles from "./TechsSection.module.scss";
import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import Section from "../../Section/Section";
import ElementsShowcase from "../../ElementsShowcase/ElementsShowcase";
import { ElementsShowcaseCategory } from "../../ElementsShowcase/types";

type TechsSectionProps = {
  masteredCategoriesAndElements: ElementsShowcaseCategory[];
  notMasteredCategoriesAndElements: ElementsShowcaseCategory[];
};

const TechsSection = ({ masteredCategoriesAndElements, notMasteredCategoriesAndElements }: TechsSectionProps) => {
  return (
    <>
      <Section title="Les technologies que j'aime" subtitle="Et avec lesquelles j’ai de l’expérience" sectionColor={scssThemeVariables.scssThemeClDarkblue} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClWhite} spaceBelow={"spacer-md"} spaceAfterTitles="spacer-sm">
        <ElementsShowcase categoriesAndElements={masteredCategoriesAndElements} />
      </Section>
      <Section title="Celles qui me font de l’œil" subtitle="Ou que j’aimerais pratiquer d’avantage" sectionColor={scssThemeVariables.scssThemeClDarkblue} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClWhite} spaceAfterTitles="spacer-sm">
        <ElementsShowcase categoriesAndElements={notMasteredCategoriesAndElements} />
      </Section>
    </>
  );
};

export default TechsSection;
