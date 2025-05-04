import SortIcon from "./SortIcon";
import { MineralKey, SortConfig } from "./types";

type TableHeaderProps = {
  sortConfig: SortConfig;
  onSort: (key: MineralKey) => void;
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
};

export default function TableHeader({ sortConfig, onSort, allSelected, onSelectAll }: TableHeaderProps) {
  return (
    <thead className="bg-[#2B2D2F]">
      <tr>
        <th className="px-2 sm:px-4 py-2 sm:py-3 w-8 sm:w-12">
          <input
            type="checkbox"
            className="rounded bg-gray-700 border-gray-600 cursor-pointer"
            checked={allSelected}
            onChange={e => onSelectAll(e.target.checked)}
          />
        </th>
        {[
          ["name", "Mineral Name & ID", "block"],
          ["weight", "Weight", "hidden sm:table-cell"],
          ["origin", "Origin", "hidden md:table-cell"],
          ["status", "Status", "block"],
          ["purity", "Purity", "hidden lg:table-cell"],
        ].map(([key, label, visibility]) => (
          <th
            key={key}
            className={`px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 cursor-pointer ${visibility}`}
            onClick={() => onSort(key as MineralKey)}
          >
            <div className="flex items-center space-x-1">
              <span className="whitespace-nowrap">{label}</span>
              <SortIcon column={key as MineralKey} sortConfig={sortConfig} />
            </div>
          </th>
        ))}
        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300">
          <div className="flex items-center">Actions</div>
        </th>
      </tr>
    </thead>
  );
}
