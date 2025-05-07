"use client";

import React, { useState, useCallback } from "react";
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
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying miner access..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
    <div className="max-w-md p-8 text-center border rounded-lg shadow-lg bg-background">
      <h2 className="mb-4 text-2xl font-bold">Connect Your Wallet</h2>
      <p className="mb-6 text-muted-foreground">
        Please connect your wallet to register minerals
      </p>
      <ConnectButton />
    </div>
    {isLoading && <LoadingSpinner size={8} text="Connecting wallet..." />}
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
    notification.success("Wallet address copied!");
  };

  return (
    <div className="max-w-md p-6 border rounded-lg shadow-lg bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <ShieldAlert className="w-12 h-12 text-red-500" />
        <h3 className="text-2xl font-bold">Access Denied</h3>
        <p className="text-muted-foreground">
          The connected wallet doesn't have miner privileges to register minerals.
        </p>
        <div className="flex items-center gap-2 p-2 px-4 mt-2 border rounded-lg">
          <span className="font-mono text-sm">{address}</span>
          <button onClick={copyAddress} className="p-1 rounded-md hover:bg-accent">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="pt-4 space-y-3 text-left">
          <h3 className="font-medium">How to get miner access:</h3>
          <ol className="space-y-4 text-sm text-muted-foreground">
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
        <button
          onClick={onRefresh}
          disabled={isLoadingRefresh}
          className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoadingRefresh && <Loader2 className="w-4 h-4 animate-spin" />}
          Refresh Access
        </button>
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
  const [isTransactionPending, setIsTransactionPending] = useState(false);

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

  const validateForm = useCallback(() => {
    return (
      isConnected &&
      hasMinerRole &&
      mineralName.trim() &&
      mineralType.trim() &&
      origin.trim() &&
      selectedCondition.storage !== "Select Type" &&
      selectedCondition.humidity !== "Select Type" &&
      quantity > 0 &&
      purity > 80 &&
      purity <= 100
    );
  }, [isConnected, hasMinerRole, mineralName, mineralType, origin, selectedCondition, quantity, purity]);

  const { writeContractAsync } = useScaffoldWriteContract("RolesManager");

  const resetForm = () => {
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
  };

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      await refetchRoleCheck();
    } catch (e) {
      console.error("Error refreshing access:", e);
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
    if (!isConnected || !hasMinerRole || !validateForm()) return;

    setIsTransactionPending(true);
    try {
      const tx = await writeContractAsync({
        functionName: "registerMineral",
        args: [
          mineralName,
          mineralType,
          BigInt(quantity),
          origin,
          BigInt(purity),
          storageConditions
        ],
      });
      
      notification.info("Transaction submitted. Waiting for confirmation...");
      console.log("Transaction submitted:", tx);
      
      // You might want to wait for transaction confirmation here
      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
      
      notification.success("Mineral registered successfully!");
      resetForm();
    } catch (err: any) {
      console.error("Transaction error:", err);
      
      if (err.message.includes("User rejected the request")) {
        notification.error("Transaction rejected by user");
      } else if (err.message.includes("RolesManager__MineralPurityPercentageTooLowToRegister")) {
        notification.error("Purity must be greater than 80%");
      } else if (err.message.includes("RolesManager__InvalidMineralWeight")) {
        notification.error("Quantity must be greater than 0");
      } else if (err.message.includes("caller is missing role")) {
        notification.error("No miner privileges");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsTransactionPending(false);
    }
  };

  if (isConnected && isRoleLoading) {
    return <FullPageLoader text="Checking miner permissions..." />;
  }

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (isConnected && !hasMinerRole) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <AccessDeniedView 
          address={address || ""} 
          isLoadingRefresh={isRefreshingAccess}
          onRefresh={handleRefreshAccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Register Mineral</h1>
        <p className="text-muted-foreground text-center mb-8">
          Register new minerals in the system. All fields are required.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="border rounded-lg p-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mineral Name</label>
                <input
                  type="text"
                  value={mineralName}
                  onChange={e => setMineralName(e.target.value)}
                  placeholder="Valid Mineral name"
                  className="w-full bg-background border border-input text-foreground rounded px-4 py-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <input
                  type="text"
                  value={mineralType}
                  onChange={e => setMineralType(e.target.value)}
                  placeholder="Mineral type here"
                  className="w-full bg-background border border-input text-foreground rounded px-4 py-3 focus:outline-none"
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
                    className="w-full bg-background border border-input text-foreground rounded px-4 py-3 focus:outline-none"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantity (KG)</label>
                <div className="bg-background flex items-center justify-between rounded-md px-4 py-3 w-full border border-input">
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => {
                      const value = parseFloat(e.target.value);
                      handleQuantityChange(isNaN(value) ? 0 : value);
                    }}
                    className="bg-background focus:outline-none text-foreground text-[14px] w-full"
                    min="0"
                    step="0.1"
                  />
                  <div className="flex items-center ml-4 pl-4 border-l border-input gap-2">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-accent hover:bg-accent/90 rounded-full"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-accent hover:bg-accent/90 rounded-full"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium mb-2">
                  Purity Percentage {purity <= 80 && (
                    <span className="text-red-500 ml-2">(Must be > 80%)</span>
                  )}
                </label>
                <div className="flex items-center bg-background rounded-xl overflow-hidden border border-input">
                  <div className="flex-1 px-4 py-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={purity}
                      onChange={e => handlePurityChange(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none bg-muted"
                      style={{
                        background: `linear-gradient(to right, #007BFF 0%, #007BFF ${purity}%, #e5e5ee ${purity}%, #e5e5ee 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-accent min-w-[130px] justify-end">
                    <button
                      onClick={() => handlePurityChange(purity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-accent/90 hover:bg-accent rounded-full text-foreground"
                    >
                      <Minus size={14} />
                    </button>
                    <span className={`text-sm w-10 text-center ${
                      purity <= 80 ? 'text-red-500' : 'text-foreground'
                    }`}>
                      {purity}%
                    </span>
                    <button
                      onClick={() => handlePurityChange(purity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-accent/90 hover:bg-accent rounded-full text-foreground"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full relative">
                <label className="block text-sm font-medium mb-2">Storage Conditions</label>
                <div className="flex items-center bg-background border border-input rounded-xl overflow-hidden">
                  <div className="flex-1 px-4 py-3 text-sm">
                    {selectedCondition.storage !== "Select Type"
                      ? `${selectedCondition.storage} | ${selectedCondition.temperature} | ${selectedCondition.humidity}`
                      : "No Conditions specified"}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setPortalOpen(true)}
                      className="bg-accent hover:bg-accent/90 px-4 py-3 flex items-center gap-1 text-foreground text-sm h-full"
                    >
                      Select <ChevronDown size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={isTransactionPending || !validateForm()}
              className={`w-full ${
                validateForm() ? 'bg-primary hover:bg-primary/90' : 'bg-muted cursor-not-allowed'
              } text-primary-foreground font-medium py-3 rounded mt-8 duration-500 flex items-center justify-center`}
            >
              {isTransactionPending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                "Register Mineral"
              )}
            </button>
            <p className="text-muted-foreground text-sm text-center mt-4">
              {validateForm() 
                ? "All required fields are complete. You can register the mineral."
                : "Please fill all required fields to register."}
            </p>
          </div>

          <div className="lg:w-72">
            <div className="rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Check-points</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    mineralName.trim() ? 'bg-green-500' : 'bg-muted'
                  }`}>
                    {mineralName.trim() ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Valid mineral name</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    mineralType.trim() ? 'bg-green-500' : 'bg-muted'
                  }`}>
                    {mineralType.trim() ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Mineral type specified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    origin.trim() ? 'bg-green-500' : 'bg-muted'
                  }`}>
                    {origin.trim() ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Origin provided</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    quantity > 0 ? 'bg-green-500' : 'bg-muted'
                  }`}>
                    {quantity > 0 ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Valid quantity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    purity > 80 && purity <= 100 ? 'bg-green-500' : 'bg-muted'
                  }`}>
                    {purity > 80 && purity <= 100 ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Purity > 80%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${
                    selectedCondition.storage !== "Select Type" && 
                    selectedCondition.humidity !== "Select Type" 
                      ? 'bg-green-500' : 'bg-muted'
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
                <AlertCircle className="min-w-5 h-5 mt-0.5" />
                <p className="text-muted-foreground">
                  Ensure the details entered are accurate. Modifications won't be allowed post registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {portalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-background border rounded-xl p-8 w-[400px] relative">
            <h2 className="text-lg mb-6 font-semibold">Specify Storage Conditions</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Storage Type</label>
                <select
                  value={selectedCondition.storage}
                  onChange={e => setSelectedCondition({...selectedCondition, storage: e.target.value})}
                  className="w-full bg-background border border-input text-foreground rounded px-4 py-3 focus:outline-none"
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
                    className="w-full bg-background border border-input text-foreground rounded px-4 py-3 focus:outline-none"
                  >
                    <option value="In Celsius">In Celsius</option>
                    <option value="Below 0°C">Below 0°C</option>
                    <option value="0°C to 10°C">0°C to 10°C</option>
                    <option value="10°C to 25°C">10°C to 25°C</option>
                    <option value="Above 25°C">Above 25°C</option>
                  </select>
                  <Thermometer className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Humidity</label>
                <div className="relative">
                  <select
                    value={selectedCondition.humidity}
                    onChange={e => setSelectedCondition({...selectedCondition, humidity: e.target.value})}
                    className="w-full bg-background border border-input text-foreground rounded px-4 py-3 focus:outline-none"
                  >
                    <option value="Select Type">Select Type</option>
                    <option value="Low (<30%)">Low (&lt;30%)</option>
                    <option value="Moderate (30-60%)">Moderate (30-60%)</option>
                    <option value="High (>60%)">High (&gt;60%)</option>
                  </select>
                  <Droplet className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setPortalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-accent"
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
                  }
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
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