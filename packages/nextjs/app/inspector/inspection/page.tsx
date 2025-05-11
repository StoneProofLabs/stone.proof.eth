"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, Check, ChevronDown, Copy, Loader2, Minus, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin text-emerald-500`} />
    {text && <p className="text-sm text-gray-400">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying inspector access..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-900">
    <div className="max-w-md w-full p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Your Wallet</h2>
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to audit minerals</p>
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
        <p className="text-gray-400">The connected wallet doesn't have inspector privileges to audit minerals.</p>
        <div className="flex items-center gap-2 p-2 px-4 mt-2 border border-gray-700 rounded-lg bg-gray-900/50 w-full">
          <span className="font-mono text-sm text-gray-300 truncate">{address}</span>
          <button onClick={copyAddress} className="p-1 rounded-md hover:bg-gray-700 text-gray-400">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full mt-4 p-4 rounded-lg border border-gray-700 bg-gray-900/30">
          <h3 className="text-base font-medium text-white mb-4">How to get inspector access:</h3>
          <ol className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
                1
              </span>
              <div>
                <p>Contact system administrator at:</p>
                <div className="mt-1 space-y-2 pl-2">
                  <a
                    href="mailto:admin@stone.proof?subject=inspector%20Role%20Request"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                  >
                    admin@stone.proof
                  </a>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
                2
              </span>
              <div>
                <p>Request inspector role assignment</p>
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

export default function AuditMinerals() {
  const { address, isConnected, isConnecting } = useAccount();
  const [form, setForm] = useState({ mineralId: "", report: "" });
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [inputMethod, setInputMethod] = useState<"select" | "manual">("select");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    data: hasInspectorRole,
    isLoading: isRoleLoading,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasInspectorRole",
    args: [address],
    enabled: isConnected,
  });

  const validateForm = useCallback(() => {
    return isConnected && hasInspectorRole && form.mineralId.trim() && form.report.trim();
  }, [isConnected, hasInspectorRole, form.mineralId, form.report]);

  const { writeContractAsync } = useScaffoldWriteContract("RolesManager");

  const resetForm = () => {
    setForm({ mineralId: "", report: "" });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectMineral = (mineralId: string) => {
    setForm(prev => ({ ...prev, mineralId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !hasInspectorRole || !validateForm()) return;

    setIsTransactionPending(true);
    try {
      const tx = await writeContractAsync({
        functionName: "_auditMineral",
        args: [form.mineralId.trim(), form.report.trim()],
      });

      notification.info("Transaction submitted. Waiting for confirmation...");
      console.log("Transaction submitted:", tx);

      notification.success("Mineral audited successfully!");
      resetForm();
    } catch (err: any) {
      console.error("Transaction error:", err);

      if (err.message.includes("User rejected the request")) {
        notification.error("Transaction rejected by user");
      } else if (err.message.includes("RolesManager__InvalidMineralIdOrNotFound")) {
        notification.error("Invalid mineral ID or mineral not found");
      } else if (err.message.includes("RolesManager__MineralAlreadyAudited")) {
        notification.error("This mineral has already been audited");
      } else if (err.message.includes("caller is missing role")) {
        notification.error("No inspector privileges");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsTransactionPending(false);
    }
  };

  // Mock data - replace with real data from your contract
  const pendingMinerals = [
    {
      id: "GOLD-0x8e07d295",
      name: "Gold",
      date: "15/05/2025",
      purity: 92,
      quantity: "150 KG",
      price: "$45,000",
      image: "/dashboard/gold.jpeg",
    },
    {
      id: "COBALT-0xa3f5e1d2",
      name: "Cobalt",
      date: "15/05/2025",
      purity: 88,
      quantity: "200 KG",
      price: "$6,000",
      image: "/dashboard/cobalt.png",
    },
  ];

  if (isConnected && isRoleLoading) {
    return <FullPageLoader text="Checking inspector permissions..." />;
  }

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (isConnected && !hasInspectorRole) {
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
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
         Inspect Minerals
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-3">
            Submit inspection reports for minerals in the supply chain. Provide detailed information about your findings.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Minerals List */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Minerals to Audit</h2>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-sm transition-colors"
                  >
                    {inputMethod === "select" ? "Select Mineral" : "Enter ID Manually"}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10 border border-gray-600">
                      <button
                        onClick={() => {
                          setInputMethod("select");
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          inputMethod === "select" ? "bg-emerald-600 text-white" : "text-gray-200 hover:bg-gray-600"
                        }`}
                      >
                        Select Mineral
                      </button>
                      <button
                        onClick={() => {
                          setInputMethod("manual");
                          setIsDropdownOpen(false);
                          setForm(prev => ({ ...prev, mineralId: "" }));
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          inputMethod === "manual" ? "bg-emerald-600 text-white" : "text-gray-200 hover:bg-gray-600"
                        }`}
                      >
                        Enter ID Manually
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {inputMethod === "select" ? (
                <div className="space-y-4">
                  {pendingMinerals.map(mineral => (
                    <div
                      key={mineral.id}
                      onClick={() => handleSelectMineral(mineral.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        form.mineralId === mineral.id
                          ? "border-emerald-500 bg-emerald-900/20"
                          : "border-gray-700 hover:border-gray-600 bg-gray-700/50 hover:bg-gray-700/70"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image width={48} height={48} alt={mineral.name} src={mineral.image} className="rounded-md" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">{mineral.name}</h3>
                            <span className="text-xs text-gray-400">{mineral.date}</span>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs mb-1 flex justify-between">
                              <span>Purity: {mineral.purity}%</span>
                              <span className="text-emerald-400">
                                {form.mineralId === mineral.id ? "Selected" : ""}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  mineral.purity > 90
                                    ? "bg-green-500"
                                    : mineral.purity > 85
                                      ? "bg-blue-500"
                                      : "bg-yellow-500"
                                }`}
                                style={{ width: `${mineral.purity}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="bg-gray-800/50 rounded p-2">
                              <div className="text-xs text-gray-400">Quantity</div>
                              <div className="font-medium">{mineral.quantity}</div>
                            </div>
                            <div className="bg-gray-800/50 rounded p-2">
                              <div className="text-xs text-gray-400">Value</div>
                              <div className="font-medium">{mineral.price}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-400 break-all">ID: {mineral.id}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-700">
                    <label className="block text-sm font-medium mb-2">Enter Mineral ID</label>
                    <input
                      name="mineralId"
                      value={form.mineralId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      placeholder="e.g. GOLD-0x8e07d295"
                    />
                  </div>
                  <div className="bg-emerald-900/10 border border-emerald-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 mt-0.5 text-emerald-400 flex-shrink-0" />
                      <div className="text-sm text-emerald-200">
                        <p className="font-medium">Need help finding the Mineral ID?</p>
                        <p className="mt-1 opacity-80">
                          Check the mineral's details page or transaction history for its unique identifier. Mineral IDs
                          are typically in format "TYPE-0x...".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Audit Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Audit Report</h2>

              {inputMethod === "select" && form.mineralId && (
                <div className="mb-5 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Selected Mineral ID:</span>
                    <span className="font-mono break-all">{form.mineralId}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(form.mineralId);
                        notification.success("Mineral ID copied to clipboard");
                      }}
                      className="ml-auto text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Audit Report</label>
                  <textarea
                    name="report"
                    value={form.report}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all min-h-32"
                    placeholder="Enter your detailed audit findings..."
                  />
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isTransactionPending}
                  className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!validateForm() || isTransactionPending}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                >
                  {isTransactionPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Submit Audit"
                  )}
                </button>
              </div>
            </form>

            {/* Validation Summary */}
            <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">
                Submission Requirements
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      form.mineralId.trim() ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {form.mineralId.trim() ? <Check className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {inputMethod === "select" ? "Mineral selected" : "Valid Mineral ID"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {inputMethod === "select"
                        ? "Choose from list or enter manually"
                        : "Must be a valid mineral identifier"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      form.report.trim() ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {form.report.trim() ? <Check className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Audit report provided</p>
                    <p className="text-xs text-gray-400 mt-0.5">Detailed findings about the mineral</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
