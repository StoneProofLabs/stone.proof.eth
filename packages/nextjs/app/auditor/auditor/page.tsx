"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Lock, Minus, Plus } from "lucide-react";

// Mock data - in a real app, this would come from an API
const mockMinerals = [
  {
    id: "ffff-eeee-dddd-3333",
    name: "Cobalt",
    dateRange: "23/05/2025 - 23/05/2025",
    purityLevel: 30,
    quantity: 25,
    price: "1250 USD",
    warehouseId: "Quartz",
    state: ["Raw", "Refined"],
    type: "Top Mineral",
  },
  {
    id: "aaaa-bbbb-cccc-4444",
    name: "Iron",
    dateRange: "15/04/2025 - 20/04/2025",
    purityLevel: 45,
    quantity: 50,
    price: "980 USD",
    warehouseId: "Onyx",
    state: ["Raw"],
    type: "Common Mineral",
  },
  {
    id: "1111-2222-3333-4444",
    name: "Titanium",
    dateRange: "01/06/2025 - 15/06/2025",
    purityLevel: 75,
    quantity: 15,
    price: "3200 USD",
    warehouseId: "Quartz",
    state: ["Refined"],
    type: "Premium Mineral",
  },
  {
    id: "5555-6666-7777-8888",
    name: "Copper",
    dateRange: "10/05/2025 - 20/05/2025",
    purityLevel: 60,
    quantity: 35,
    price: "1450 USD",
    warehouseId: "Sapphire",
    state: ["Raw", "Refined"],
    type: "Common Mineral",
  },
];

