import styles from "./TechsSection.module.scss";
import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import Section from "../../Section/Section";
import ElementsShowcase from "../../ElementsShowcase/ElementsShowcase";
import { ElementsShowcaseItem, ElementsShowcaseCategory } from "../../ElementsShowcase/types";
import { MedalRank } from "../../MedalIcon/types";

const elementNextjs: ElementsShowcaseItem = {
  name: "Next.js",
  rank: MedalRank.Gold,
  description: "J'utilise Next.js depuis 2019 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://adrienmasanet-website-pocketbase.fly.dev/api/files/z428yq98453ezm0/jov1euy1fagpksq/rust_logo_0sQ8gsNRZn.webp",
};

const elementLaravel: ElementsShowcaseItem = {
  name: "Laravel",
  rank: MedalRank.Silver,
  description: "J'ai utilisé Laravel pour la première fois en 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementUnity: ElementsShowcaseItem = {
  name: "Unity",
  rank: MedalRank.Bronze,
  description: "J'ai utilisé Unity depuis ma tendre enfance et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementUnrealengine: ElementsShowcaseItem = {
  name: "Unreal Engine",
  description: "J'ai utilisé Unreal Engine moins que Unity mais j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementReact: ElementsShowcaseItem = {
  name: "React",
  rank: MedalRank.Gold,
  description: "J'utilise React depuis 2019 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementVue: ElementsShowcaseItem = {
  name: "Vue",
  rank: MedalRank.Silver,
  description: "J'ai utilisé Vue pour la première fois en 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementAngular: ElementsShowcaseItem = {
  name: "Angular",
  rank: MedalRank.Bronze,
  description: "J'ai utilisé Angular pour la première fois en 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementSvelte: ElementsShowcaseItem = {
  name: "Svelte",
  description: "J'ai utilisé Svelte pour la première fois en 2020 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementThreejs: ElementsShowcaseItem = {
  name: "Three.js",
  description: "J'ai utilisé Three.js pour la première fois en 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementFlutter: ElementsShowcaseItem = {
  name: "Flutter",
  description: "Très pratique pour faire des applications mobiles, j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementTypescript: ElementsShowcaseItem = {
  name: "Typescript / Javascript",
  rank: MedalRank.Gold,
  description: "Typescript et Javascript sont les langages que j'utilise le plus.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementPhp: ElementsShowcaseItem = {
  name: "PHP",
  rank: MedalRank.Silver,
  description: "J'ai commencé à apprendre PHP en 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementPython: ElementsShowcaseItem = {
  name: "Python",
  rank: MedalRank.Bronze,
  description: "J'ai commencé à apprendre Python en 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementRust: ElementsShowcaseItem = {
  name: "Rust",
  description: "J'ai commencé à apprendre Rust en 2020 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};
const elementCsharp: ElementsShowcaseItem = {
  name: "C#",
  description: "J'ai commencé à apprendre C# en 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementJava: ElementsShowcaseItem = {
  name: "Java",
  description: "J'ai peu utilisé Java mais j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementSwift: ElementsShowcaseItem = {
  name: "Swift",
  description: "J'ai peu utilisé Swift mais j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementDart: ElementsShowcaseItem = {
  name: "Dart",
  description: "J'ai peu utilisé Dart mais j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementGit: ElementsShowcaseItem = {
  name: "Git",
  rank: MedalRank.Gold,
  description: "J'utilise Git depuis 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const elementLinux: ElementsShowcaseItem = {
  name: "Linux",
  rank: MedalRank.Silver,
  description: "J'utilise Linux depuis 2018 et j'ai pu travailler sur plusieurs projets avec cette technologie.",
  image: "https://i.ytimg.com/an/7oIAs-0G4mw/3687264029678630069_mq.jpg?v=6082f311",
};

const frameworksCategory: ElementsShowcaseCategory = {
  name: "Frameworks",
  items: [elementNextjs, elementLaravel, elementUnity, elementUnrealengine],
};

const languagesCategory: ElementsShowcaseCategory = {
  name: "Langages",
  items: [elementTypescript, elementRust, elementPython, elementCsharp, elementJava, elementSwift, elementDart, elementPhp],
};

const librariesCategory: ElementsShowcaseCategory = {
  name: "Librairies",
  items: [elementReact, elementVue, elementAngular, elementSvelte, elementThreejs, elementFlutter],
};

const toolsAndOthersCategory: ElementsShowcaseCategory = {
  name: "Outils et autres",
  items: [elementGit, elementLinux],
};

const elementsShowcaseCategoriesAndElements: ElementsShowcaseCategory[] = [frameworksCategory, languagesCategory, librariesCategory, toolsAndOthersCategory];

type SkillsSectionProps = {
  masteredCategoriesAndElements: any;
  notMasteredCategoriesAndElements: any;
};

const TechsSection = ({ masteredCategoriesAndElements, notMasteredCategoriesAndElements }: SkillsSectionProps) => {
  return (
    <>
      <Section title="Les technologies que j'aime" subtitle="Et avec lesquelles j’ai de l’expérience" sectionColor={scssThemeVariables.scssThemeClDarkblue} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClWhite} spaceBelow={"spacer-md"} spaceAfterTitles="spacer-sm">
        <ElementsShowcase categoriesAndElements={masteredCategoriesAndElements} />
      </Section>
      <Section title="Technologies et domaines de développement qui me font de l’oeil" subtitle="Et que j’aimerais pratiquer d’avantage un jour" sectionColor={scssThemeVariables.scssThemeClDarkblue} nextSectionColor={scssThemeVariables.scssThemeClDarkblue} textColor={scssThemeVariables.scssThemeClWhite} spaceAfterTitles="spacer-sm">
        <ElementsShowcase categoriesAndElements={notMasteredCategoriesAndElements} />
      </Section>
    </>
  );
};

export default TechsSection;
