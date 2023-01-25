import { fetchSkills, fetchTechs, fetchPersonalityTraits, fetchHobbies } from "../services/apiRequests";

export default async function MainPage() {
  const skills = await fetchSkills();
  const masteredTechs = await fetchTechs();
  const personalityTraits = await fetchPersonalityTraits();
  const hobbies = await fetchHobbies();

  return (
    <>
      <div className="main-container"></div>
    </>
  );
}
