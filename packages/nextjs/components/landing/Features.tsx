import React, { useState } from "react";
import { mineralsData, supplyData } from "../../data/data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ACCORDION_ITEMS = [
  {
    id: 1,
    title: "Real-Time Mineral Traceability",
    icon: "/landing/icon1.svg", // Replace with your icon
    content: "Get real-time updates, actionable insights, and tailored tools to optimize your mineral supply chain.",
  },
  {
    id: 2,
    title: "Refinery Oversight & Verification",
    icon: "/landing/icon2.svg", // Replace with your icon
    content: "Ensure every step of the refining process is transparent and verifiable for all stakeholders.",
  },
  {
    id: 3,
    title: "Dispute Management System",
    icon: "/landing/icon3.svg", // Replace with your icon
    content: "Quickly resolve issues and maintain trust with a robust, transparent dispute management system.",
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const baseBarHeights = mineralsData.slice(0, 8).map(d => d.value);
const boostedBarHeights = baseBarHeights.map(v => v + 20);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1F2937] p-3 rounded-lg border border-[#374151] shadow-lg">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Features = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Animate bar heights when the first accordion is open
  const analyticsData = months.map((month, i) => ({
    month,
    value: openAccordion === 1 ? boostedBarHeights[i] : baseBarHeights[i],
  }));

  const handleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <section className="w-full bg-[#10131A] py-16 px-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Overview Of Our Core Features</h2>
      <p className="text-gray-400 text-center max-w-2xl mb-12">
        Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on
        cross-platform integration.
      </p>
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-9xl items-stretch">
        {/* Left Card */}
        <div className="bg-[#060910] border border-[#23262F] rounded-2xl p-8 flex-1 max-w-lg mx-auto shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Total Minerals Mined</h3>
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#181B20] border border-[#23262F]">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
                </svg>
              </span>
            </div>
            {/* Graph */}
            <div className="bg-[#060910] border border-[#23262F] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Graph</span>
                <span className="text-gray-400 text-xl font-bold cursor-pointer select-none">...</span>
              </div>
              <div className="flex items-center mb-2">
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Last Month</span>
                  <span className="block text-2xl font-bold text-white leading-tight">135,450 KG</span>
                  <span className="block text-green-500 text-xs font-semibold mt-1">+13.5%</span>
                </div>
              </div>
              <div className="w-full h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mineralsData.slice(0, 8).map((d, i) => ({ ...d, name: months[i] }))}
                    margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="minedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      stroke="#666"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      fill="url(#minedGradient)"
                      dot={{ r: 4, fill: "#3B82F6" }}
                      activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                      name="Mined"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Analytics */}
            <div className="bg-[#060910] border border-[#23262F] rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Analytics</span>
                <span className="text-gray-400 text-xl font-bold cursor-pointer select-none">...</span>
              </div>
              <div className="w-full h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    barCategoryGap={16}
                  >
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#181B20", borderColor: "#23262F", color: "white" }}
                      itemStyle={{ color: "white" }}
                      cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                    />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto">
          <span className="text-xs text-[#0A77FF] font-semibold mb-2">1% OF THE INDUSTRY</span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Track minerals transparently and build trust across the supply chain.
          </h3>
          <p className="text-gray-400 mb-8 max-w-lg">
            Get real-time updates, actionable insights, and tailored tools to optimize your mineral supply chain.
          </p>
          <div className="space-y-4">
            {ACCORDION_ITEMS.map(item => (
              <div key={item.id} className=" border border-[#23262F] rounded-xl">
                <button
                  className="w-full flex items-center justify-between p-5 focus:outline-none"
                  onClick={() => handleAccordion(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#23262F]">
                      <img src={item.icon} alt="icon" className="w-5 h-5 object-contain" />
                    </span>
                    <span className="text-white font-medium text-lg text-left">{item.title}</span>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${openAccordion === item.id ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === item.id && (
                  <div className="px-5 pb-5 text-gray-400 text-base animate-fadeIn">{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
