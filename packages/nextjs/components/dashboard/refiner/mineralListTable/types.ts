export type Mineral = {
  id: number;
  name: string;
  code: string;
  weight: number;
  weightUnit: string;
  lbsWeight: number;
  origin: string;
  time: number;
  purity: number;
  image: string;
  type: string;
  storageConditions: string;
};

export type MineralKey = keyof Mineral;

export type SortConfig = {
  key: MineralKey | null;
  direction: "ascending" | "descending";
};
