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
        <th className="px-4 py-3 w-12">
          <input
            type="checkbox"
            className="rounded bg-gray-700 border-gray-600"
            checked={allSelected}
            onChange={e => onSelectAll(e.target.checked)}
          />
        </th>
        {[
          ["name", "Mineral Name & ID"],
          ["weight", "Weight"],
          ["origin", "Origin"],
          ["status", "Status"],
          ["purity", "Purity"],
        ].map(([key, label]) => (
          <th
            key={key}
            className="px-4 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
            onClick={() => onSort(key as MineralKey)}
          >
            <div className="flex items-center">
              {label}
              <SortIcon column={key as MineralKey} sortConfig={sortConfig} />
            </div>
          </th>
        ))}
        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
          <div className="flex items-center">Actions</div>
        </th>
      </tr>
    </thead>
  );
}
