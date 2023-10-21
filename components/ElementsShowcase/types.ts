import { MedalRank } from "../common/MedalIcon/types";

export type ElementsShowcaseItem = {
  id: string;
  name: string;
  description: string;
  rank?: MedalRank;
  link?: string;
  image: string;
};

export type ElementsShowcaseCategory = {
  id: string;
  name: string;
  items: ElementsShowcaseItem[];
};
