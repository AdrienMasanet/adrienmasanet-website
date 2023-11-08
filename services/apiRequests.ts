// These functions are used to fetch data from the Pocketbase backend API and return the data in a format that is easy to use in the frontend.

import { MedalRank } from "../components/common/MedalIcon/types";

export async function fetchSkills() {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
      "collections/skill/records?sort=order",
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.items);
}

export async function fetchMasteredTechs() {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
      "collections/tech_category/records?expand=tech(tech_category)",
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.items)
    .then((techCategories) => {
      return (
        techCategories
          // Filter out categories to return only those that have at least one mastered tech
          .filter((category: any) => {
            return (
              category.expand &&
              category.expand["tech(tech_category)"] &&
              category.expand["tech(tech_category)"].length > 0 &&
              category.expand["tech(tech_category)"].filter(
                (tech: any) => tech.mastered === true
              ).length > 0
            );
          })
          .map((category: any) => {
            return {
              id: category.id,
              name: category.name,
              items:
                category.expand &&
                category.expand["tech(tech_category)"] &&
                category.expand["tech(tech_category)"].length > 0 &&
                category.expand["tech(tech_category)"]
                  // Filter out techs to return only those that are mastered
                  .filter((tech: any) => tech.mastered === true)
                  .map((tech: any) => {
                    return {
                      id: tech.id,
                      name: tech.name,
                      description: tech.description,
                      image: `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${tech.collectionId}/${tech.id}/${tech.image}`,
                      rank: tech.rank ? (tech.rank as MedalRank) : null,
                    };
                  })
                  .sort((a: any, b: any) => {
                    if (!a.rank && !b.rank) return 0;
                    if (a.rank === null) return 1;
                    if (b.rank === null) return -1;
                    return b.rank - a.rank;
                  }),
            };
          })
      );
    });
}

export async function fetchNotMasteredTechs() {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
      "collections/tech_category/records?expand=tech(tech_category)",
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.items)
    .then((techCategories) => {
      return (
        techCategories
          // Filter out categories to return only those that have at least one not mastered tech
          .filter((category: any) => {
            return (
              category.expand &&
              category.expand["tech(tech_category)"] &&
              category.expand["tech(tech_category)"].length > 0 &&
              category.expand["tech(tech_category)"].filter(
                (tech: any) => tech.mastered === false
              ).length > 0
            );
          })
          .map((category: any) => {
            return {
              id: category.id,
              name: category.name,
              items:
                category.expand &&
                category.expand["tech(tech_category)"] &&
                category.expand["tech(tech_category)"].length > 0 &&
                category.expand["tech(tech_category)"]
                  // Filter out techs to return only those that are not mastered
                  .filter((tech: any) => tech.mastered === false)
                  .map((tech: any) => {
                    return {
                      id: tech.id,
                      name: tech.name,
                      description: tech.description,
                      image: `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${tech.collectionId}/${tech.id}/${tech.image}`,
                    };
                  }),
            };
          })
      );
    });
}

export async function fetchPersonalityTraits() {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
      "collections/personality_trait/records?sort=order",
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.items)
    .then((personalityTraits) => {
      return personalityTraits.map((trait: any) => {
        return {
          id: trait.id,
          name: trait.name,
          description: trait.description,
          image: `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${trait.collectionId}/${trait.id}/${trait.image}`,
        };
      });
    });
}

export async function fetchHobbies() {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
      "collections/hobbies/records?sort=order",
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.items)
    .then((hobbies) => {
      return hobbies.map((hobby: any) => {
        return {
          id: hobby.id,
          name: hobby.name,
          description: hobby.description,
          images: hobby.images.map((image: any) => {
            return `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${hobby.collectionId}/${hobby.id}/${image}`;
          }),
        };
      });
    });
}

export async function sendContactMessage(message: any): Promise<boolean> {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL + "new-contact-message",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  )
    .then((response) => response.status === 200)
    .catch((error) => false);
}

export async function fetchLanguages() {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
      "collections/languages/records",
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.items)
    .then((languages) => {
      return languages.map((language: any) => {
        return {
          id: language.id,
          name: language.name,
          description: language.description,
          image: `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${language.collectionId}/${language.id}/${language.image}`,
        };
      });
    });
}

export async function fetchAchievements() {
  return fetch(
    process.env.NEXT_PUBLIC_POCKETBASE_API_URL +
      "collections/achievement/records?sort=order&expand=techs",
    {
      method: "GET",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.items)
    .then((achievements) =>
      achievements.map((achievement: any) => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        techs: achievement.expand.techs.map((tech: any) => ({
          id: tech.id,
          name: tech.name,
          image: `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${tech.collectionId}/${tech.id}/${tech.image}`,
        })),
        link: achievement.link,
        repoLink: achievement.repo_link,
        media: `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${achievement.collectionId}/${achievement.id}/${achievement.media}`,
      }))
    );
}
