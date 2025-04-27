import React from "react";

interface ProgressCardProps {
  icon: React.ReactNode;
  title: string;
  percent: number;
  pending: string;
  color: string; // e.g. 'orange', 'blue', 'red'
}

const colorMap: Record<string, { bar: string; text: string }> = {
  orange: { bar: "bg-amber-400", text: "text-amber-400" },
  blue: { bar: "bg-blue-500", text: "text-blue-500" },
  red: { bar: "bg-red-500", text: "text-red-500" },
  gray: { bar: "bg-gray-400", text: "text-gray-400" },
};

export default function ProgressCard({ icon, title, percent, pending, color }: ProgressCardProps) {
  const { bar, text } = colorMap[color] || colorMap.gray;
  return (
    <div className="bg-transparent border border-[#323539] rounded-2xl p-5 min-w-[260px] flex flex-col gap-3 items-start shadow-sm transition-all">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-full bg-[#23262F] flex items-center justify-center text-2xl">{icon}</div>
        <span className="text-white text-lg font-semibold">{title}</span>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-2 rounded-full bg-[#23262F] overflow-hidden">
          <div className={`${bar} h-full rounded-full transition-all`} style={{ width: `${percent}%` }} />
        </div>
        <div className="flex justify-between items-center w-full mt-1">
          <span className={`${text} text-base font-semibold`}>{percent}%</span>
          <span className="text-gray-400 text-base">{pending} Pending</span>
        </div>
      </div>
    </div>
  );
}
