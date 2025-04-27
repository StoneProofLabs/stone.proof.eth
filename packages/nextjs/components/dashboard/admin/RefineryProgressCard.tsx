import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const data = [
  { percent: 25 },
  { percent: 70 },
  { percent: 100 },
  { percent: 90 },
  { percent: 95 },
  { percent: 80 },
  { percent: 75 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1F2937] p-2 rounded-lg border border-[#374151] shadow-lg">
        <span className="text-white text-xs font-medium">{payload[0].value}%</span>
      </div>
    );
  }
  return null;
};

const RefineryProgressCard = () => (
  <div className="rounded-2xl p-6 border border-[#1E2328] w-full mt-4">
    <div className="relative w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <YAxis
            domain={[0, 100]}
            ticks={[75, 25, 0]}
            tickFormatter={v => `${v}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#ccc", fontSize: 16 }}
            width={40}
          />
          <CartesianGrid strokeDasharray="6 6" stroke="#333" vertical={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#3B82F6", strokeWidth: 1, opacity: 0.2 }} />
          <Area
            type="monotone"
            dataKey="percent"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#progressGradient)"
            fillOpacity={1}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RefineryProgressCard;
