"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy } from "lucide-react";

// Define mineral data type
interface Mineral {
  id: string;
  name: string;
  image: string;
  dateRange: string;
  purity: number;
  quantity: string;
  price: string;
}

// Create a reusable MineralCard component
const MineralCard = ({
  mineral,
  isSelected,
  onSelect,
  onRaiseDispute,
  onAccept,
}: {
  mineral: Mineral;
  isSelected: boolean;
  onSelect: () => void;
  onRaiseDispute: () => void;
  onAccept: () => void;
}) => {
  return (
    <div
      className={`rounded-lg p-4 border transition-colors duration-200 cursor-pointer ${
        isSelected ? "border-[#0A77FF]" : "border-[#23262B]"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="text-xl">
          <Image width={30} height={30} alt={mineral.name} src={mineral.image} />
        </div>
        <h3 className="font-bold">{mineral.name}</h3>
        <span className="text-sm text-gray-400">[ {mineral.dateRange} ]</span>
      </div>

      <div className="mb-4">
        <div className="text-sm mb-1">Purity Level:</div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${mineral.purity}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="text-sm">
          <span className="text-gray-400">Quantity:</span>
          <div className="bg-[#060910] border border-[#23262B] rounded p-2 mt-1">{mineral.quantity}</div>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Price:</span>
          <div className="bg-[#060910] border border-[#23262B] rounded p-2 mt-1">{mineral.price}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white rounded py-2 text-sm font-medium transition-colors"
          onClick={e => {
            e.stopPropagation();
            onRaiseDispute();
          }}
        >
          Raise Dispute
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 text-sm font-medium transition-colors"
          onClick={e => {
            e.stopPropagation();
            onAccept();
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default function RaiseDisputePage() {
  // Mock data for minerals
  const minerals: Mineral[] = [
    {
      id: "min-001",
      name: "Cobalt",
      image: "/dashboard/cobalt.png",
      dateRange: "23/05/2025 - 30/05/2025",
      purity: 33,
      quantity: "50 KG",
      price: "$2,500",
    },
    {
      id: "min-002",
      name: "Gold",
      image: "/dashboard/cobalt.png",
      dateRange: "15/05/2025 - 22/05/2025",
      purity: 75,
      quantity: "10 KG",
      price: "$8,200",
    },
    {
      id: "min-003",
      name: "Copper",
      image: "/dashboard/cobalt.png",
      dateRange: "10/05/2025 - 17/05/2025",
      purity: 50,
      quantity: "120 KG",
      price: "$1,800",
    },
    {
      id: "min-004",
      name: "Lithium",
      image: "/dashboard/cobalt.png",
      dateRange: "05/05/2025 - 12/05/2025",
      purity: 45,
      quantity: "75 KG",
      price: "$3,400",
    },
    {
      id: "min-005",
      name: "Cobalt",
      image: "/dashboard/cobalt.png",
      dateRange: "01/05/2025 - 08/05/2025",
      purity: 60,
      quantity: "85 KG",
      price: "$4,200",
    },
    {
      id: "min-006",
      name: "Gold",
      image: "/dashboard/cobalt.png",
      dateRange: "25/04/2025 - 02/05/2025",
      purity: 80,
      quantity: "5 KG",
      price: "$3,900",
    },
  ];

  const [selectedMineralId, setSelectedMineralId] = useState(minerals[0]?.id || "");
  const selectedMineral = minerals.find(m => m.id === selectedMineralId);

  const handleRaiseDispute = (mineralId: string) => {
    setSelectedMineralId(mineralId);
    console.log(`Raising dispute for mineral ID: ${mineralId}`);
  };

  const handleAccept = (mineralId: string) => {
    console.log(`Accepting mineral ID: ${mineralId}`);
    // Implementation for accepting the mineral
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Raise Dispute</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2">
          Raise a dispute regarding the current status of the mineral if you disagree with the updates recorded on the
          blockchain
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Minerals List */}
        <div className="w-full md:w-1/3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Pending In Warehouse</h2>
            <button className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2">
              <span className="hidden sm:inline">Filter</span>
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {minerals.length}
              </span>
            </button>
          </div>

          {/* Scrollable minerals list */}
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[calc(100vh-300px)] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
            {minerals.map(mineral => (
              <MineralCard
                key={mineral.id}
                mineral={mineral}
                isSelected={selectedMineralId === mineral.id}
                onSelect={() => setSelectedMineralId(mineral.id)}
                onRaiseDispute={() => handleRaiseDispute(mineral.id)}
                onAccept={() => handleAccept(mineral.id)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Dispute Form */}
        <div className="w-full md:w-2/3  p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mineral ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={selectedMineral?.id || ""}
                  className="w-full bg-[#060910] border border-zinc-700 rounded-md px-4 py-3 text-white"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Defendant ID</label>
              <div className="relative">
                <input
                  type="text"
                  value="0xffed-ecd3-34fc-2920"
                  className="w-full bg-[#060910] border border-zinc-700 rounded-md px-4 py-3 text-white"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Complainant ID (Your ID)</label>
              <div className="relative">
                <input
                  type="text"
                  value="0xffed-ecd3-34fc-2920"
                  className="w-full bg-[#060910] border border-zinc-700 rounded-md px-4 py-3 text-white"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Issue Description</label>
              <textarea
                placeholder="Describe the dispute in detail, including specific issues with the mineral quality, quantity, or other concerns..."
                className="w-full bg-[#060910] border border-zinc-700 rounded-md px-4 py-3 text-white min-h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="bg-[#E33B32] hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors">
                Cancel
              </button>
              <button className="bg-[#0A77FF] hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors">
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
