import HeaderSection from "../components/site_sections/HeaderSection/HeaderSection";
import SkillsSection from "../components/site_sections/SkillsSection/SkillsSection";
import TechsSection from "../components/site_sections/TechsSection/TechsSection";
import AboutMeSection from "../components/site_sections/AboutMeSection/AboutMeSection";
import FooterSection from "../components/site_sections/FooterSection/FooterSection";
import HobbiesSection from "../components/site_sections/HobbiesSection/HobbiesSection";
import ContactSection from "../components/site_sections/ContactSection/ContactSection";
import { fetchSkills, fetchTechs, fetchPersonalityTraits, fetchHobbies } from "../services/apiRequests";

export default async function MainPage() {
  const skills = await fetchSkills();
  const masteredTechs = await fetchTechs();
  const personalityTraits = await fetchPersonalityTraits();
  const hobbies = await fetchHobbies();

  return (
    <>
      <div className="main-container">
        <HeaderSection />
        <SkillsSection skills={skills} />
        <TechsSection masteredCategoriesAndElements={masteredTechs} notMasteredCategoriesAndElements={masteredTechs} />
        <AboutMeSection personalityTraits={personalityTraits} />
        <HobbiesSection hobbies={hobbies} />
        <ContactSection />
        <FooterSection />
      </div>
    </>
  );
}
