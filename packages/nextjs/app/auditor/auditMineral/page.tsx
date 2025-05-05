"use client";

import React, { useState } from "react";
import { AlertCircle, Check, ChevronDown, ChevronRight, Copy, Loader2, Mail, MessageSquare, Minus, Phone, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { toast } from "../../lib/toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

export default function AuditMineralPage() {
  const { address, isConnected } = useAccount();
  const [mineralId, setMineralId] = useState("");
  const [auditReport, setAuditReport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allFieldsReady = mineralId && auditReport;

  const { writeAsync, isLoading: isAuditing } = useScaffoldWriteContract({
    contractName: "RolesManager",
    functionName: "_auditMineral",
    args: [mineralId, auditReport],
    enabled: allFieldsReady,
    onSuccess: () => {
      toast.success("Mineral audited successfully!");
      // Reset form after successful submission
      setMineralId("");
      setAuditReport("");
    },
    onError: (error: { message: string | string[]; }) => {
      console.error("Audit failed:", error);
      let errorMessage = "Failed to audit mineral.";

      if (error.message.includes("RolesManager__InvalidMineralIdOrNotFound")) {
        errorMessage = "Invalid mineral ID or mineral not found";
      } else if (error.message.includes("RolesManager__MineralAlreadyAudited")) {
        errorMessage = "This mineral has already been audited";
      }

      toast.error(errorMessage);
    },
  });

  const handleSubmitAudit = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
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

  return (
    <div className="text-white min-h-screen flex flex-col items-center p-6">
      {/* Form Header */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Audit Mineral</h1>
        <p className="text-gray-400 text-center mb-8">
          Submit an audit report for a registered mineral. All fields are required.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* The form */}
          <div className="border border-[#323539] rounded-lg p-6 flex-1">
            <div className="grid grid-cols-1 gap-6">
              {/* Mineral ID */}
              <div>
                <label className="block text-sm font-medium mb-2">Mineral ID</label>
                <input
                  type="text"
                  value={mineralId}
                  onChange={(e) => setMineralId(e.target.value)}
                  placeholder="Enter the mineral ID to audit"
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                />
              </div>

              {/* Audit Report */}
              <div>
                <label className="block text-sm font-medium mb-2">Audit Report</label>
                <textarea
                  value={auditReport}
                  onChange={(e) => setAuditReport(e.target.value)}
                  placeholder="Provide detailed audit report..."
                  rows={5}
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                />
              </div>
            </div>

            {/* Audit Button */}
            <button
              onClick={handleSubmitAudit}
              disabled={!allFieldsReady || isAuditing}
              className={`w-full ${
                allFieldsReady ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 cursor-not-allowed"
              } text-white font-medium py-3 rounded mt-8 duration-500 flex items-center justify-center`}
            >
              {isAuditing ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                "Submit Audit"
              )}
            </button>
            <p className="text-gray-400 text-sm text-center mt-4">
              {allFieldsReady 
                ? "All required fields are complete. You can submit the audit."
                : "Please fill all required fields to submit an audit."}
            </p>
          </div>

          {/* Checkpoints Section */}
          <div className="lg:w-72">
            <div className="rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Check-points</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${mineralId ? "bg-green-500" : "bg-gray-500"}`}>
                    {mineralId ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Valid mineral ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${auditReport ? "bg-green-500" : "bg-gray-500"}`}>
                    {auditReport ? <Check size={12} /> : <Minus size={12} />}
                  </div>
                  <span className="text-sm">Detailed audit report</span>
                </div>
              </div>

              <h3 className="font-medium mb-2">Tips:</h3>
              <div className="flex gap-2 text-sm">
                <AlertCircle className="min-w-5 h-5 text-white mt-0.5" />
                <p className="text-gray-400">
                  Ensure the audit report is accurate and complete. Once submitted, the mineral will be marked as audited and cannot be audited again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
