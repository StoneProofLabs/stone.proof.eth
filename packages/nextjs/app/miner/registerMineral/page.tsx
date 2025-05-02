"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Droplet,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  ShieldAlert,
  Thermometer
} from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { toast } from "../../lib/toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="text-white min-h-screen flex items-center justify-center">
    <div className="text-center max-w-md p-6 bg-gray-800 rounded-xl border border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">
        {isLoading ? "Connecting..." : "Wallet Not Connected"}
      </h2>
      <p className="text-gray-400 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect your wallet to register minerals"}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

const AccessDeniedView = ({ 
  address, 
  isLoadingRefresh, 
  onRefresh 
}: { 
  address: string; 
  isLoadingRefresh: boolean;
  onRefresh: () => void;
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Wallet address copied!");
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900 rounded-full mx-auto">
            <ShieldAlert className="w-8 h-8 text-red-300" />
          </div>

          <h2 className="text-2xl font-bold">Miner Privileges Required</h2>
          <p className="text-gray-400">
            Your wallet doesn't have miner access to register minerals.
          </p>

          {/* Wallet Address */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Connected Wallet:</span>
              <button 
                onClick={copyAddress}
                className="text-blue-400 hover:text-blue-300"
                title="Copy address"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <p className="font-mono text-sm break-all text-left">{address}</p>
          </div>

          {/* Steps to Get Access */}
          <div className="pt-4 space-y-3 text-left">
            <h3 className="font-medium">How to get miner access:</h3>
            <ol className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                  1
                </span>
                <div>
                  <p>Contact system administrator at:</p>
                  <div className="mt-1 space-y-2 pl-2">
                    <a href="mailto:admin@stone.proof?subject=Miner%20Role%20Request" 
                       className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                      <Mail className="w-4 h-4" />
                      admin@stone.proof
                    </a>
                    <a href="tel:+250795107436" 
                       className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                      <Phone className="w-4 h-4" />
                      +(250) 795 107 436
                    </a>
                  </div>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                  2
                </span>
                <div>
                  <p>Request miner role assignment through:</p>
                  <div className="mt-1 pl-2">
                    <a href="https://t.me/StoneProofSupport" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300">
                      <MessageSquare className="w-4 h-4" />
                      @StoneProofSupport
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                  3
                </span>
                <div>
                  <p>Refresh this page after approval</p>
                  <p className="text-xs text-gray-500 mt-1">
                    If access isn't granted immediately, wait a few minutes then refresh
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Refresh Button */}
          <div className="pt-4">
            <button
              onClick={onRefresh}
              disabled={isLoadingRefresh}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoadingRefresh ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Check Access Again
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MineralRegistrationPage() {
  const { address, isConnected, isConnecting } = useAccount();
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
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

  // Check if user has miner role
  const { 
    data: hasMinerRole, 
    isLoading: isRoleLoading, 
    refetch: refetchRoleCheck 
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasMinerRole",
    args: [address],
    enabled: isConnected,
  });

  const storageConditions = `${selectedCondition.storage} | ${selectedCondition.temperature} | ${selectedCondition.humidity}`;

  const allFieldsReady =
    isConnected &&
    hasMinerRole &&
    mineralName &&
    mineralType &&
    origin &&
    selectedCondition.storage !== "Select Type" &&
    selectedCondition.humidity !== "Select Type" &&
    quantity > 0 &&
    purity > 80;

  const { writeAsync, isLoading: isRegistering } = useScaffoldContract({
    contractName: "RolesManager",
    functionName: "registerMineral",
    args: [
      mineralName,
      mineralType,
      quantity,
      origin,
      purity,
      storageConditions
    ],
    enabled: allFieldsReady,
    onSuccess: (mineralId: string) => {
      toast.success(`Mineral registered successfully! Mineral ID: ${mineralId}`);
      // Reset form after successful registration
      setMineralName("");
      setMineralType("");
      setOrigin("");
      setQuantity(0);
      setPurity(0);
      setSelectedCondition({
        temperature: "In Celsius",
        storage: "Select Type",
        humidity: "Select Type",
      });
    },
    onError: (error: { message: string | string[]; }) => {
      console.error("Registration failed:", error);
      let errorMessage = "Failed to register mineral.";
      
      if (error.message.includes("RolesManager__MineralPurityPercentageTooLowToRegister")) {
        errorMessage = "Purity percentage must be greater than 80%";
      } else if (error.message.includes("RolesManager__InvalidMineralWeight")) {
        errorMessage = "Mineral weight must be greater than 0";
      } else if (error.message.includes("caller is missing role")) {
        errorMessage = "Your account doesn't have miner privileges";
      }
      
      toast.error(errorMessage);
    },
  });

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      const { data } = await refetchRoleCheck();
      if (!data) {
        toast.error("Still no miner access. Contact administrator.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      toast.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(0, value));
  };

  const handlePurityChange = (value: number) => {
    setPurity(Math.max(0, Math.min(100, value)));
  };

  const handleRegister = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }

    if (!hasMinerRole) {
      toast.error("Your account doesn't have miner privileges.");
      return;
    }

    if (!allFieldsReady) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      if (writeAsync) {
        const tx = await writeAsync();
        console.log("Transaction submitted:", tx.hash);
        toast.info("Transaction submitted. Waiting for confirmation...");
      }
    } catch (err: any) {
      console.error("Error calling write function:", err);
      let errorMessage = "An unexpected error occurred.";
      
      if (err.message.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected";
      }
      
      toast.error(errorMessage);
    }
  };

  // Loading state while checking roles
  if (isConnected && isRoleLoading) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <LoadingSpinner size={12} text="Checking access permissions..." />
      </div>
    );
  }

  // Not connected state
  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  // No miner role state
  if (isConnected && !hasMinerRole) {
    return (
      <AccessDeniedView 
        address={address || ""} 
        isLoadingRefresh={isRefreshingAccess}
        onRefresh={handleRefreshAccess}
      />
    );
  }

  // Main form for users with miner role
  return (
    <div className="text-white min-h-screen flex flex-col items-center p-6">
      {/* Form Header */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Register Mineral</h1>
        <p className="text-gray-400 text-center mb-8">
          Register new minerals in the system. All fields are required.
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
                <label className="block text-sm font-medium mb-2">Quantity (KG)</label>
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
                <label className="block text-sm font-medium mb-2 text-white">
                  Purity Percentage {purity <= 80 && (
                    <span className="text-red-500 ml-2">(Must be > 80%)</span>
                  )}
                </label>
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
                    <span className={`text-sm w-10 text-center ${
                      purity <= 80 ? 'text-red-500' : 'text-white'
                    }`}>
                      {purity}%
                    </span>
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
                      ? `${selectedCondition.storage} | ${selectedCondition.temperature} | ${selectedCondition.humidity}`
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
              disabled={!allFieldsReady || isRegistering}
              className={`w-full ${
                allFieldsReady ? 'bg-accentBlue hover:bg-blue-600' : 'bg-gray-600 cursor-not-allowed'
              } text-white font-medium py-3 rounded mt-8 duration-500 flex items-center justify-center`}
            >
              {isRegistering ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                "Register Mineral"
              )}
            </button>
            <p className="text-gray-400 text-sm text-center mt-4">
              {allFieldsReady 
                ? "All required fields are complete. You can register the mineral."
                : "Please fill all required fields to register."}
            </p>
          </div>

          {/* Right Info Panel */}
          <div className="lg:w-72">
            <div className="rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Check-points</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    mineralName ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {mineralName ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Valid mineral name</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    mineralType ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {mineralType ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Mineral type specified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    origin ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {origin ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Origin provided</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    quantity > 0 ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {quantity > 0 ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Valid quantity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    purity > 80 ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {purity > 80 ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Purity > 80%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    selectedCondition.storage !== "Select Type" && 
                    selectedCondition.humidity !== "Select Type" 
                      ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {selectedCondition.storage !== "Select Type" && 
                     selectedCondition.humidity !== "Select Type" 
                      ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Storage conditions set</span>
                </div>
              </div>
              <h3 className="font-medium mb-2">Tips:</h3>
              <div className="flex gap-2 text-sm">
                <AlertCircle className="min-w-5 h-5 text-white mt-0.5" />
                <p className="text-gray-400">
                  Ensure the details entered are accurate. Modifications won't be allowed post registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Conditions Modal */}
      {portalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#0D0D0D] border border-gray-700 rounded-xl p-8 w-[400px] relative">
            <h2 className="text-white text-lg mb-6 font-semibold">Specify Storage Conditions</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Storage Type</label>
                <select
                  value={selectedCondition.storage}
                  onChange={e => setSelectedCondition({...selectedCondition, storage: e.target.value})}
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                >
                  <option value="Select Type">Select Type</option>
                  <option value="Dry Storage">Dry Storage</option>
                  <option value="Climate Controlled">Climate Controlled</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Airtight Container">Airtight Container</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Temperature</label>
                <div className="relative">
                  <select
                    value={selectedCondition.temperature}
                    onChange={e => setSelectedCondition({...selectedCondition, temperature: e.target.value})}
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  >
                    <option value="In Celsius">In Celsius</option>
                    <option value="Below 0°C">Below 0°C</option>
                    <option value="0°C to 10°C">0°C to 10°C</option>
                    <option value="10°C to 25°C">10°C to 25°C</option>
                    <option value="Above 25°C">Above 25°C</option>
                  </select>
                  <Thermometer className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Humidity</label>
                <div className="relative">
                  <select
                    value={selectedCondition.humidity}
                    onChange={e => setSelectedCondition({...selectedCondition, humidity: e.target.value})}
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  >
                    <option value="Select Type">Select Type</option>
                    <option value="Low (<30%)">Low (&lt;30%)</option>
                    <option value="Moderate (30-60%)">Moderate (30-60%)</option>
                    <option value="High (>60%)">High (&gt;60%)</option>
                  </select>
                  <Droplet className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setPortalOpen(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (
                    selectedCondition.storage !== "Select Type" && 
                    selectedCondition.humidity !== "Select Type"
                  ) {
                    setPortalOpen(false);
                  } else {
                    toast.error("Please select both Storage Type and Humidity");
                  }
                }}
                className="px-4 py-2 bg-accentBlue rounded-lg text-white hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}