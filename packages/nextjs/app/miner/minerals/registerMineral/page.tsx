"use client";

import { useCallback, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  AlertCircle,
  Check,
  ChevronDown,
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
  Thermometer,
  X,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin text-emerald-500`} />
    {text && <p className="text-sm text-gray-400">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying miner access..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-900">
    <div className="max-w-md w-full p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Your Wallet</h2>
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to register minerals</p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
    {isLoading && <LoadingSpinner size={8} text="Connecting wallet..." />}
  </div>
);

const AccessDeniedView = ({
  address,
  isLoadingRefresh,
  onRefresh,
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
    <div className="max-w-md w-full p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-16 w-16 rounded-full bg-red-900/30 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-white">Access Denied</h3>
        <p className="text-gray-400">The connected wallet doesn't have miner privileges to register minerals.</p>
        <div className="flex items-center gap-2 p-2 px-4 mt-2 border border-gray-700 rounded-lg bg-gray-900/50 w-full">
          <span className="font-mono text-sm text-gray-300 truncate">{address}</span>
          <button onClick={copyAddress} className="p-1 rounded-md hover:bg-gray-700 text-gray-400">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full mt-4 p-4 rounded-lg border border-gray-700 bg-gray-900/30">
          <h3 className="text-base font-medium text-white mb-4">How to get miner access:</h3>
          <ol className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
                1
              </span>
              <div>
                <p>Contact system administrator at:</p>
                <div className="mt-1 space-y-2 pl-2">
                  <a
                    href="mailto:admin@stone.proof?subject=Miner%20Role%20Request"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                  >
                    <Mail className="w-4 h-4" />
                    admin@stone.proof
                  </a>
                  <a
                    href="tel:+250795107436"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                  >
                    <Phone className="w-4 h-4" />
                    +(250) 795 107 436
                  </a>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
                2
              </span>
              <div>
                <p>Request miner role assignment through:</p>
                <div className="mt-1 pl-2">
                  <a
                    href="https://t.me/StoneProofSupport"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageSquare className="w-4 h-4" />
                    @StoneProofSupport
                  </a>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
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
          className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-colors ${
            isLoadingRefresh
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {isLoadingRefresh ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
              Refreshing...
            </>
          ) : (
            "Refresh Access"
          )}
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
  const [generatedMineralId, setGeneratedMineralId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  // Check if user has miner role
  const {
    data: hasMinerRole,
    isLoading: isRoleLoading,
    refetch: refetchRoleCheck,
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    notification.success("Mineral ID copied to clipboard!");
  };

  const handleRegister = async () => {
    if (!isConnected || !hasMinerRole || !validateForm()) return;

    setIsTransactionPending(true);
    try {
      const mineralId = await writeContractAsync({
        functionName: "registerMineral",
        args: [mineralName, mineralType, BigInt(quantity), origin, BigInt(purity), storageConditions],
      });

      // The mineralId will be in the format "MineralType-0x1234abcd"
      setGeneratedMineralId(mineralId as string);
      setShowSuccessModal(true);
      resetForm();
      
      notification.success("Mineral registered successfully!");
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
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
        <AccessDeniedView
          address={address || ""}
          isLoadingRefresh={isRefreshingAccess}
          onRefresh={handleRefreshAccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 text-white">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Register Mineral</h1>
          <p className="text-gray-400">Register new minerals in the system. All fields are required.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 p-6 rounded-xl border border-gray-700 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="mineral-name" className="block text-sm font-medium text-gray-300">
                  Mineral Name
                </label>
                <input
                  id="mineral-name"
                  type="text"
                  value={mineralName}
                  onChange={e => setMineralName(e.target.value)}
                  placeholder="e.g. Gold, Coltan, Diamond"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="mineral-type" className="block text-sm font-medium text-gray-300">
                  Mineral Type
                </label>
                <input
                  id="mineral-type"
                  type="text"
                  value={mineralType}
                  onChange={e => setMineralType(e.target.value)}
                  placeholder="e.g. 3T, Gold-24K, Diamond-1A"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-300">
                  Origin
                </label>
                <div className="relative">
                  <input
                    id="origin"
                    type="text"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    placeholder="Mine location or country"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">
                  Quantity (KG)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={e => {
                      const value = Number.parseFloat(e.target.value);
                      handleQuantityChange(isNaN(value) ? 0 : value);
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.1"
                  />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="h-10 w-10 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-600 flex items-center justify-center text-white"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="h-10 w-10 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-600 flex items-center justify-center text-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 col-span-full">
                <div className="flex items-center justify-between">
                  <label htmlFor="purity" className="block text-sm font-medium text-gray-300">
                    Purity Percentage
                    {purity <= 80 && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-900/50 text-red-300">
                        Must be &gt; 80%
                      </span>
                    )}
                  </label>
                  <span className={`text-sm font-medium ${purity <= 80 ? "text-red-400" : "text-blue-400"}`}>
                    {purity}%
                  </span>
                </div>
                <div className="pt-2">
                  <input
                    id="purity"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={purity}
                    onChange={e => handlePurityChange(Number.parseInt(e.target.value))}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${purity <= 80 ? "slider-red" : "slider-blue"}`}
                    style={{
                      background: `linear-gradient(to right, ${
                        purity <= 80 ? "#ef4444" : "#3b82f6"
                      } 0%, ${purity <= 80 ? "#ef4444" : "#3b82f6"} ${purity}%, #374151 ${purity}%, #374151 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center pt-1">
                  <button
                    onClick={() => handlePurityChange(purity - 1)}
                    className="h-8 w-8 p-0 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white"
                  >
                    <Minus size={12} />
                  </button>
                  <button
                    onClick={() => handlePurityChange(purity + 1)}
                    className="h-8 w-8 p-0 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 col-span-full">
                <label htmlFor="storage-conditions" className="block text-sm font-medium text-gray-300">
                  Storage Conditions
                </label>
                <button
                  onClick={() => setPortalOpen(true)}
                  className="w-full flex justify-between items-center py-3 px-4 rounded-lg bg-gray-700 border border-gray-600 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <span className="text-sm">
                    {selectedCondition.storage !== "Select Type"
                      ? `${selectedCondition.storage} | ${selectedCondition.temperature} | ${selectedCondition.humidity}`
                      : "No Conditions specified"}
                  </span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            <div className="my-8 border-t border-gray-700"></div>

            <button
              onClick={handleRegister}
              disabled={isTransactionPending || !validateForm()}
              className={`w-full h-12 rounded-lg font-medium text-white ${
                validateForm() && !isTransactionPending
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-white/5 cursor-not-allowed"
              } transition-colors duration-200`}
            >
              {isTransactionPending ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Processing...
                </div>
              ) : (
                "Register Mineral"
              )}
            </button>

            <p className="text-gray-400 text-sm text-center mt-4">
              {validateForm()
                ? "All required fields are complete. You can register the mineral."
                : "Please fill all required fields to register."}
            </p>
          </div>

          <div className="lg:w-80">
            <div className="p-6 rounded-xl border border-gray-700 shadow-lg h-full">
              <h2 className="text-lg font-medium mb-6 text-white">Validation Status</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      mineralName.trim() ? "bg-green-900/50 text-green-400" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {mineralName.trim() ? <Check size={14} /> : <Minus size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Valid mineral name</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      mineralType.trim() ? "bg-green-900/50 text-green-400" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {mineralType.trim() ? <Check size={14} /> : <Minus size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Mineral type specified</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      origin.trim() ? "bg-green-900/50 text-green-400" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {origin.trim() ? <Check size={14} /> : <Minus size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Origin provided</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      quantity > 0 ? "bg-green-900/50 text-green-400" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {quantity > 0 ? <Check size={14} /> : <Minus size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Valid quantity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      purity > 80 && purity <= 100 ? "bg-green-900/50 text-green-400" : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {purity > 80 && purity <= 100 ? <Check size={14} /> : <Minus size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Purity &gt; 80%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      selectedCondition.storage !== "Select Type" && selectedCondition.humidity !== "Select Type"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {selectedCondition.storage !== "Select Type" && selectedCondition.humidity !== "Select Type" ? (
                      <Check size={14} />
                    ) : (
                      <Minus size={14} />
                    )}
                  </div>
                  <span className="text-sm text-gray-300">Storage conditions set</span>
                </div>
              </div>

              <div className="my-6 border-t border-gray-700"></div>

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-white">Important Notes:</h3>
                <div className="flex gap-3 text-sm bg-gray-700/50 p-4 rounded-lg">
                  <AlertCircle className="min-w-5 h-5 mt-0.5 text-amber-400" />
                  <p className="text-gray-300">
                    Ensure the details entered are accurate. Modifications won't be allowed post registration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {portalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-[450px] p-6 rounded-2xl bg-gray-900/95 border border-gray-800 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Specify Storage Conditions</h2>
              <p className="text-gray-400 text-sm mt-1">Set the required storage parameters for this mineral</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="storage-type" className="block text-sm font-medium text-gray-300">
                  Storage Type
                </label>
                <select
                  id="storage-type"
                  value={selectedCondition.storage}
                  onChange={e => setSelectedCondition({ ...selectedCondition, storage: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="Select Type">Select Type</option>
                  <option value="Dry Storage">Dry Storage</option>
                  <option value="Climate Controlled">Climate Controlled</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Airtight Container">Airtight Container</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="temperature" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  Temperature <Thermometer className="h-4 w-4 text-gray-400" />
                </label>
                <select
                  id="temperature"
                  value={selectedCondition.temperature}
                  onChange={e => setSelectedCondition({ ...selectedCondition, temperature: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="In Celsius">In Celsius</option>
                  <option value="Below 0°C">Below 0°C</option>
                  <option value="0°C to 10°C">0°C to 10°C</option>
                  <option value="10°C to 25°C">10°C to 25°C</option>
                  <option value="Above 25°C">Above 25°C</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="humidity" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  Humidity <Droplet className="h-4 w-4 text-gray-400" />
                </label>
                <select
                  id="humidity"
                  value={selectedCondition.humidity}
                  onChange={e => setSelectedCondition({ ...selectedCondition, humidity: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="Select Type">Select Type</option>
                  <option value="Low (<30%)">Low (&lt;30%)</option>
                  <option value="Moderate (30-60%)">Moderate (30-60%)</option>
                  <option value="High (>60%)">High (&gt;60%)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between gap-3 mt-6">
              <button
                onClick={() => setPortalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedCondition.storage !== "Select Type" && selectedCondition.humidity !== "Select Type") {
                    setPortalOpen(false);
                  }
                }}
                disabled={selectedCondition.storage === "Select Type" || selectedCondition.humidity === "Select Type"}
                className={`px-4 py-2 rounded-lg text-white ${
                  selectedCondition.storage !== "Select Type" && selectedCondition.humidity !== "Select Type"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Mineral Registered Successfully!</h2>
                <p className="text-gray-400 mt-1">Your mineral has been registered on the blockchain.</p>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="p-1 rounded-full hover:bg-gray-800 text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Mineral ID</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <span className="font-mono text-sm text-emerald-400 break-all">{generatedMineralId}</span>
                  <button
                    onClick={() => copyToClipboard(generatedMineralId)}
                    className="ml-2 p-1 rounded-md hover:bg-gray-700 text-gray-400"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Format: <span className="text-gray-400">{mineralType}-0x...</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-3 text-sm text-gray-400 mb-4">
                <p>This ID is unique to your mineral. You'll need it for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Future transactions and tracking</li>
                  <li>Verification in the supply chain</li>
                  <li>Auditing and inspection processes</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setGeneratedMineralId("");
                }}
                className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
