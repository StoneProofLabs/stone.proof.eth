"use client";

import { useCallback, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, Check, Copy, Loader2, Minus, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin text-emerald-500`} />
    {text && <p className="text-sm text-gray-400">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying auditor access..." }: { text?: string }) => (
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
        <p className="text-gray-400">The connected wallet doesn't have auditor privileges to audit minerals.</p>
        <div className="flex items-center gap-2 p-2 px-4 mt-2 border border-gray-700 rounded-lg bg-gray-900/50 w-full">
          <span className="font-mono text-sm text-gray-300 truncate">{address}</span>
          <button onClick={copyAddress} className="p-1 rounded-md hover:bg-gray-700 text-gray-400">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full mt-4 p-4 rounded-lg border border-gray-700 bg-gray-900/30">
          <h3 className="text-base font-medium text-white mb-4">How to get auditor access:</h3>
          <ol className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
                1
              </span>
              <div>
                <p>Contact system administrator at:</p>
                <div className="mt-1 space-y-2 pl-2">
                  <a
                    href="mailto:admin@stone.proof?subject=Auditor%20Role%20Request"
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
                <p>Request auditor role assignment</p>
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

  // Check if user has auditor role
  const {
    data: hasAuditorRole,
    isLoading: isRoleLoading,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAuditorRole",
    args: [address],
    enabled: isConnected,
  });

  const validateForm = useCallback(() => {
    return isConnected && hasAuditorRole && form.mineralId.trim() && form.report.trim();
  }, [isConnected, hasAuditorRole, form.mineralId, form.report]);

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
    
    if (!isConnected || !hasAuditorRole || !validateForm()) return;

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
        notification.error("No auditor privileges");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsTransactionPending(false);
    }
  };

  if (isConnected && isRoleLoading) {
    return <FullPageLoader text="Checking auditor permissions..." />;
  }

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (isConnected && !hasAuditorRole) {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">Audit Mineral</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Fill out the form below to submit your audit report for a mineral.
        </p>
        
        {/* Status Badges */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="inline-block bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-semibold shadow">
            Raw
          </span>
          <span className="inline-block bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-semibold shadow">
            Refined
          </span>
        </div>
        
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
          
          {/* Audit Report */}
          <div>
            <label htmlFor="report" className="block text-base text-white mb-2">
              Audit Report <span className="text-red-500">*</span>
            </label>
            <textarea
              id="report"
              name="report"
              value={form.report}
              onChange={handleChange}
              placeholder="Enter Audit Report"
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
              "Send Audit Report"
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
              <span className="text-sm text-gray-300">Audit report provided</span>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-center mt-6">Your Transaction is secure and safe</p>
      </div>
    </div>
  );
}
