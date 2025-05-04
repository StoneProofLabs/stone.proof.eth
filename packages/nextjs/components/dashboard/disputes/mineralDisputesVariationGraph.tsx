import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MineralDisputesGraph = ({ data = dummyData, title = "Mineral Disputes Variation Graph" }) => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedDisputeType, setSelectedDisputeType] = useState("All Disputes");
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isDisputeTypeDropdownOpen, setIsDisputeTypeDropdownOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const years = ["2023", "2024", "2025", "2026"];
  const disputeTypes = ["All Disputes", "Lithium", "Copper", "Rare Earth", "Cobalt", "Nickel"];

  type MineralData = {
    day: string;
    value: number;
    lithium: number;
    copper: number;
    rareEarth: number;
    cobalt: number;
    nickel: number;
    year: string;
  };

  // Filter data when selection changes
  useEffect(() => {
    let result = [...data];

    // Apply year filter if not "All Years"
    if (selectedYear !== "All Years") {
      result = result.filter(item => item.year === selectedYear);
    }

    // Apply dispute type filter if not "All Disputes"
    if (selectedDisputeType !== "All Disputes") {
      const disputeKey = selectedDisputeType.toLowerCase() as keyof MineralData;
      result = result.map(item => ({
        ...item,
        value: disputeKey in item ? (item[disputeKey] as number) : item.value,
      }));
    }

    setFilteredData(result);
  }, [selectedYear, selectedDisputeType, data]);

  const formatYAxis = (value: any) => {
    return `${value}%`;
  };

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg p-4 text-white w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="text-gray-400">
          <button className="p-2 hover:bg-gray-800 rounded">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex space-x-3 mb-6">
        {/* Dispute Type Dropdown */}
        <div className="relative w-full">
          <button
            className="w-full p-3 bg-[#252525] border border-[#323539] rounded flex justify-between items-center"
            onClick={() => setIsDisputeTypeDropdownOpen(!isDisputeTypeDropdownOpen)}
          >
            <span>{selectedDisputeType}</span>
            <ChevronDown size={20} />
          </button>

          {isDisputeTypeDropdownOpen && (
            <div className="absolute mt-1 w-full bg-[#252525] border border-[#323539] rounded-md shadow-lg z-10">
              {disputeTypes.map(type => (
                <button
                  key={type}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={() => {
                    setSelectedDisputeType(type);
                    setIsDisputeTypeDropdownOpen(false);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year Dropdown */}
        <div className="relative w-32">
          <button
            className="w-full p-3 bg-[#252525] border border-[#323539] rounded flex justify-between items-center"
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
          >
            <span>{selectedYear}</span>
            <ChevronDown size={20} />
          </button>

          {isYearDropdownOpen && (
            <div className="absolute mt-1 w-full bg-[#252525] border border-[#323539] rounded-md shadow-lg z-10">
              {years.map(year => (
                <button
                  key={year}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearDropdownOpen(false);
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#ccc" }} />
            <YAxis
              tickFormatter={formatYAxis}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#ccc" }}
              domain={[0, 100]}
              ticks={[0, 25, 75, 100]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "4px" }}
              formatter={value => [`${value}%`, selectedDisputeType]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2196F3"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <div>Data in person range</div>
        <button className="flex items-center text-blue-400 hover:text-blue-300">
          Open <ExternalLink size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

// Dummy data to demonstrate the component
const dummyData = [
  { day: "Sun", value: 10, lithium: 15, copper: 5, rareEarth: 8, cobalt: 12, nickel: 7, year: "2025" },
  { day: "Mon", value: 25, lithium: 30, copper: 20, rareEarth: 22, cobalt: 28, nickel: 18, year: "2025" },
  { day: "Tue", value: 90, lithium: 85, copper: 95, rareEarth: 88, cobalt: 92, nickel: 80, year: "2025" },
  { day: "Wed", value: 75, lithium: 80, copper: 70, rareEarth: 72, cobalt: 78, nickel: 65, year: "2025" },
  { day: "Thu", value: 25, lithium: 30, copper: 20, rareEarth: 22, cobalt: 28, nickel: 18, year: "2025" },
  { day: "Fri", value: 60, lithium: 65, copper: 55, rareEarth: 58, cobalt: 62, nickel: 50, year: "2025" },
  { day: "Sat", value: 35, lithium: 40, copper: 30, rareEarth: 32, cobalt: 38, nickel: 28, year: "2025" },
];

export default MineralDisputesGraph;
