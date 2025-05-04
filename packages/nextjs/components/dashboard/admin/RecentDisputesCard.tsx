import React from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { recentDisputes } from "~~/data/data";

const statusColors: Record<string, string> = {
  Defendant: "bg-[#EF4444] text-white",
  Complainant: "bg-[#22C55E] text-white",
};

export default function RecentDisputesCard() {
  return (
    <div className="bg-[#060910] border border-[#23262B] rounded-2xl p-4 h-full flex flex-col w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white text-base md:text-lg font-semibold">Your Recent Disputes</span>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="12" r="2" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {recentDisputes.map((item, idx) => (
          <React.Fragment key={item.id}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.mineral}
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10"
                  />
                </div>
                <div>
                  <p className="text-white font-medium leading-tight m-0 text-base">{item.mineral}</p>
                  <p className="text-[#B0B3B8] text-xs leading-tight m-0">{item.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
                  {item.status}
                </span>
                <FaChevronRight className="text-gray-400 w-4 h-4" />
              </div>
            </div>
            {idx < recentDisputes.length - 1 && <hr className="border-[#23262B] my-1" />}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3 mb-2 text-center text-xs text-[#979AA0]">Select Activity Type To View Recents</div>
      <button className="w-full mt-auto bg-[#007AFF] hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors text-base">
        Clear History
      </button>
    </div>
  );
}
