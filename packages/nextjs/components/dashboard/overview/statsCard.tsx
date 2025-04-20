"use client";

import Icon from "../Icon";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  title: string;
  value: string | number;
  tagName: string;
  tagLabel?: string;
  chartData: Array<{ value: number }>;
  color: string;
}

export default function StatsCard({
  title,
  value,
  tagName,
  tagLabel = "Top mineral",
  chartData,
  color,
}: MetricCardProps) {
  const colorMap: Record<string, { bg: string; text: string; stroke: string }> = {
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      stroke: "#3b82f6",
    },
    green: {
      bg: "bg-green-500",
      text: "text-green-500",
      stroke: "#22c55e",
    },
    red: {
      bg: "bg-red-500",
      text: "text-red-500",
      stroke: "#ef4444",
    },
  };

  const { bg, stroke } = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-xl p-4 min-w-[280px]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <button className="text-gray-400 hover:text-white">
          <Icon path="/dashboard/icon_set/menu.svg" alt="Menu icon" />
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-white text-3xl font-bold">{value}</span>
          <div className="flex items-center gap-2">
            <span className={`${bg} text-white px-2.5 py-0.5 rounded-full text-xs font-medium`}>{tagName}</span>
            <span className="text-gray-400 text-xs">{tagLabel}</span>
          </div>
        </div>

        <div className="h-14 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={stroke}
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
