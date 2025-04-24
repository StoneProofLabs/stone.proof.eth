import { useState } from "react";
import Icon from "../Icon";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";

const defaultData = [
  { name: "Sun", value: 10, reference: 25 },
  { name: "", value: 5, reference: 30 },
  { name: "", value: 20, reference: 40 },
  { name: "Mon", value: 30, reference: 45 },
  { name: "", value: 80, reference: 50 },
  { name: "", value: 75, reference: 60 },
  { name: "Tue", value: 90, reference: 65 },
  { name: "", value: 60, reference: 70 },
  { name: "", value: 50, reference: 75 },
  { name: "Wed", value: 40, reference: 70 },
  { name: "", value: 30, reference: 65 },
  { name: "", value: 25, reference: 60 },
  { name: "Thu", value: 20, reference: 55 },
  { name: "", value: 30, reference: 60 },
  { name: "", value: 35, reference: 65 },
  { name: "Fri", value: 65, reference: 70 },
  { name: "", value: 45, reference: 75 },
  { name: "", value: 15, reference: 70 },
  { name: "Sat", value: 30, reference: 60 },
];

export default function MineralActivity({ data = defaultData }) {
  const [hoveredData, setHoveredData] = useState(null);

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
    <div className="bg-[#252525] border border-[#323539] rounded-2xl p-4 w-full h-full flex flex-col gap-[20px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white text-lg">mineral-name</h3>
        <button className="text-gray-400">
          <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
        </button>
      </div>

      <hr />

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            onMouseMove={e => {
              if (e && e.activePayload) {
                setHoveredData(e.activePayload[0].payload);
              }
            }}
            onMouseLeave={() => setHoveredData(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#666" axisLine={false} tickLine={false} padding={{ left: 10, right: 10 }} />
            <YAxis
              stroke="#666"
              axisLine={false}
              tickLine={false}
              ticks={[0, 25, 75, 100]}
              tickFormatter={tick => `${tick}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value" 
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6" }}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="reference"
              stroke="#6b7280"
              strokeWidth={2}
              dot={false}
              strokeOpacity={0.6}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <hr />

      <div className="flex justify-between mt-2">
        <span className="text-gray-400">Data in person range</span>
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
