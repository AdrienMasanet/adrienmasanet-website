import TechCategoryContainer from "components/site_sections/TechsSection/TechCategoryContainer/TechCategoryContainer";

import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import ElementsShowcase from "../../common/ElementsShowcase/ElementsShowcase";
import Section from "../../common/Section/Section";
import { TechCategory } from "./TechCategoryContainer/types";

type TechsSectionProps = {
  masteredCategoriesAndElements: TechCategory[];
  notMasteredCategoriesAndElements: TechCategory[];
};

const TechsSection = ({
  masteredCategoriesAndElements,
  notMasteredCategoriesAndElements,
}: TechsSectionProps) => {
  return (
    <>
      <Section
        title="Les technologies que j'aime"
        subtitle="Et avec lesquelles j’ai de l’expérience"
        sectionColor={scssThemeVariables.scssThemeClDarkblue}
        nextSectionColor={scssThemeVariables.scssThemeClDarkblue}
        textColor={scssThemeVariables.scssThemeClWhite}
        spaceBelow="spacer-md"
        spaceAfterTitles="spacer-sm"
      >
        <ElementsShowcase
          slides={masteredCategoriesAndElements.map((category) => (
            <TechCategoryContainer key={category.id} category={category} />
          ))}
        />
      </Section>
      <Section
        title="Celles qui me font de l’œil"
        subtitle="Ou que j’aimerais pratiquer d’avantage"
        sectionColor={scssThemeVariables.scssThemeClDarkblue}
        nextSectionColor={scssThemeVariables.scssThemeClDarkblue}
        textColor={scssThemeVariables.scssThemeClWhite}
        spaceAfterTitles="spacer-sm"
      >
        <ElementsShowcase
          slides={notMasteredCategoriesAndElements.map((category) => (
            <TechCategoryContainer key={category.id} category={category} />
          ))}
        />
      </Section>
    </>
  );
};

export default TechsSection;