export default function AuditMinerals() {
  // State for selected mineral and form data
  const [selectedMineralId, setSelectedMineralId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [auditReport, setAuditReport] = useState("");
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [filter, setFilter] = useState("all");

  // Get the selected mineral data
  const selectedMineral = mockMinerals.find(m => m.id === selectedMineralId) || null;

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    setQuantity(newValue);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  const handleSelectMineral = (id: string) => {
    setSelectedMineralId(id);
    const mineral = mockMinerals.find(m => m.id === id);
    if (mineral) {
      setQuantity(mineral.quantity);
    }
  };

  const handleSubmitReport = () => {
    if (!selectedMineralId) return;

    // Prepare data for backend submission
    const submissionData = {
      mineralId: selectedMineralId,
      quantity: quantity,
      auditReport: auditReport,
      timestamp: new Date().toISOString(),
    };

    // In a real app, you would send this to your backend
    console.log("Submitting report:", submissionData);

    // Reset form after submission
    alert("Report submitted successfully!");
    setAuditReport("");
  };

  const handleRaiseDispute = () => {
    if (!selectedMineralId) return;

    // Prepare dispute data
    const disputeData = {
      mineralId: selectedMineralId,
      quantity: quantity,
      auditReport: auditReport,
      timestamp: new Date().toISOString(),
      isDispute: true,
    };

    // In a real app, you would send this to your backend
    console.log("Raising dispute:", disputeData);

    // Reset form after submission
    alert("Dispute raised successfully!");
    setAuditReport("");
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Audit Minerals</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2 px-2 sm:px-0">
          Review and audit minerals in the warehouse. Fill out the audit report and submit your findings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Panel */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
            <h2 className="text-lg font-semibold">Pending In Warehouse</h2>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1 rounded-lg text-sm ${filter === "all" ? "bg-[#0A77FF]" : "bg-[#252525]"}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm ${filter === "raw" ? "bg-[#0A77FF]" : "bg-[#252525]"}`}
                onClick={() => setFilter("raw")}
              >
                Raw
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm ${filter === "refined" ? "bg-[#0A77FF]" : "bg-[#252525]"}`}
                onClick={() => setFilter("refined")}
              >
                Refined
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-4 -mr-4">
            {mockMinerals.map((mineral, i) => (
              <div
                key={i}
                className={`bg-[#1c1c1e] transition-all duration-200 rounded-xl p-6 cursor-pointer ${selectedMineralId === mineral.id ? "border-2 border-[#0A77FF]" : "hover:border hover:border-[#0A77FF]"}`}
                onClick={() => handleSelectMineral(mineral.id)}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-xl">
                    <Image width={30} height={30} alt="" src={"/dashboard/cobalt.png"} />
                  </div>
                  <div className="font-medium">{mineral.name}</div>
                  <div className="text-sm text-gray-400">[{mineral.dateRange}]</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-[18px] text-gray-300 min-w-[70px]">Purity Level</div>
                    <div className="text-[18px] text-gray-300">:</div>
                    <div className="flex-1">
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#0A77FF]" style={{ width: `${mineral.purityLevel}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[18px] text-gray-300 min-w-[70px]">Quantity</div>
                    <div className="text-[18px] text-gray-300">:</div>
                    <div className="flex-1">
                      <div className="bg-[#252525] rounded-md px-3 py-2 border border-[#323539]">
                        <div className="text-[15px] text-gray-300">{mineral.quantity} KG</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[18px] text-gray-300 min-w-[70px]">Price</div>
                    <div className="text-[18px] text-gray-300">:</div>
                    <div className="flex-1">
                      <div className="bg-[#252525] rounded-md px-3 py-2 border border-[#323539]">
                        <div className="text-[15px] text-gray-300">{mineral.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] bg-[#323539] my-6"></div>
                <button
                  className="w-full bg-[#0A77FF] hover:bg-[#0A77FF]/90 text-white py-3 rounded-xl font-medium"
                  onClick={e => {
                    e.stopPropagation();
                    handleSelectMineral(mineral.id);
                  }}
                >
                  View Mineral
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="border-2 border-[#1c1c1e] rounded-xl p-6 space-y-6">
          {selectedMineral ? (
            <>
              {/* Mineral ID */}
              <div>
                <div className="text-base text-white mb-2">Mineral-ID</div>
                <div className="bg-[#252525] border border-[#323539] rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-gray-400" />
                    <span className="text-gray-400">#{selectedMineral.id}</span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleCopy(selectedMineral.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy size={18} />
                    </button>
                    {showCopyTooltip && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        ID copied!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Warehouse ID and Current State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-base text-white mb-2">Warehouse ID</div>
                  <div className="bg-[#252525] border border-[#323539] rounded-xl px-4 py-3">
                    <span>{selectedMineral.warehouseId}</span>
                  </div>
                </div>
                <div>
                  <div className="text-base text-white mb-2">Current State</div>
                  <div className="bg-[#252525] border border-[#323539] rounded-xl px-4 py-3 flex items-center gap-2">
                    {selectedMineral.state.includes("Raw") && (
                      <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-xl">Raw</span>
                    )}
                    {selectedMineral.state.includes("Refined") && (
                      <span className="bg-orange-500 text-white text-sm px-2 py-0.5 rounded-xl">Refined</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Type */}
              <div>
                <div className="text-base text-white mb-2">Type</div>
                <div className="bg-[#252525] border border-[#323539] rounded-xl px-4 py-3">
                  <span>{selectedMineral.type}</span>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <div className="text-base text-white mb-2">Quantity</div>
                <div className="bg-[#252525] flex items-center justify-between rounded-xl px-4 py-3 border border-[#323539]">
                  <span>{quantity} KG</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Audit Report */}
              <div>
                <div className="text-base text-white mb-2">Audit Report</div>
                <textarea
                  value={auditReport}
                  onChange={e => setAuditReport(e.target.value)}
                  placeholder="Enter Audit Report"
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded-xl px-4 py-3 focus:outline-none min-h-[100px] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="w-full bg-[#E33B32] hover:bg-red-600 text-white font-medium py-3 rounded-xl"
                  onClick={handleRaiseDispute}
                >
                  Raise Dispute
                </button>
                <button
                  className="w-full bg-[#0A77FF] hover:bg-blue-700 text-white font-medium py-3 rounded-xl"
                  onClick={handleSubmitReport}
                >
                  Send Report
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <div className="text-gray-400 text-xl mb-4">No Mineral Selected</div>
              <p className="text-gray-500 text-center max-w-md">
                Please select a mineral from the list on the left to view details and submit your audit report.
              </p>
            </div>
          )}

          <p className="text-gray-500 text-center">Your Transaction is secure and safe</p>
        </div>
      </div>
    </div>
  );
}
