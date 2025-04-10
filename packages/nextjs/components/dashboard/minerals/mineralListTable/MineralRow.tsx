import PurityIndicator from "./PurityIndicator";
import StatusBadge from "./StatusBadge";
import { Mineral } from "./types";

type MineralRowProps = {
  mineral: Mineral;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

export default function MineralRow({ mineral, isSelected, onSelect }: MineralRowProps) {
  return (
    <tr key={mineral.id} className={`hover:bg-[#2B2D2F] ${isSelected ? "bg-[#2B2D2F]" : ""}`}>
      <td className="px-4 py-4">
        <input
          type="checkbox"
          className="rounded bg-gray-700 border-gray-600"
          checked={isSelected}
          onChange={() => onSelect(mineral.id)}
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center">
          <img src={mineral.image} alt="Mineral" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <div className="text-white">{mineral.name}</div>
            <div className="text-gray-400 text-sm flex items-center">
              {mineral.code}
              <button className="ml-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <td className="px-4 py-4">
        <div className="text-white">
          {mineral.weight} {mineral.weightUnit}
        </div>
        <div className="text-gray-400 text-sm">{mineral.lbsWeight}lbs</div>
      </td>
      <td className="px-4 py-4 text-white">{mineral.origin}</td>
      <td className="px-4 py-4">
        <StatusBadge status={mineral.status} />
      </td>
      <td className="px-4 py-4">
        <PurityIndicator value={mineral.purity} />
      </td>
      <td className="px-4 py-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          Full Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
