import { useState } from "react";
import Icon from "../Icon";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";

const defaultData = [
  { name: "Sun", value: 25 },
  { name: "Mon", value: 25 },
  { name: "Tue", value: 70 },
  { name: "Wed", value: 60 },
  { name: "Thu", value: 85 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 78 },
];

interface MineralActivityProps {
  data?: typeof defaultData;
  headerBg?: string;
  footerBg?: string;
  containerBg?: string;
  graphBg?: string;
}

export default function MineralActivity({
  data = defaultData,
  headerBg = "#252525",
  footerBg = "#252525",
  containerBg = "#252525",
  graphBg = "#1a1a1a",
}: MineralActivityProps) {
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded shadow-lg border border-gray-700">
          <p className="text-gray-200 font-medium">{`${payload[0].payload.name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{ backgroundColor: containerBg }}
      className="border border-[#323539] rounded-2xl overflow-hidden w-full h-full flex flex-col"
    >
      <div style={{ backgroundColor: headerBg }} className="px-4 py-3 flex justify-between items-center">
        <h3 className="text-white text-lg">mineral-name</h3>
        <button className="text-gray-400">
          <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
        </button>
      </div>

      <hr className="border-[#323539] m-0" />

      <div className="flex-grow px-6 py-4" style={{ backgroundColor: graphBg }}>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333"
                vertical={false}
                horizontalCoordinatesGenerator={props => {
                  return [0, 25, 75, 100].map(tick => props.height * (1 - tick / 100));
                }}
              />
              <XAxis
                dataKey="name"
                stroke="#666"
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <YAxis
                stroke="#666"
                axisLine={false}
                tickLine={false}
                ticks={[0, 25, 75, 100]}
                tickFormatter={tick => `${tick}%`}
                domain={[0, 100]}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <hr className="border-[#323539] m-0" />

      <div style={{ backgroundColor: footerBg }} className="px-4 py-3 flex justify-between items-center">
        <span className="text-gray-400">Mineral Selling Report</span>
        <button className="text-blue-500 flex items-center">
          Open
          <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
