"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Check, ChevronDown, MapPin, Minus, Plus } from "lucide-react";

export default function Page() {
  const [quantity, setQuantity] = useState(0);
  const [purity, setPurity] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState("");

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    setQuantity(newValue);
  };

  const handlePurityChange = (value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    setPurity(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownOpen && !target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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

              {/* Purity Percentage */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-2 text-white">Purity Percentage</label>
                <div className="flex items-center bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#323539]">
                  {/* Slider */}
                  <div className="flex-1 px-4 py-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={purity}
                      onChange={e => handlePurityChange(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-[#e5e5ee] slider-thumb-blue"
                      style={{
                        background: `linear-gradient(to right, #007BFF 0%, #007BFF ${purity}%, #e5e5ee ${purity}%, #e5e5ee 100%)`,
                      }}
                    />
                  </div>

                  {/* Value & Buttons */}
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
                  {/* Display */}
                  <div className="flex-1 px-4 py-3 text-white text-sm bg-[#252525]">
                    {selectedCondition || "No Conditions specified"}
                  </div>

                  {/* Dropdown Button */}
                  <div className="relative dropdown-container">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="bg-[#2B2D2F] hover:bg-gray-600 px-4 py-3 flex items-center gap-1 text-white text-sm h-full"
                    >
                      Select
                      <ChevronDown size={18} />
                    </button>

                    {/* Dropdown List */}
                    {dropdownOpen && (
                      <ul className="absolute right-0 top-full mt-1 bg-[#2B2D2F] border border-[#323539] rounded-md shadow-lg z-10 w-48">
                        {["Cool & Dry Place", "Refrigerated", "Room Temperature", "Frozen"].map(condition => (
                          <li
                            key={condition}
                            onClick={() => {
                              setSelectedCondition(condition);
                              setDropdownOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-600 text-white text-sm cursor-pointer"
                          >
                            {condition}
                          </li>
                        ))}
                      </ul>
                    )}
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
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full p-1">
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Valid mineral name</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full p-1">
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Valid mineral name</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full p-1">
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Valid mineral name</span>
                </div>
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
    </div>
  );
}
