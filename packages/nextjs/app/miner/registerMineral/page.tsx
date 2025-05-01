"use client";

import React, { useState } from "react";
import { AlertCircle, Check, ChevronDown, Droplet, MapPin, Minus, Plus, Thermometer } from "lucide-react";

export default function Page() {
  const [quantity, setQuantity] = useState(0);
  const [purity, setPurity] = useState(0);
  const [portalOpen, setPortalOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState({
    temperature: "In Celsius",
    storage: "Select Type",
    humidity: "Select Type",
  });

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    setQuantity(newValue);
  };

  const handlePurityChange = (value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    setPurity(newValue);
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Register Mineral</h1>

        <p className="text-gray-400 text-center mb-8">
          Reach out to us with any question or inquiry you have and we&apos;ll do our best to get back to you as soon as
          possible.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* The form */}
          <div className="border border-[#323539] rounded-lg p-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mineral Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Mineral Name</label>
                <input
                  type="text"
                  placeholder="Valid Mineral name"
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <input
                  type="text"
                  placeholder="Mineral type here"
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                />
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-medium mb-2">Origin</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Origin here"
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="bg-[#252525] flex items-center justify-between rounded-md px-4 py-3 w-full border border-[#323539]">
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => {
                      const value = parseFloat(e.target.value);
                      handleQuantityChange(isNaN(value) ? 0 : value);
                    }}
                    className="bg-[#252525] focus:outline-none text-white text-[14px] w-full"
                    min="0"
                    step="0.1"
                  />
                  <span className="text-[#979AA0] ml-2">KG</span>
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

              {/* Purity */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-2 text-white">Purity Percentage</label>
                <div className="flex items-center bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#323539]">
                  <div className="flex-1 px-4 py-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={purity}
                      onChange={e => handlePurityChange(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-[#e5e5ee]"
                      style={{
                        background: `linear-gradient(to right, #007BFF 0%, #007BFF ${purity}%, #e5e5ee ${purity}%, #e5e5ee 100%)`,
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 bg-[#2B2D2F] min-w-[130px] justify-end">
                    <button
                      onClick={() => handlePurityChange(Math.max(0, purity - 1))}
                      className="w-7 h-7 flex items-center justify-center bg-[#2f3135] hover:bg-gray-600 rounded-full text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white text-sm w-10 text-center">{purity}%</span>
                    <button
                      onClick={() => handlePurityChange(Math.min(100, purity + 1))}
                      className="w-7 h-7 flex items-center justify-center bg-[#2f3135] hover:bg-gray-600 rounded-full text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Storage Conditions */}
              <div className="w-full relative">
                <label className="block text-sm font-medium mb-2 text-white">Storage Conditions</label>
                <div className="flex items-center bg-[#1E1E1E] border border-[#323539] rounded-xl overflow-hidden">
                  <div className="flex-1 px-4 py-3 text-white text-sm bg-[#252525]">
                    {selectedCondition.storage !== "Select Type"
                      ? `${selectedCondition.storage} - ${selectedCondition.temperature} - ${selectedCondition.humidity}`
                      : "No Conditions specified"}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setPortalOpen(true)}
                      className="bg-[#2B2D2F] hover:bg-gray-600 px-4 py-3 flex items-center gap-1 text-white text-sm h-full"
                    >
                      Select
                      <ChevronDown size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button className="w-full bg-accentBlue hover:bg-blue-600 text-white font-medium py-3 rounded mt-8 duration-500">
              Register Mineral
            </button>

            <p className="text-gray-400 text-sm text-center mt-4">Your Transaction is secure and safe</p>
          </div>

          {/* Checkpoints Section */}
          <div className="lg:w-72">
            <div className="rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Check-points</h2>
              <div className="space-y-3 mb-6">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-green-500 rounded-full p-1">
                        <Check size={12} />
                      </div>
                      <span className="text-sm">Valid mineral name</span>
                    </div>
                  ))}
              </div>
              <h3 className="font-medium mb-2">Tips:</h3>
              <div className="flex gap-2 text-sm">
                <AlertCircle className="min-w-5 h-5 text-white mt-0.5" />
                <p className="text-gray-400">
                  Ensure that the details entered are accurate and correct because you won&apos;t be able to make
                  modifications after registration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Conditions Portal */}
      {portalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#0D0D0D] border border-gray-700 rounded-xl p-8 w-[400px] relative">
            <h2 className="text-white text-lg mb-6 font-semibold">Specify Storage Conditions</h2>

            {/* Temperature */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Temperature (°C):</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter temperature"
                  value={
                    selectedCondition.temperature === "In Celsius"
                      ? ""
                      : selectedCondition.temperature.replace("°C", "")
                  }
                  onChange={e =>
                    setSelectedCondition(prev => ({
                      ...prev,
                      temperature: e.target.value ? `${e.target.value}°C` : "In Celsius",
                    }))
                  }
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
                />
                <Thermometer className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Storage Type */}
            <div className="mb-4">
              <label className="block text-white text-sm mb-2">Storage Type:</label>
              <select
                value={selectedCondition.storage}
                onChange={e => setSelectedCondition(prev => ({ ...prev, storage: e.target.value }))}
                className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
              >
                <option value="Select Type">Select Storage Type</option>
                <option value="Cool & Dry Place">Cool & Dry Place</option>
                <option value="Room Temperature">Room Temperature</option>
                <option value="Refrigerated">Refrigerated</option>
                <option value="Freezer">Freezer</option>
                <option value="Climate Controlled">Climate Controlled</option>
              </select>
            </div>

            {/* Humidity Range */}
            <div className="mb-6">
              <label className="block text-white text-sm mb-2">Humidity Range (%):</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={selectedCondition.humidity.split("-")[0].replace("%", "")}
                  onChange={e => {
                    const current = selectedCondition.humidity.split("-");
                    setSelectedCondition(prev => ({
                      ...prev,
                      humidity: `${e.target.value}-${current[1] || "50"}%`,
                    }));
                  }}
                  className="flex-1 bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
                  min="0"
                  max="100"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={selectedCondition.humidity.split("-")[1]?.replace("%", "") || ""}
                  onChange={e => {
                    const current = selectedCondition.humidity.split("-");
                    setSelectedCondition(prev => ({
                      ...prev,
                      humidity: `${current[0] || "30"}-${e.target.value}%`,
                    }));
                  }}
                  className="flex-1 bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
                  min="0"
                  max="100"
                />
                <Droplet className="text-gray-400" size={16} />
              </div>
            </div>

            {/* Confirm */}
            <button
              onClick={() => setPortalOpen(false)}
              className="w-full bg-accentBlue hover:bg-blue-600 text-white font-medium py-2 rounded-md"
            >
              Confirm
            </button>

            {/* Close */}
            <button
              onClick={() => setPortalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
