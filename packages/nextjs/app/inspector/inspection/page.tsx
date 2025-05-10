"use client";

import { useCallback, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, Check, ChevronDown, Copy, Loader2, Minus, Plus, ShieldAlert } from "lucide-react";
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
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to inspect minerals</p>
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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl p-4 sm:p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center flex flex-col items-center gap-5">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-700 rounded-full mx-auto">
              <ShieldAlert className="w-8 h-8 text-red-300" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-400 mt-3">Inspector Privileges Required</h2>
            <p className="text-sm sm:text-base text-gray-300 mt-2">
              Your wallet doesn&apos;t have inspector access permissions to view this dashboard.
            </p>
          </div>

          {/* Main content - switches from row to column on small screens */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 w-[100%] ">
            {/* Left section - miner privileges */}
            <div className="w-full lg:w-[50%] h-[100%] flex flex-col justify-between">
              <div className="bg-gray-700 p-3 sm:p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-400">Connected Wallet:</span>
                  <button onClick={copyAddress} className="text-blue-400 hover:text-blue-300" title="Copy address">
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <p className="font-mono text-xs sm:text-sm break-all text-left text-gray-200">{address}</p>
              </div>

              <div className="pt-4 space-y-3">
                <h3 className="font-medium text-white">How to get inspector access:</h3>
                <ol className="space-y-2 text-xs sm:text-sm text-gray-300 text-left">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      1
                    </span>
                    Contact system administrator
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      2
                    </span>
                    Request inspector role assignment
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      3
                    </span>
                    Refresh this page after approval
                  </li>
                </ol>
              </div>
            </div>

            {/* Right section - contact administrators */}
            <div className="w-full lg:w-[40%] mt-4 lg:mt-0 lg:pt-0">
              <h3 className="font-medium text-white mb-3 sm:mb-4">Contact Administrators</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  {
                    name: "Admin Email",
                    value: "admin@stone.proof",
                    icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "mailto:admin@stone.proof?subject=Miner%20Access%20Request",
                  },
                  {
                    name: "Support Phone",
                    value: "+1 (555) 123-4567",
                    icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "tel:+15551234567",
                  },
                  {
                    name: "Telegram Support",
                    value: "@StoneProofSupport",
                    icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "https://t.me/StoneProofSupport",
                  },
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-xs"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full text-blue-300">
                        {contact.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="font-medium text-white truncate leading-tight text-xs sm:text-sm">{contact.name}</p>
                      <p className="text-xs text-gray-400 truncate leading-tight">{contact.value}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Refresh button */}
          <div className="w-full pt-2 sm:pt-4">
            <button
              onClick={onRefresh}
              disabled={isLoadingRefresh}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
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

export default function InspectMinerals() {
  const { address, isConnected, isConnecting } = useAccount();
  const [form, setForm] = useState({ mineralId: "", report: "" });
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  // Check if user has inspector role
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !hasInspectorRole || !validateForm()) return;

    setIsTransactionPending(true);
    try {
      const tx = await writeContractAsync({
        functionName: "inspectMineral",
        args: [form.mineralId.trim(), form.report.trim()],
      });

      notification.info("Transaction submitted. Waiting for confirmation...");
      console.log("Transaction submitted:", tx);

      notification.success("Mineral inspection submitted successfully!");
      resetForm();
    } catch (error: any) {
      console.error("Transaction error:", error);

      if (error.message.includes("User rejected the request")) {
        notification.error("Transaction rejected by user");
      } else if (error.message.includes("RolesManager__InvalidMineralIdOrNotFound")) {
        notification.error("Invalid mineral ID or mineral not found");
      } else if (error.message.includes("RolesManager__MineralAlreadyInspected")) {
        notification.error("This mineral has already been inspected");
      } else if (error.message.includes("caller is missing role")) {
        notification.error("No inspector privileges");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsTransactionPending(false);
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-[#18181b] p-4">
      <div className="w-full max-w-lg bg-[#232326] rounded-2xl shadow-lg p-6 sm:p-10 border border-[#232326]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">Inspect Mineral</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Fill out the form below to submit your inspection report for a mineral.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mineral ID */}
          <div>
            <label htmlFor="mineralId" className="block text-base text-white mb-2">
              Mineral ID <span className="text-red-500">*</span>
            </label>
            <input
              id="mineralId"
              name="mineralId"
              type="text"
              value={form.mineralId}
              onChange={handleChange}
              placeholder="Enter Mineral ID"
              className={`w-full bg-[#252525] border ${
                !form.mineralId.trim() && isTransactionPending ? "border-red-500" : "border-[#323539]"
              } text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A77FF] transition min-h-[48px]`}
              autoComplete="off"
            />
          </div>

          {/* Inspection Report */}
          <div>
            <label htmlFor="report" className="block text-base text-white mb-2">
              Inspection Report <span className="text-red-500">*</span>
            </label>
            <textarea
              id="report"
              name="report"
              value={form.report}
              onChange={handleChange}
              placeholder="Enter Inspection Report"
              className={`w-full bg-[#252525] border ${
                !form.report.trim() && isTransactionPending ? "border-red-500" : "border-[#323539]"
              } text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A77FF] transition min-h-[100px] resize-none`}
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isTransactionPending || !validateForm()}
            className={`w-full ${
              validateForm() && !isTransactionPending
                ? "bg-[#0A77FF] hover:bg-blue-700"
                : "bg-white/5 cursor-not-allowed"
            } text-white font-medium py-3 rounded-xl transition-colors`}
          >
            {isTransactionPending ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Processing...
              </div>
            ) : (
              "Submit Inspection Report"
            )}
          </button>
        </form>

        <div className="mt-6 p-4 rounded-lg border border-gray-700 bg-gray-900/30">
          <h3 className="text-sm font-medium text-white mb-3">Validation Status</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  form.mineralId.trim() ? "bg-green-900/50 text-green-400" : "bg-white/5 text-gray-500"
                }`}
              >
                {form.mineralId.trim() ? <Check size={14} /> : <Minus size={14} />}
              </div>
              <span className="text-sm text-gray-300">Valid mineral ID</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  form.report.trim() ? "bg-green-900/50 text-green-400" : "bg-white/5 text-gray-500"
                }`}
              >
                {form.report.trim() ? <Check size={14} /> : <Minus size={14} />}
              </div>
              <span className="text-sm text-gray-300">Inspection report provided</span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-center mt-6">Your Transaction is secure and safe</p>
      </div>
    </div>
  );
}
