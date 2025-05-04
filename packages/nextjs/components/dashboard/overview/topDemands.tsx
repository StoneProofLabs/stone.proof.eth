/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import { Plus } from "lucide-react";
import { cn } from "~~/utils/dashboard/cn";

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-empty-function */

interface Demand {
  id: string;
  mineralName: string;
  date: string;
  icon: string;
}

interface TopDemandsProps {
  demands: Demand[];
  title?: string;
  refreshLabel?: string;
  onRefresh?: () => void;
  onAddDemand?: (demandId: string) => void;
  bgColor?: string;
}

export default function TopDemands({
  demands,
  title = "Top Demands",
  refreshLabel = "Refresh List",
  onRefresh = () => {},
  onAddDemand = () => {},
  bgColor = "bg-[#252525]",
}: TopDemandsProps) {
  return (
    <div className={cn(bgColor, "border border-[#323539] rounded-2xl p-4 w-full")}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-medium">{title}</h3>
      </div>

      <div className="space-y-4">
        {demands.map(demand => (
          <div key={demand.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
                <img src={demand.icon} alt={demand.mineralName} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-medium">{demand.mineralName}</p>
                <p className="text-gray-400 text-sm">{demand.date}</p>
              </div>
            </div>
            <button onClick={() => onAddDemand(demand.id)} className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
              <Plus size={20} className="text-white" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={onRefresh} className="flex items-center gap-1 text-blue-500 hover:text-blue-400 mt-4 mx-auto">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {refreshLabel}
      </button>
    </div>
  );
}
