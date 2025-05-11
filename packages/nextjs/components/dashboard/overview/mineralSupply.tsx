"use client";

import Icon from "../Icon";
import { ExternalLink } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MineralSupplyData {
  month: string;
  completed: number;
  inTransit: number;
}

interface MineralSupplyGraphProps {
  data: MineralSupplyData[];
  title?: string;
  description?: string;
  actionLabel?: string;
  actionUrl?: string;
}

export default function MineralSupplyGraph({
  data,
  title = "Mineral Supply Graph",
  description = "This is a sample representation of the mineral transactions",
  actionLabel = "Open Mineral Portal",
  actionUrl = "#",
}: MineralSupplyGraphProps) {
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return value.toString();
  };

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-2xl p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <button className="text-gray-400 hover:text-white">
          <Icon path="/dashboard/icon_set/menu.svg" alt="Menu icon" />
        </button>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF" }} tickFormatter={formatYAxis} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", color: "white" }}
              itemStyle={{ color: "white" }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            />
            <Legend align="right" verticalAlign="top" iconType="circle" wrapperStyle={{ paddingBottom: "10px" }} />
            <Bar dataKey="completed" fill="#3B82F6" name="Completed" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inTransit" fill="#1E40AF" name="In-transit" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-400 text-sm">{description}</p>
        <a href={actionUrl} className="text-blue-500 hover:text-blue-400 text-sm font-medium flex items-center gap-1">
          {actionLabel}
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
