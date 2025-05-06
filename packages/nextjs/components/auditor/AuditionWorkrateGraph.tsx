import { useState } from "react";
import Link from "next/link";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

interface WorkrateDataPoint {
  day: string;
  validated: number;
  pending: number;
}

interface AuditionWorkrateGraphProps {
  data?: WorkrateDataPoint[];
  title?: string;
}

const defaultData: WorkrateDataPoint[] = [
  { day: "Sun", validated: 12000, pending: 5000 },
  { day: "Mon", validated: 20000, pending: 8000 },
  { day: "Tue", validated: 17000, pending: 10000 },
  { day: "Wed", validated: 35000, pending: 12000 },
  { day: "Thu", validated: 25000, pending: 15000 },
  { day: "Fri", validated: 18000, pending: 7000 },
  { day: "Sat", validated: 30000, pending: 10000 },
];

export default function AuditionWorkrateGraph({
  data = defaultData,
  title = "Your Audition Workrate",
}: AuditionWorkrateGraphProps) {
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
    <div className="bg-[#252525] border border-[#1D2026] rounded-2xl">
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
                <linearGradient id="validatedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A77FF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0A77FF" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="validated"
                stroke="#0A77FF"
                strokeWidth={2}
                fill="url(#validatedGradient)"
                fillOpacity={1}
                activeDot={{ r: 4, fill: "#0A77FF", strokeWidth: 2, stroke: "#fff" }}
                name="Validated"
              />
              <Area
                type="monotone"
                dataKey="pending"
                stroke="#4B5563"
                strokeWidth={2}
                fill="url(#pendingGradient)"
                fillOpacity={1}
                activeDot={{ r: 4, fill: "#4B5563", strokeWidth: 2, stroke: "#fff" }}
                name="Pending"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#060910] px-4 py-3 border-t border-[#1D2026] flex justify-between items-center rounded-b-2xl">
        <span className="text-gray-400 text-sm">Graph for overall validation workrate in the supplychain</span>
        <Link href="/validation" className="text-[#0A77FF] hover:text-blue-500 text-sm flex items-center gap-1">
          Open Validation Portal
          <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
