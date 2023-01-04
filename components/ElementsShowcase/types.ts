import { MedalRank } from "../MedalIcon/types";

export type ElementsShowcaseItem = {
  name: string;
  description: string;
  rank?: MedalRank;
  link?: string;
  image: string;
};

export type ElementsShowcaseCategory = {
  name: string;
  items: ElementsShowcaseItem[];
};
