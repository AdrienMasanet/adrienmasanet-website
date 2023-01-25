// These functions are used to fetch data from the Pocketbase backend API and return the data in a format that is easy to use in the frontend.

export function fetchSkills() {
  return fetch(process.env.NEXT_PUBLIC_POCKETBASE_API_URL + "collections/skill/records?sort=order", {
    method: "GET",
    next: {
      revalidate: 60,
    },
  })
    .then((response) => response.json())
    .then((data) => data.items);
}

import { MedalRank } from "../components/MedalIcon/types";

export function fetchTechs() {
  return fetch(process.env.NEXT_PUBLIC_POCKETBASE_API_URL + "collections/tech_category/records?expand=tech(tech_category)", {
    method: "GET",
    next: {
      revalidate: 60,
    },
  })
    .then((response) => response.json())
    .then((data) => data.items)
    .then((techCategories) => {
      return techCategories.map((category: any) => {
        return {
          id: category.id,
          name: category.name,
          items:
            category.expand &&
            category.expand["tech(tech_category)"] &&
            category.expand["tech(tech_category)"].length > 0 &&
            category.expand["tech(tech_category)"].map((tech: any) => {
              return {
                id: tech.id,
                name: tech.name,
                description: tech.description,
                image: `${process.env.NEXT_PUBLIC_POCKETBASE_API_URL}files/${tech.collectionId}/${tech.id}/${tech.image}`,
                rank: tech.rank as MedalRank,
              };
            }),
        };
      });
    });
}

export function fetchPersonalityTraits() {
  return fetch(process.env.NEXT_PUBLIC_POCKETBASE_API_URL + "collections/personality_trait/records?sort=order", {
    method: "GET",
    next: {
      revalidate: 60,
    },
  })
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

export function fetchHobbies() {
  return fetch(process.env.NEXT_PUBLIC_POCKETBASE_API_URL + "collections/hobbies/records?sort=order", {
    method: "GET",
    next: {
      revalidate: 60,
    },
  })
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
