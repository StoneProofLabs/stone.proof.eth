import { MineralKey, SortConfig } from "./types";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

type SortIconProps = {
  column: MineralKey | null;
  sortConfig: SortConfig;
};

export default function SortIcon({ column, sortConfig }: SortIconProps) {
  const iconSize = 14;

  if (sortConfig.key !== column) {
    return <ArrowUpDown size={iconSize} className="ml-1 text-gray-400" />;
  }

  return sortConfig.direction === "ascending" ? (
    <ChevronUp size={iconSize} className="ml-1 text-gray-300" />
  ) : (
    <ChevronDown size={iconSize} className="ml-1 text-gray-300" />
  );
}
