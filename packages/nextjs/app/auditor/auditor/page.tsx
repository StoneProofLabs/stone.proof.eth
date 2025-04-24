"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Lock, Minus, Plus } from "lucide-react";

export default function AuditMinerals() {
  const [quantity, setQuantity] = useState(0);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    setQuantity(newValue);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyTooltip(true);
    setTimeout(() => setShowCopyTooltip(false), 2000);
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Audit Minerals</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2 px-2 sm:px-0">
          Reach out to us with any question or inquiry you have and we&apos;ll do our best to get back to you as soon as
          possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Panel */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4">
            <h2 className="text-lg font-semibold">Pending In Warehouse</h2>
            <button className="w-full sm:w-auto bg-[#252525] hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M6 12H18M8 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Filter
              <span className="bg-[#0A77FF] text-xs px-2 py-0.5 rounded-full">2</span>
            </button>
          </div>

          <div className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-4 -mr-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="bg-[#1c1c1e] hover:border hover:border-[#0A77FF] transition-all duration-200 rounded-xl p-6"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-xl">
                    <Image width={30} height={30} alt="" src={"/dashboard/cobalt.png"} />
                  </div>
                  <div className="font-medium">Cobalt</div>
                  <div className="text-sm text-gray-400">[ 23/05/2025 - 23/05/2025 ]</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-[18px] text-gray-300 min-w-[70px]">Purity Level</div>
                    <div className="text-[18px] text-gray-300">:</div>
                    <div className="flex-1">
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-[#0A77FF] w-[30%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[18px] text-gray-300 min-w-[70px]">Quantity</div>
                    <div className="text-[18px] text-gray-300">:</div>
                    <div className="flex-1">
                      <div className="bg-[#252525] rounded-md px-3 py-2 border border-[#323539]">
                        <div className="text-[15px] text-gray-300">0 KG</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-[18px] text-gray-300 min-w-[70px]">Price</div>
                    <div className="text-[18px] text-gray-300">:</div>
                    <div className="flex-1">
                      <div className="bg-[#252525] rounded-md px-3 py-2 border border-[#323539]">
                        <div className="text-[15px] text-gray-300">0 KG</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] bg-[#323539] my-6"></div>
                <button className="w-full bg-[#0A77FF] hover:bg-[#0A77FF]/90 text-white py-3 rounded-xl font-medium">
                  View Mineral
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="border-2 border-[#1c1c1e] rounded-xl p-6 space-y-6">
          {/* Mineral ID */}
          <div>
            <div className="text-base text-white mb-2">Mineral-ID</div>
            <div className="bg-[#252525] border border-[#323539] rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-gray-400" />
                <span className="text-gray-400">#ffff-eeee-dddd-3333</span>
              </div>
              <div className="relative">
                <button
                  onClick={() => handleCopy("#ffff-eeee-dddd-3333")}
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
                <span>Quartz</span>
              </div>
            </div>
            <div>
              <div className="text-base text-white mb-2">Current State</div>
              <div className="bg-[#252525] border border-[#323539] rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-xl">Raw</span>
                <span className="bg-orange-500 text-white text-sm px-2 py-0.5 rounded-xl">Refined</span>
              </div>
            </div>
          </div>

          {/* Type */}
          <div>
            <div className="text-base text-white mb-2">Type</div>
            <div className="bg-[#252525] border border-[#323539] rounded-xl px-4 py-3">
              <span>Top Mineral</span>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <div className="text-base text-white mb-2">Quantity</div>
            <div className="bg-[#252525] flex items-center justify-between rounded-xl px-4 py-3 border border-[#323539]">
              <span>0 KG</span>
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
              placeholder="Enter Audit Report"
              className="w-full bg-[#252525] border border-[#323539] text-white rounded-xl px-4 py-3 focus:outline-none min-h-[100px] resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full bg-[#E33B32] hover:bg-red-600 text-white font-medium py-3 rounded-xl">
              Raise Dispute
            </button>
            <button className="w-full bg-[#0A77FF] hover:bg-blue-700 text-white font-medium py-3 rounded-xl">
              Send Report
            </button>
          </div>

          <p className="text-gray-500 text-center">Your Transaction is secure and safe</p>
        </div>
      </div>
    </div>
  );
}
