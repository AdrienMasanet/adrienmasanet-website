import dynamic from "next/dynamic";
import ClientDelayedLoader from "../components/ClientDelayedLoader/ClientDelayedLoader";
import HeaderSection from "../components/site_sections/HeaderSection/HeaderSection";
import SkillsSection from "../components/site_sections/SkillsSection/SkillsSection";
import TechsSection from "../components/site_sections/TechsSection/TechsSection";
import LanguagesSection from "../components/site_sections/LanguagesSection/LanguagesSection";
import AchievementsSection from "../components/site_sections/AchievementsSection/AchievementsSection";
import AboutMeSection from "../components/site_sections/AboutMeSection/AboutMeSection";
import FooterSection from "../components/site_sections/FooterSection/FooterSection";
import { fetchSkills, fetchMasteredTechs, fetchNotMasteredTechs, fetchLanguages, fetchPersonalityTraits, fetchHobbies } from "../services/apiRequests";

export default async function MainPage() {
  // Fetch data from the API for the sections containing data
  const skills = await fetchSkills();
  const masteredTechs = await fetchMasteredTechs();
  const notMasteredTechs = await fetchNotMasteredTechs();
  const languages = await fetchLanguages();
  const personalityTraits = await fetchPersonalityTraits();
  const hobbies = await fetchHobbies();

  // Dynamic imports for sections that are not needed on the server side
  const HobbiesSection = dynamic(() => import("../components/site_sections/HobbiesSection/HobbiesSection"), { ssr: false });
  const ContactSection = dynamic(() => import("../components/site_sections/ContactSection/ContactSection"), { ssr: false });

  return (
    <>
      <div className="main-container">
        <ClientDelayedLoader />
        <HeaderSection />
        <SkillsSection skills={skills} />
        <TechsSection masteredCategoriesAndElements={masteredTechs} notMasteredCategoriesAndElements={notMasteredTechs} />
        <LanguagesSection languages={languages} />
        <AchievementsSection />
        <AboutMeSection personalityTraits={personalityTraits} />
        <HobbiesSection hobbies={hobbies} />
        <ContactSection />
        <FooterSection />
      </div>
    </>
  );
}
