"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, Check, ChevronDown, Copy, Loader2, Minus } from "lucide-react";
import { useForm } from "react-hook-fo∑rm";
import { useAccount } from "wagmi";
import { z } from "zod";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const disputeSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  defendant: z
    .string()
    .min(1, "Defendant address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  details: z.string().min(20, "Details must be at least 20 characters"),
  evidence: z.string().min(10, "Evidence must be at least 10 characters"),
});

type DisputeFormData = z.infer<typeof disputeSchema>;

const LoadingSpinner = ({ size = 24, text = "" }: { size?: number; text?: string }) => (
  <div className="flex items-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin text-blue-500`} />
    {text && <span className="text-sm">{text}</span>}
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-900">
    <div className="max-w-md w-full p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Your Wallet</h2>
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to raise a dispute</p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
    {isLoading && <LoadingSpinner size={8} text="Connecting wallet..." />}
  </div>
);

export default function RaiseDisputePage() {
  const { address, isConnected, isConnecting } = useAccount();
  const [selectedMineralId, setSelectedMineralId] = useState<string | null>(null);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [inputMethod, setInputMethod] = useState<"select" | "manual">("select");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<DisputeFormData>({
    resolver: zodResolver(disputeSchema),
    defaultValues: {
      mineralId: "",
      defendant: "",
      details: "",
      evidence: "",
    },
    mode: "onChange",
  });

  const { writeContractAsync } = useScaffoldWriteContract("DisputeResolution");

  const onSubmit = async (data: DisputeFormData) => {
    if (!isConnected || !address) {
      notification.error("Please connect your wallet");
      return;
    }

    setIsTransactionPending(true);
    try {
      notification.info("Submitting dispute...");

      await writeContractAsync({
        functionName: "raiseDispute",
        args: [data.mineralId, data.defendant as `0x${string}`, data.details, data.evidence],
      });

      notification.success(
        <div className="flex flex-col">
          <span className="font-bold">Dispute raised successfully!</span>
        </div>,
      );
      reset();
      setSelectedMineralId(null);
    } catch (error: any) {
      console.error("Error raising dispute:", error);

      let errorMessage = "Failed to raise dispute";
      if (error.message.includes("User rejected the request")) {
        errorMessage = "Transaction rejected by user";
      } else if (error.message.includes("DisputeResolution__InvalidMineralIdOrNotFound")) {
        errorMessage = "Invalid mineral ID or not found";
      } else if (error.message.includes("DisputeResolution__InvalidDisputeDefendantAddress")) {
        errorMessage = "Invalid defendant address";
      } else if (error.message.includes("DisputeResolution__InvalidDisputeDetails")) {
        errorMessage = "Dispute details too short (min 20 chars)";
      } else if (error.message.includes("DisputeResolution__InvalidDisputeEvidence")) {
        errorMessage = "Evidence too short (min 10 chars)";
      }

      notification.error(
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 mt-0.5 text-red-400" />
          <div>
            <span className="font-medium">{errorMessage}</span>
            {error.message && (
              <div className="text-xs opacity-70 mt-1 max-w-xs">
                {error.message.length > 100 ? `${error.message.substring(0, 100)}...` : error.message}
              </div>
            )}
          </div>
        </div>,
      );
    } finally {
      setIsTransactionPending(false);
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedMineralId(null);
  };

  const handleSelectMineral = (mineralId: string) => {
    setSelectedMineralId(mineralId);
    setValue("mineralId", mineralId, { shouldValidate: true });
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
      image: "/dashboard/gold.png",
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

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Raise a Dispute
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-3">
            Challenge mineral records that you believe are inaccurate. Provide detailed information and evidence to
            support your claim.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Minerals List */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Pending Minerals</h2>
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
                          inputMethod === "select" ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-gray-600"
                        }`}
                      >
                        Select Mineral
                      </button>
                      <button
                        onClick={() => {
                          setInputMethod("manual");
                          setIsDropdownOpen(false);
                          setSelectedMineralId(null);
                          setValue("mineralId", "", { shouldValidate: false });
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          inputMethod === "manual" ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-gray-600"
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
                        selectedMineralId === mineral.id
                          ? "border-blue-500 bg-blue-900/20"
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
                              <span className="text-blue-400">
                                {selectedMineralId === mineral.id ? "Selected" : ""}
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
                      {...register("mineralId")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                      placeholder="e.g. GOLD-0x8e07d295"
                    />
                    {errors.mineralId && <p className="text-red-400 text-xs mt-1">{errors.mineralId.message}</p>}
                  </div>
                  <div className="bg-blue-900/10 border border-blue-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 mt-0.5 text-blue-400 flex-shrink-0" />
                      <div className="text-sm text-blue-200">
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

          {/* Right Side - Dispute Form */}
          <div className="w-full lg:w-3/5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6">Dispute Details</h2>

              {inputMethod === "select" && selectedMineralId && (
                <div className="mb-5 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Selected Mineral ID:</span>
                    <span className="font-mono break-all">{selectedMineralId}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedMineralId);
                        notification.success("Mineral ID copied to clipboard");
                      }}
                      className="ml-auto text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Defendant Address</label>
                  <div className="relative">
                    <input
                      {...register("defendant")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all pr-10"
                      placeholder="0x..."
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (watch("defendant")) {
                          navigator.clipboard.writeText(watch("defendant"));
                          notification.success("Address copied to clipboard");
                        }
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  {errors.defendant && <p className="text-red-400 text-xs mt-1">{errors.defendant.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Issue Details</label>
                  <textarea
                    {...register("details")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-h-32"
                    placeholder="Describe the issue in detail (minimum 20 characters)..."
                  />
                  <div className="flex justify-between mt-1">
                    {errors.details ? (
                      <p className="text-red-400 text-xs">{errors.details.message}</p>
                    ) : (
                      <p className="text-gray-500 text-xs">Minimum 20 characters required</p>
                    )}
                    <span className="text-xs text-gray-400">{watch("details")?.length || 0}/20</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Supporting Evidence</label>
                  <textarea
                    {...register("evidence")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-h-24"
                    placeholder="Provide links, hashes, or descriptions of evidence (minimum 10 characters)..."
                  />
                  <div className="flex justify-between mt-1">
                    {errors.evidence ? (
                      <p className="text-red-400 text-xs">{errors.evidence.message}</p>
                    ) : (
                      <p className="text-gray-500 text-xs">Minimum 10 characters required</p>
                    )}
                    <span className="text-xs text-gray-400">{watch("evidence")?.length || 0}/10</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isTransactionPending}
                  className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid || isTransactionPending || (!selectedMineralId && inputMethod === "select")}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                >
                  {isTransactionPending ? <LoadingSpinner size={20} text="Processing..." /> : "Submit Dispute"}
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
                      (inputMethod === "select" && selectedMineralId) ||
                      (inputMethod === "manual" && watch("mineralId"))
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {(inputMethod === "select" && selectedMineralId) ||
                    (inputMethod === "manual" && watch("mineralId")) ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {inputMethod === "select" ? "Mineral selected" : "Valid Mineral ID"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {inputMethod === "select"
                        ? "Choose from list or enter manually"
                        : "Must be a valid mineral identifier (e.g. GOLD-0x...)"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      watch("defendant") && !errors.defendant
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {watch("defendant") && !errors.defendant ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Valid defendant address</p>
                    <p className="text-xs text-gray-400 mt-0.5">Must be a valid Ethereum address (0x...)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      watch("details") && !errors.details
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {watch("details") && !errors.details ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Detailed description</p>
                    <p className="text-xs text-gray-400 mt-0.5">Minimum 20 characters explaining the issue</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      watch("evidence") && !errors.evidence
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {watch("evidence") && !errors.evidence ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Minus className="w-3 h-3" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Supporting evidence</p>
                    <p className="text-xs text-gray-400 mt-0.5">Minimum 10 characters describing evidence</p>
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
