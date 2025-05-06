import Link from "next/link";
import Icon from "../../Icon";
import PurityIndicator from "./PurityIndicator";
import StatusBadge from "./StatusBadge";
import { Mineral } from "./types";

type MineralRowProps = {
  mineral: Mineral;
  isSelected: boolean;
  onSelect: (id: number) => void;
  isAdmin?: boolean;
};

export default function MineralRow({ mineral, isSelected, onSelect, isAdmin = false }: MineralRowProps) {
  return (
    <tr key={mineral.id} className={`  hover:bg-[#060910] ${isSelected ? "bg-[#2B2D2F]" : ""} transition-colors`}>
      <td className="px-2 sm:px-4 py-3 sm:py-4">
        <input
          type="checkbox"
          className="rounded bg-gray-700 border-gray-600 cursor-pointer"
          checked={isSelected}
          onChange={() => onSelect(mineral.id)}
        />
      </td>
      <td className="px-2 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img src={mineral.image} alt={mineral.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
          <div>
            <div className="text-white font-medium">{mineral.name}</div>
            <div className="text-gray-400 text-xs sm:text-sm flex items-center">
              {mineral.code}
              <button
                onClick={async () => await navigator.clipboard.writeText(mineral.code)}
                className="ml-1 p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell px-2 sm:px-4 py-3 sm:py-4">
        <div className="text-white text-sm">
          {mineral.weight} {mineral.weightUnit}
        </div>
        <div className="text-gray-400 text-xs sm:text-sm">{mineral.lbsWeight}lbs</div>
      </td>
      <td className="hidden md:table-cell px-2 sm:px-4 py-3 sm:py-4 text-white text-sm">{mineral.origin}</td>
      <td className="px-2 sm:px-4 py-3 sm:py-4">
        <StatusBadge status={mineral.status} />
      </td>
      <td className="hidden lg:table-cell px-2 sm:px-4 py-3 sm:py-4">
        <PurityIndicator value={mineral.purity} />
      </td>
      <td className="flex justify-center items-center gap-2 px-2 sm:px-4 py-3 sm:py-4">
        {isAdmin ? (
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm flex items-center transition-colors">
            <span>Update</span>
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm flex items-center transition-colors">
              <span className="hidden sm:inline">Full Details</span>
              <span className="sm:hidden">Accept</span>
              <Icon path="/dashboard/icon_set/minerals.svg" alt="Minerals icon" />
            </button>

            <Link
              href={"/miner/disputes/raiseDispute"}
              className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm flex items-center transition-colors"
            >
              <span className="hidden sm:inline">Raise</span>
              <span className="sm:hidden">View</span>
              <Icon path="/dashboard/icon_set/attention.svg" alt="Attention icon" />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
}
