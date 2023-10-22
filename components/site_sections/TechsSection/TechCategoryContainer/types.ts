import { MedalRank } from "../../../common/MedalIcon/types";

export type Tech = {
  id: string;
  name: string;
  description: string;
  rank?: MedalRank;
  link?: string;
  image: string;
};

export type TechCategory = {
  id: string;
  name: string;
  items: Tech[];
};
