import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 16.58, color: "#22c55e" },
  { name: "Pending", value: 25.58, color: "#fbbf24" },
  { name: "Failed", value: 9.78, color: "#ef4444" },
  { name: "Purchases", value: 34.45, color: "#3b82f6" },
  { name: "Refined", value: 3.45, color: "#818cf8" },
  { name: "Mined", value: 0.14, color: "#38bdf8" },
];

const centerValue = 65;

export default function OverallActivitiesReviewCard() {
  return (
    <div className="bg-transparent border border-[#323539] rounded-2xl p-4 flex flex-col h-full min-w-[220px] w-full max-w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white text-lg md:text-xl font-semibold">Overall Activities Review</span>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="12" r="2" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 w-full">
        <div
          className="relative flex items-center justify-center w-full max-w-[340px] mx-auto"
          style={{ minWidth: 0, minHeight: 240, height: "50vw", maxHeight: 340 }}
        >
          <ResponsiveContainer width="100%" height={340} aspect={1}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={"70%"}
                outerRadius={"95%"}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-white text-3xl md:text-5xl font-bold">{centerValue}%</span>
            <span className="text-gray-400 text-xs md:text-sm font-medium text-center">
              Combined Operating <br /> Rate
            </span>
          </div>
        </div>
        <div className="flex flex-row flex-wrap md:flex-col gap-2 min-w-[120px] w-full md:w-auto justify-center md:justify-start">
          {data.map(item => (
            <div key={item.name} className="flex items-center gap-2 text-xs md:text-base w-1/2 md:w-auto">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: item.color }} />
              <span className="text-white font-medium">{item.name}</span>
              <span className="text-white font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
