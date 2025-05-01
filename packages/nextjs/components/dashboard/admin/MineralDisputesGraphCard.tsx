import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Sun", value: 15 },
  { name: "Mon", value: 25 },
  { name: "Tue", value: 80 },
  { name: "Wed", value: 100 },
  { name: "Thu", value: 40 },
  { name: "Fri", value: 60 },
  { name: "Sat", value: 50 },
];

const years = [2025, 2024, 2023];
const disputeTypes = ["All Disputes", "Defendant", "Complainant"];

export default function MineralDisputesGraphCard() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedType, setSelectedType] = useState(disputeTypes[0]);

  return (
    <div className="bg-[#10131A] border border-[#23262B] rounded-2xl p-4 flex flex-col w-full max-w-full min-w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white text-base md:text-lg font-semibold">Mineral Disputes Variation Graph</span>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="12" r="2" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-3 w-full">
        <div className="relative w-full md:w-auto">
          <select
            className="appearance-none bg-[#232A36] border border-[#23262B] rounded-lg px-4 py-2 text-white text-sm focus:outline-none w-full md:w-[220px] font-medium pr-8"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
          >
            {disputeTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="relative w-full md:w-auto">
          <select
            className="appearance-none bg-[#232A36] border border-[#23262B] rounded-lg px-4 py-2 text-white text-sm focus:outline-none w-full md:w-[100px] font-medium pr-8"
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="w-full h-[220px] md:h-[260px] bg-[#181C23] rounded-b-lg overflow-hidden border-t border-[#23262B] border-b-0 border-x-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="6 6" stroke="#fff" strokeOpacity={0.18} vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 13 }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 13 }}
              width={32}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#181C23", borderColor: "#23262B", color: "white" }}
              itemStyle={{ color: "white" }}
              cursor={{ stroke: "#3B82F6", strokeWidth: 1, opacity: 0.2 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fill="url(#blueGradient)"
              dot={false}
              activeDot={false}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-0 px-2 py-3 border-t border-[#23262B] text-xs md:text-sm text-[#979AA0] bg-[#181C23] rounded-b-2xl">
        <span>Data in person range</span>
        <a href="#" className="text-blue-500 hover:underline flex items-center gap-1 font-medium">
          Open <FaExternalLinkAlt className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
