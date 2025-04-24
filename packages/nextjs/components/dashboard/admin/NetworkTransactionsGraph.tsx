import { useState } from "react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const defaultData = [
  { day: "Sun", purchased: 15000, shipped: 12000 },
  { day: "Mon", purchased: 25000, shipped: 22000 },
  { day: "Tue", purchased: 35000, shipped: 30000 },
  { day: "Wed", purchased: 30000, shipped: 28000 },
  { day: "Thu", purchased: 20000, shipped: 18000 },
  { day: "Fri", purchased: 25000, shipped: 22000 },
  { day: "Sat", purchased: 22000, shipped: 20000 },
];

interface NetworkTransactionsGraphProps {
  data?: typeof defaultData;
  title?: string;
}

export default function NetworkTransactionsGraph({
  data = defaultData,
  title = "Network Transactions Overall",
}: NetworkTransactionsGraphProps) {
  const [hoveredData, setHoveredData] = useState<any>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F2937] p-3 rounded-lg border border-[#374151] shadow-lg">
          <p className="text-white font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-end items-center gap-4 mb-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-400 text-sm capitalize">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#060910] border border-[#1D2026] rounded-2xl">
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white text-lg font-medium">{title}</h3>
          <button className="text-gray-400 hover:text-white">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </button>
        </div>
        <hr className="border-t border-[#1D2026] mb-4" />

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
              onMouseMove={e => {
                if (e && e.activePayload) {
                  setHoveredData(e.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => setHoveredData(null)}
            >
              <defs>
                <linearGradient id="purchasedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="shippedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B5563" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#4B5563" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#666"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                stroke="#666"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={value => `${value / 1000}k`}
                ticks={[10000, 20000, 30000, 40000]}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8} content={renderLegend} />
              <Area
                type="monotone"
                dataKey="purchased"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#purchasedGradient)"
                fillOpacity={1}
                activeDot={{ r: 4, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }}
                name="Purchased"
              />
              <Area
                type="monotone"
                dataKey="shipped"
                stroke="#4B5563"
                strokeWidth={2}
                fill="url(#shippedGradient)"
                fillOpacity={1}
                activeDot={{ r: 4, fill: "#4B5563", strokeWidth: 2, stroke: "#fff" }}
                name="Shipped"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#060910] px-4 py-3 border-t border-[#1D2026] flex justify-between items-center rounded-b-2xl">
        <span className="text-gray-400 text-sm">Graph for overall Transactions in the supplychain</span>
        <Link href="/minerals" className="text-[#0A77FF] hover:text-blue-500 text-sm flex items-center gap-1">
          Open Mineral Portal
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
