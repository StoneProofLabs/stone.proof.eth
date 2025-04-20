export type Mineral = {
  id: number;
  name: string;
  code: string;
  weight: number;
  weightUnit: string;
  lbsWeight: number;
  origin: string;
  status: string;
  purity: number;
  image: string;
};

export type MineralKey = keyof Mineral;

export type SortConfig = {
  key: MineralKey | null;
  direction: "ascending" | "descending";
};
