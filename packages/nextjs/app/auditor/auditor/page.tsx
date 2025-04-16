"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AlertCircle, ChevronDown, Minus, Plus } from "lucide-react";

export default function AuditMinerals() {
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
        <h1 className="text-2xl sm:text-3xl font-bold">Audit Minerals</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2 px-2 sm:px-0">
          Reach out to us with any question or inquiry you have and we'll do our best to get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Panel */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
            <h2 className="text-lg font-semibold">Pending In Warehouse</h2>
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
              <button className="mt-4 w-full bg-[#0A77FF] hover:bg-[#0A77FF] text-white py-2 rounded-md">
                View Mineral
              </button>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="border-2 border-[#1c1c1e] rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Custom Select Dropdown */}
            <div className="relative">
              <div className="bg-[#252525] border border-[#323539] rounded-md px-3 sm:px-4 py-3 text-white text-sm cursor-pointer">
                {selectedMineral || "Valid Mineral name"}
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#252525] border border-[#323539] rounded-md px-3 sm:px-4 py-3 text-white text-sm cursor-pointer">
                {selectedMineral || "Valid Mineral name"}
              </div>
            </div>
          </div>

          {/* Top Mineral Select */}
          <div className="relative">
            <div className="bg-[#252525] border border-[#323539] rounded-md px-3 sm:px-4 py-3 text-white text-sm cursor-pointer">
              Top Mineral
            </div>
          </div>

          {/* Audit Report Textarea */}
          <textarea
            placeholder="Enter Audit Report"
            className="w-full bg-[#252525] border border-[#323539] text-white rounded-md px-3 sm:px-4 py-3 focus:outline-none min-h-[100px]"
          />

          {/* Quantity Input */}
          <div className="flex items-center gap-2">
            <div className="bg-[#252525] flex items-center justify-between rounded-md px-3 sm:px-4 py-3 w-full border border-[#323539]">
              <input
                type="text"
                value={`${quantity} KG`}
                readOnly
                className="bg-[#252525] focus:outline-none text-white text-[14px] w-full"
              />
              <div className="flex items-center ml-4 pl-4 border-l border-[#323539] gap-2">
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

          {/* Storage Conditions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1">
              <div className="flex items-center bg-[#1E1E1E] border border-[#323539] rounded-xl overflow-hidden h-full">
                <div className="flex-1 px-3 sm:px-4 py-3 text-white text-sm bg-[#252525]">
                  {selectedCondition || "No Conditions specified"}
                </div>
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-[#2B2D2F] hover:bg-gray-600 px-3 sm:px-4 py-3 flex items-center gap-1 text-white text-sm h-full"
                  >
                    Select
                    <ChevronDown size={18} />
                  </button>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-[#252525] hover:bg-gray-600 text-white px-4 py-3 rounded-md">
              View
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full bg-[#E33B32] hover:bg-red-600 text-white font-medium py-3 rounded">
              Raise Dispute
            </button>
            <button className="w-full bg-[#0A77FF] hover:bg-blue-700 text-white font-medium py-3 rounded">
              Send Report
            </button>
          </div>

          <p className="text-base sm:text-lg text-gray-500 text-center">Your Transaction is secure and safe</p>
        </div>
      </div>
    </div>
  );
}
