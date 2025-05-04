"use client";

import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Link,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

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
      <h2 className="text-2xl font-bold mb-4">{isLoading ? "Connecting..." : "Wallet Not Connected"}</h2>
      <p className="text-gray-400 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect your wallet to raise disputes"}
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
  onRefresh,
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
          <p className="text-gray-400">Your wallet doesn&apos;t have miner access to raise disputes.</p>

          {/* Wallet Address */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Connected Wallet:</span>
              <button onClick={copyAddress} className="text-blue-400 hover:text-blue-300" title="Copy address">
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
                    <a
                      href="mailto:admin@stone.proof?subject=Miner%20Role%20Request"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <Mail className="w-4 h-4" />
                      admin@stone.proof
                    </a>
                    <a href="tel:+250795107436" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
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
                    <a
                      href="https://t.me/StoneProofSupport"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
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

export default function RaiseDisputePage() {
  const { address, isConnected, isConnecting } = useAccount();
  const [disputeTitle, setDisputeTitle] = useState("");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [mineralId, setMineralId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

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

  const allFieldsReady = isConnected && hasMinerRole && disputeTitle && disputeDescription && mineralId;

  const { writeAsync, isLoading: isRaisingDispute } = useScaffoldContract({
    contractName: "DisputeResolution",
    functionName: "raiseDispute",
    args: [mineralId, disputeTitle, disputeDescription],
    enabled: allFieldsReady,
    onSuccess: (disputeId: string) => {
      toast.success(`Dispute raised successfully! Dispute ID: ${disputeId}`);
      // Reset form after successful submission
      setDisputeTitle("");
      setDisputeDescription("");
      setMineralId("");
    },
    onError: (error: { message: string | string[] }) => {
      console.error("Dispute raising failed:", error);
      let errorMessage = "Failed to raise dispute.";

      if (error.message.includes("caller is missing role")) {
        errorMessage = "Your account doesn't have miner privileges";
      } else if (error.message.includes("DisputeManager__InvalidMineralId")) {
        errorMessage = "Invalid mineral ID provided";
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

  const handleSubmitDispute = async () => {
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
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
      <AccessDeniedView address={address || ""} isLoadingRefresh={isRefreshingAccess} onRefresh={handleRefreshAccess} />
    );
  }

  // Main form for users with miner role
  return (
    <div className="text-white min-h-screen flex flex-col items-center p-6">
      {/* Form Header */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Raise Dispute</h1>
        <p className="text-gray-400 text-center mb-8">
          Raise a new dispute about a mineral in the system. All fields are required.
        </p>

        <div className="border border-[#323539] rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Mineral ID */}
            <div>
              <label className="block text-sm font-medium mb-2">Mineral ID</label>
              <input
                type="text"
                value={mineralId}
                onChange={e => setMineralId(e.target.value)}
                placeholder="Enter the mineral ID you're disputing"
                className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Dispute Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Dispute Title</label>
              <input
                type="text"
                value={disputeTitle}
                onChange={e => setDisputeTitle(e.target.value)}
                placeholder="Brief title for your dispute"
                className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Dispute Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Detailed Description</label>
              <textarea
                value={disputeDescription}
                onChange={e => setDisputeDescription(e.target.value)}
                placeholder="Provide detailed information about your dispute..."
                rows={5}
                className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitDispute}
            disabled={!allFieldsReady || isRaisingDispute}
            className={`w-full ${
              allFieldsReady ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 cursor-not-allowed"
            } text-white font-medium py-3 rounded mt-8 duration-500 flex items-center justify-center`}
          >
            {isRaisingDispute ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Processing...
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 mr-2" />
                Raise Dispute
              </>
            )}
          </button>
          <p className="text-gray-400 text-sm text-center mt-4">
            {allFieldsReady
              ? "All required fields are complete. You can submit the dispute."
              : "Please fill all required fields to raise a dispute."}
          </p>
        </div>

        {/* Back to Disputes Link */}
        <div className="mt-6 text-center">
          <Link href="/miner/disputes" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
            <ChevronRight className="w-4 h-4 transform rotate-180 mr-1" />
            Back to Disputes
          </Link>
        </div>
      </div>
    </div>
  );
}
