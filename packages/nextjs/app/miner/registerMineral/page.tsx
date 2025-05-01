"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Check, ChevronDown, MapPin, Minus, Plus } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

export default function Page() {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    mineralName: "",
    mineralType: "",
    origin: "",
    weight: 0,
    purityPercentage: 81, // Minimum 81% as per contract
    storageConditions: "",
  });

  // Check miner role
  const { data: hasMinerRole } = useScaffoldContractRead({
    contractName: "RolesManager",
    functionName: "hasMinerRole",
    args: [address],
  });

  // Contract write configuration
  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "RolesManager",
    functionName: "registerMineral",
    args: [
      formData.mineralName,
      formData.mineralType,
      BigInt(formData.weight),
      formData.origin,
      BigInt(formData.purityPercentage),
      formData.storageConditions,
    ],
    onBlockConfirmation: (txnReceipt: any) => {
      notification.success(
        "Mineral Registered!",
        <div className="flex flex-col">
          <span>Transaction Hash: {txnReceipt.transactionHash}</span>
          <span>View on Explorer: 
            <a 
              href={`https://sepolia.etherscan.io/tx/${txnReceipt.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-1"
            >
              Link
            </a>
          </span>
        </div>
      );
    },
  });

  // Listen for registration events
  useScaffoldEventSubscriber({
    contractName: "RolesManager",
    eventName: "MineralRegistered",
    listener: (mineralId, name, mineralType, origin, weight, purityPercentage, miner, timestamp) => {
      console.log("New mineral registered:", mineralId);
      // Reset form on successful registration
      setFormData({
        mineralName: "",
        mineralType: "",
        origin: "",
        weight: 0,
        purityPercentage: 81,
        storageConditions: "",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.mineralName || !formData.mineralType || !formData.origin || formData.weight <= 0) {
      notification.error("Validation Error", "Please fill all required fields");
      return;
    }

    if (formData.purityPercentage < 81) {
      notification.error("Validation Error", "Purity percentage must be at least 81%");
      return;
    }

    try {
      await writeAsync();
    } catch (error) {
      const parsedError = getParsedError(error);
      notification.error("Registration Failed", parsedError);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    handleInputChange("weight", newValue);
  };

  const handlePurityChange = (value: number) => {
    const newValue = Math.max(81, Math.min(100, value));
    handleInputChange("purityPercentage", newValue);
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Register Mineral</h1>

        <p className="text-gray-400 text-center mb-8">
          Please fill in all required fields to register a new mineral in the supply chain
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="border border-[#323539] rounded-lg p-6 flex-1">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mineral Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Mineral Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Gold Ore"
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                    value={formData.mineralName}
                    onChange={(e) => handleInputChange("mineralName", e.target.value)}
                  />
                </div>

                {/* Mineral Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Mineral Type *</label>
                  <input
                    type="text"
                    placeholder="e.g. Gold, Diamond"
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                    value={formData.mineralType}
                    onChange={(e) => handleInputChange("mineralType", e.target.value)}
                  />
                </div>

                {/* Origin */}
                <div>
                  <label className="block text-sm font-medium mb-2">Origin *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Country or Region"
                      className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                      value={formData.origin}
                      onChange={(e) => handleInputChange("origin", e.target.value)}
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium mb-2">Weight (KG) *</label>
                  <div className="bg-[#252525] flex items-center justify-between rounded-md px-4 py-3 w-full border border-[#323539]">
                    <input
                      type="text"
                      value={`${formData.weight} KG`}
                      readOnly
                      className="bg-[#252525] focus:outline-none text-white text-[14px] w-full"
                    />
                    <div className="flex items-center ml-4 pl-4 border-l border-[#323539] gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(formData.weight - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(formData.weight + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Purity Percentage */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2 text-white">Purity Percentage *</label>
                  <div className="flex items-center bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#323539]">
                    <div className="flex-1 px-4 py-3">
                      <input
                        type="range"
                        min="81"
                        max="100"
                        value={formData.purityPercentage}
                        onChange={(e) => handlePurityChange(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none bg-[#e5e5ee] slider-thumb-blue"
                        style={{
                          background: `linear-gradient(to right, #007BFF 0%, #007BFF ${formData.purityPercentage}%, #e5e5ee ${formData.purityPercentage}%, #e5e5ee 100%)`,
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#2B2D2F] min-w-[130px] justify-end">
                      <button
                        type="button"
                        onClick={() => handlePurityChange(formData.purityPercentage - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-[#2f3135] hover:bg-gray-600 rounded-full text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white text-sm w-10 text-center">
                        {formData.purityPercentage}%
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePurityChange(formData.purityPercentage + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-[#2f3135] hover:bg-gray-600 rounded-full text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Storage Conditions */}
                <div className="w-full relative">
                  <label className="block text-sm font-medium mb-2 text-white">Storage Conditions *</label>
                  <div className="flex items-center bg-[#1E1E1E] border border-[#323539] rounded-xl overflow-hidden">
                    <div className="flex-1 px-4 py-3 text-white text-sm bg-[#252525]">
                      {formData.storageConditions || "Select storage conditions"}
                    </div>
                    <div className="relative dropdown-container">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="bg-[#2B2D2F] hover:bg-gray-600 px-4 py-3 flex items-center gap-1 text-white text-sm h-full"
                      >
                        Select
                        <ChevronDown size={18} />
                      </button>
                      {dropdownOpen && (
                        <ul className="absolute right-0 top-full mt-1 bg-[#2B2D2F] border border-[#323539] rounded-md shadow-lg z-10 w-48">
                          {["Cool & Dry Place", "Refrigerated", "Room Temperature", "Frozen"].map(condition => (
                            <li
                              key={condition}
                              onClick={() => {
                                handleInputChange("storageConditions", condition);
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-accentBlue hover:bg-blue-600 text-white font-medium py-3 rounded mt-8 duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasMinerRole || isLoading || isMining}
              >
                {!hasMinerRole ? "Not Authorized (MINER_ROLE required)" :
                 isLoading || isMining ? "Processing..." : "Register Mineral"}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                {hasMinerRole ? 
                  "Your transaction is secure and will be recorded on-chain" :
                  "Connect with a MINER_ROLE account to register minerals"}
              </p>
            </form>
          </div>

          {/* Checkpoints Section */}
          <div className="lg:w-72">
            <div className="rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Validation Checks</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${formData.mineralName ? "bg-green-500" : "bg-gray-500"}`}>
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Valid mineral name</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${formData.mineralType ? "bg-green-500" : "bg-gray-500"}`}>
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Valid mineral type</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${formData.origin ? "bg-green-500" : "bg-gray-500"}`}>
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Valid origin</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${formData.weight > 0 ? "bg-green-500" : "bg-gray-500"}`}>
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Minimum weight (1 KG)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${formData.purityPercentage >= 81 ? "bg-green-500" : "bg-gray-500"}`}>
                    <Check size={12} />
                  </div>
                  <span className="text-sm">Minimum purity (81%)</span>
                </div>
              </div>

              <h3 className="font-medium mb-2">Important Notes:</h3>
              <div className="flex gap-2 text-sm">
                <AlertCircle className="min-w-5 h-5 text-white mt-0.5" />
                <p className="text-gray-400">
                  All information will be permanently recorded on the blockchain. 
                  Double-check all details before submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}