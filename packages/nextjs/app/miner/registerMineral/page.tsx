"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Droplet,
  MapPin,
  Minus,
  Plus,
  Thermometer,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";


export default function Page() {
  const { address, isConnected } = useAccount();

  const [quantity, setQuantity] = useState(0);
  const [purity, setPurity] = useState(0);
  const [portalOpen, setPortalOpen] = useState(false);
  const [mineralName, setMineralName] = useState("");
  const [mineralType, setMineralType] = useState("");
  const [origin, setOrigin] = useState("");
  const [selectedCondition, setSelectedCondition] = useState({
    temperature: "In Celsius",
    storage: "Select Type",
    humidity: "Select Type",
  });

  const storageConditions = `${selectedCondition.storage} | ${selectedCondition.temperature} | ${selectedCondition.humidity}`;

  const allFieldsReady =
    isConnected &&
    mineralName &&
    mineralType &&
    origin &&
    selectedCondition.storage !== "Select Type" &&
    selectedCondition.humidity !== "Select Type";

  const { write, isLoading } = useScaffoldContract({
    contractName: "RolesManager",
    functionName: "registerMineral",
    args: [mineralName, mineralType, origin, quantity, purity, storageConditions],
    enabled: allFieldsReady,
    onSuccess: () => {
      alert("Mineral registered successfully!");
    },
    onError: (error: any) => {
      console.error("Registration failed:", error);
      alert("Failed to register mineral.");
    },
  });

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(0, value));
  };

  const handlePurityChange = (value: number) => {
    setPurity(Math.max(0, Math.min(100, value)));
  };

  const handleRegister = async () => {
    if (!isConnected) {
      alert("Please connect your wallet.");
      return;
    }

    if (!allFieldsReady) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (write) {
        await write();
      } else {
        alert("Contract write function is not available.");
      }
    } catch (err) {
      console.error("Error calling write function:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center p-6">
      {/* Form Header */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Register Mineral</h1>
        <p className="text-gray-400 text-center mb-8">
          Reach out to us with any question or inquiry you have and we&apos;ll do our best to get back to you as soon as possible.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Form Section */}
          <div className="border border-[#323539] rounded-lg p-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mineral Fields */}
              <div>
                <label className="block text-sm font-medium mb-2">Mineral Name</label>
                <input
                  type="text"
                  value={mineralName}
                  onChange={e => setMineralName(e.target.value)}
                  placeholder="Valid Mineral name"
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <input
                  type="text"
                  value={mineralType}
                  onChange={e => setMineralType(e.target.value)}
                  placeholder="Mineral type here"
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Origin</label>
                <div className="relative">
                  <input
                    type="text"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    placeholder="Enter Origin here"
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Quantity and Purity */}
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
                      onClick={() => handlePurityChange(purity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-[#2f3135] hover:bg-gray-600 rounded-full text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white text-sm w-10 text-center">{purity}%</span>
                    <button
                      onClick={() => handlePurityChange(purity + 1)}
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
                      Select <ChevronDown size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-accentBlue hover:bg-blue-600 text-white font-medium py-3 rounded mt-8 duration-500"
            >
              {isLoading ? "Registering..." : "Register Mineral"}
            </button>
            <p className="text-gray-400 text-sm text-center mt-4">Your transaction is secure and safe.</p>
          </div>

          {/* Right Info Panel */}
          <div className="lg:w-72">
            <div className="rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Check-points</h2>
              <div className="space-y-3 mb-6">
                {[...Array(3)].map((_, i) => (
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
                  Ensure the details entered are accurate. Modifications won&apos;t be allowed post registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Conditions Modal (same as before) */}
      {portalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#0D0D0D] border border-gray-700 rounded-xl p-8 w-[400px] relative">
            <h2 className="text-white text-lg mb-6 font-semibold">Specify Storage Conditions</h2>
            {/* Temperature, Storage Type, Humidity Inputs Here */}
            {/* You can copy the modal content from the original code and reinsert it here */}
          </div>
        </div>
      )}
    </div>
  );
}
