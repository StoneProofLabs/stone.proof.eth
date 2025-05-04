"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Minus, Plus } from "lucide-react";

export default function InspectMinerals() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMineral, setSelectedMineral] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedCondition, setSelectedCondition] = useState("");

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    setQuantity(newValue);
  };

  const handlePriceChange = (value: number) => {
    const newValue = Math.max(0, value);
    setPrice(newValue);
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Inspect Minerals</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2 px-2 sm:px-0">
          Verify and inspect minerals to ensure compliance with quality standards and regulations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Panel */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
            <h2 className="text-lg font-semibold">Pending Inspection</h2>
            <button className="w-full sm:w-auto bg-[#252525] hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
              Filter
              <span className="bg-[#0A77FF] text-xs px-2 py-0.5 rounded-full">2</span>
            </button>
          </div>

          {[1, 2].map((_, i) => (
            <div key={i} className="bg-[#1c1c1e] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-xl">
                  <Image width={30} height={30} alt="" src={"/dashboard/cobalt.png"} />
                </div>
                <div className="font-medium">Cobalt</div>
                <div className="text-sm text-gray-400 hidden sm:block">[ 23/05/2025 - 23/05/2025 ]</div>
              </div>
              <div className="text-sm mb-1">Purity Level:</div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-[#0A77FF] w-[50%]"></div>
              </div>
              <div className="text-sm mt-2 flex flex-col gap-4">
                <div className="w-full">
                  <div className="bg-[#252525] flex items-center justify-between rounded-md px-3 sm:px-4 py-2 w-full border border-[#323539]">
                    <div className="text-[14px] text-gray-400">Quantity:</div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={`${quantity} KG`}
                        readOnly
                        className="bg-[#252525] focus:outline-none text-white text-[14px] w-16 sm:w-20 text-right"
                      />
                      <div className="flex items-center gap-2 pl-2 border-l border-[#323539]">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                        >
                          <Minus size={12} />
                        </button>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="bg-[#252525] flex items-center justify-between rounded-md px-3 sm:px-4 py-2 w-full border border-[#323539]">
                    <div className="text-[14px] text-gray-400">Price:</div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={`${price} KG`}
                        readOnly
                        className="bg-[#252525] focus:outline-none text-white text-[14px] w-16 sm:w-20 text-right"
                      />
                      <div className="flex items-center gap-2 pl-2 border-l border-[#323539]">
                        <button
                          onClick={() => handlePriceChange(price - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                        >
                          <Minus size={12} />
                        </button>
                        <button
                          onClick={() => handlePriceChange(price + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-[#0A77FF] hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div>
          <div className="bg-[#1c1c1e] rounded-lg p-4 sm:p-6 h-full">
            <h3 className="text-lg font-medium mb-4">Inspection Form</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Select Mineral</label>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full bg-[#252525] border border-[#323539] rounded-md px-4 py-2 text-left flex items-center justify-between"
                  >
                    <span>{selectedMineral || "Select mineral..."}</span>
                    <ChevronDown size={16} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-[#252525] border border-[#323539] rounded-md shadow-lg">
                      {["Cobalt", "Gold", "Copper", "Lithium"].map(mineral => (
                        <button
                          key={mineral}
                          className="block w-full text-left px-4 py-2 hover:bg-[#323539]"
                          onClick={() => {
                            setSelectedMineral(mineral);
                            setDropdownOpen(false);
                          }}
                        >
                          {mineral}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Purity Level (%)</label>
                <input
                  type="number"
                  className="w-full bg-[#252525] border border-[#323539] rounded-md px-4 py-2 focus:outline-none focus:border-[#0A77FF]"
                  placeholder="Enter purity level"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Good", "Average", "Poor"].map(condition => (
                    <button
                      key={condition}
                      className={`py-2 rounded-md text-sm font-medium ${selectedCondition === condition ? "bg-[#0A77FF] text-white" : "bg-[#252525] border border-[#323539] hover:bg-[#323539]"}`}
                      onClick={() => setSelectedCondition(condition)}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Notes</label>
                <textarea
                  className="w-full bg-[#252525] border border-[#323539] rounded-md px-4 py-2 h-24 focus:outline-none focus:border-[#0A77FF]"
                  placeholder="Add inspection notes..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button className="w-full bg-[#0A77FF] hover:bg-blue-600 text-white font-medium py-2 rounded-md">
                  Submit Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
