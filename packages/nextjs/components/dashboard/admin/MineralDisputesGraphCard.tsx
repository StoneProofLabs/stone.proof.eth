import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
    <div className="bg-[#060910] border border-[#23262B] rounded-2xl p-4 md:p-5 flex flex-col w-full max-w-full min-w-[320px] shadow-lg">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <span className="text-white text-base md:text-lg lg:text-xl font-semibold">
          Mineral Disputes Variation Graph
        </span>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="12" r="2" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5 w-full">
        <div className="relative w-full sm:w-auto flex-1 sm:max-w-[250px]">
          <select
            className="appearance-none bg-[#232A36] border border-[#23262B] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none w-full font-medium pr-8"
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

        <div className="relative w-full sm:w-auto sm:min-w-[120px]">
          <select
            className="appearance-none bg-[#060910] border border-[#23262B] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none w-full font-medium pr-8"
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

      <div className="w-full h-[220px] md:h-[260px] lg:h-[300px] bg-[#060910] rounded-lg overflow-hidden border border-[#23262B] mb-2">
        <div className="w-full h-full pt-5 px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="6 6" stroke="#fff" strokeOpacity={0.15} vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={5}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                width={35}
                dx={-5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#181C23",
                  borderColor: "#23262B",
                  color: "white",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "white" }}
                cursor={{ stroke: "#3B82F6", strokeWidth: 1, opacity: 0.2 }}
                formatter={value => [`${value}`, "Value"]}
                labelFormatter={label => `Day: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2.5}
                fill="url(#blueGradient)"
                dot={false}
                activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2, fill: "#fff" }}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-3.5 border border-[#23262B] bg-[#181C23] rounded-lg text-xs md:text-sm text-[#979AA0] mt-1">
        <span>Data in person range</span>
        <a
          href="#"
          className="text-blue-500 hover:underline flex items-center gap-1.5 font-medium transition-colors duration-200 hover:text-blue-400"
        >
          Open <FaExternalLinkAlt className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}