"use client";

import { useState } from "react";
import { AlertCircle, Check } from "lucide-react";
import UnrefinedMineralsTable from "~~/components/dashboard/refiner/unrefinedMinerals";
import { warehouseMineralData } from "~~/data/data";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function Page() {
  const [mineralId, setMineralId] = useState("");
  const [report, setReport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { writeContractAsync } = useScaffoldWriteContract("RolesManager");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mineralId) {
      notification.error("Please enter mineral ID");
      return;
    }
    if (!report) {
      notification.error("Please enter refinement report");
      return;
    }

    setIsSubmitting(true);
    try {
      await writeContractAsync({
        functionName: "refineMineral",
        args: [mineralId, report],
      });

      notification.info("Transaction submitted. Waiting for confirmation...");
      setMineralId("");
      setReport("");
    } catch (error: any) {
      console.error("Transaction error:", error);

      if (error.message.includes("User rejected the request")) {
        notification.error("Transaction rejected by user");
      } else if (error.message.includes("RolesManager__InvalidMineralIdOrNotFound")) {
        notification.error("Invalid mineral ID or mineral not found");
      } else if (error.message.includes("RolesManager__MineralAlreadyRefined")) {
        notification.error("This mineral has already been refined");
      } else if (error.message.includes("caller is missing role")) {
        notification.error("No refiner privileges");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Refine Mineral</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Un-Refined Minerals</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Minerals Table (non-interactive) */}
          <div className="w-full lg:w-[50%]">
            <UnrefinedMineralsTable minerals={warehouseMineralData} selectedMineral={null} onSelectMineral={() => {}} />
          </div>

          {/* Refinement Form */}
          <div className="w-full lg:w-[50%]">
            <form onSubmit={handleSubmit} className="border border-[#323539] rounded-lg p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Mineral ID</label>
                <input
                  type="text"
                  value={mineralId}
                  onChange={e => setMineralId(e.target.value)}
                  placeholder="Enter mineral ID"
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Refinement Report</label>
                <textarea
                  value={report}
                  onChange={e => setReport(e.target.value)}
                  placeholder="Enter refinement details..."
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 h-32 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !mineralId || !report}
                className={`w-full ${
                  isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-medium py-3 rounded mt-4 transition-colors flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                    Processing...
                  </>
                ) : (
                  "Refine Mineral"
                )}
              </button>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Checkpoints:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${mineralId ? "bg-green-500" : "bg-gray-500"}`}>
                      <Check size={12} />
                    </div>
                    <span className="text-sm">Mineral ID provided</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${report ? "bg-green-500" : "bg-gray-500"}`}>
                      <Check size={12} />
                    </div>
                    <span className="text-sm">Report provided</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
