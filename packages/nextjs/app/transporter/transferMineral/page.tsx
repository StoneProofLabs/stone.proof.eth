"use client";

import { useState } from "react";
import { AlertCircle, Check, Copy, Loader2, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin text-emerald-500`} />
    {text && <p className="text-sm text-gray-400">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying transporter access..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-900">
    <div className="max-w-md w-full p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Your Wallet</h2>
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to transfer minerals</p>
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
        <p className="text-gray-400">The connected wallet doesn't have transporter privileges to transfer minerals.</p>
        <div className="flex items-center gap-2 p-2 px-4 mt-2 border border-gray-700 rounded-lg bg-gray-900/50 w-full">
          <span className="font-mono text-sm text-gray-300 truncate">{address}</span>
          <button onClick={copyAddress} className="p-1 rounded-md hover:bg-gray-700 text-gray-400">
            <Copy className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full mt-4 p-4 rounded-lg border border-gray-700 bg-gray-900/30">
          <h3 className="text-base font-medium text-white mb-4">How to get transporter access:</h3>
          <ol className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
                1
              </span>
              <div>
                <p>Contact system administrator at:</p>
                <div className="mt-1 space-y-2 pl-2">
                  <a
                    href="mailto:admin@stone.proof?subject=Transporter%20Role%20Request"
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
                <p>Request transporter role assignment</p>
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

// form schema
const transferMineralSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  receivingParty: z.string().min(42, "Invalid address").startsWith("0x", "Address must start with 0x"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
});

type TransferMineralFormData = z.infer<typeof transferMineralSchema>;

export default function TransferMineralPage() {
  const { address, isConnected, isConnecting } = useAccount();
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  // Check if user has transporter role
  const {
    data: hasTransporterRole,
    isLoading: isRoleLoading,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasTransporterRole",
    args: [address],
    enabled: isConnected,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TransferMineralFormData>({
    resolver: zodResolver(transferMineralSchema),
    mode: "onChange",
  });

  const { writeContractAsync } = useScaffoldWriteContract("RolesManager");

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

  const onSubmit = async (data: TransferMineralFormData) => {
    if (!isConnected || !hasTransporterRole) return;

    setIsTransactionPending(true);
    try {
      notification.info("Preparing transaction...");

      await writeContractAsync({
        functionName: "transferMineral",
        args: [data.mineralId, data.receivingParty as `0x${string}`, data.origin, data.destination],
      });

      notification.success("Mineral transferred successfully!");
    } catch (err: any) {
      console.error("Transaction error:", err);

      if (err.message.includes("User rejected the request")) {
        notification.error("Transaction rejected by user");
      } else if (err.message.includes("RolesManager__InvalidMineralIdOrNotFound")) {
        notification.error("Invalid mineral ID or not found");
      } else if (err.message.includes("RolesManager__InvalidReceivingPartyAddress")) {
        notification.error("Invalid receiving party address");
      } else if (err.message.includes("RolesManager__MineralAlreadyPurchased")) {
        notification.error("Mineral has already been purchased");
      } else if (err.message.includes("caller is missing role")) {
        notification.error("No transporter privileges");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsTransactionPending(false);
    }
  };

  if (isConnected && isRoleLoading) {
    return <FullPageLoader text="Checking transporter permissions..." />;
  }

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (isConnected && !hasTransporterRole) {
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
    <div className="min-h-screen flex flex-col items-center p-6 text-white bg-gray-900">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Transfer Mineral</h1>
          <p className="text-gray-400">Transfer minerals to another party. All fields are required.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 p-6 rounded-xl border border-gray-700 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Mineral ID Field */}
              <div className="space-y-2">
                <label htmlFor="mineralId" className="block text-sm font-medium text-gray-300">
                  Mineral ID
                </label>
                <input
                  id="mineralId"
                  type="text"
                  {...register("mineralId")}
                  placeholder="#f45f-2ds5-a445-7j97"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.mineralId && (
                  <p className="text-sm text-red-400 mt-1">{errors.mineralId.message}</p>
                )}
              </div>

              {/* Receiving Party Field */}
              <div className="space-y-2">
                <label htmlFor="receivingParty" className="block text-sm font-medium text-gray-300">
                  Receiving Party Address
                </label>
                <input
                  id="receivingParty"
                  type="text"
                  {...register("receivingParty")}
                  placeholder="0x..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.receivingParty && (
                  <p className="text-sm text-red-400 mt-1">{errors.receivingParty.message}</p>
                )}
              </div>

              {/* Origin Field */}
              <div className="space-y-2">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-300">
                  Origin
                </label>
                <input
                  id="origin"
                  type="text"
                  {...register("origin")}
                  placeholder="Origin location..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.origin && (
                  <p className="text-sm text-red-400 mt-1">{errors.origin.message}</p>
                )}
              </div>

              {/* Destination Field */}
              <div className="space-y-2">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-300">
                  Destination
                </label>
                <input
                  id="destination"
                  type="text"
                  {...register("destination")}
                  placeholder="Destination address..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.destination && (
                  <p className="text-sm text-red-400 mt-1">{errors.destination.message}</p>
                )}
              </div>

              <div className="my-6 border-t border-gray-700"></div>

              <button
                type="submit"
                disabled={isTransactionPending || !isValid}
                className={`w-full h-12 rounded-lg font-medium text-white ${
                  isValid && !isTransactionPending
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-gray-700 cursor-not-allowed"
                } transition-colors duration-200`}
              >
                {isTransactionPending ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </div>
                ) : (
                  "Transfer Mineral"
                )}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                {isValid
                  ? "All required fields are complete. You can transfer the mineral."
                  : "Please fill all required fields to transfer."}
              </p>
            </form>
          </div>

          <div className="lg:w-80">
            <div className="p-6 rounded-xl border border-gray-700 shadow-lg h-full">
              <h2 className="text-lg font-medium mb-6 text-white">Validation Status</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      !errors.mineralId ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!errors.mineralId ? <Check size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Valid mineral ID</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      !errors.receivingParty ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!errors.receivingParty ? <Check size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Valid receiving party</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      !errors.origin ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!errors.origin ? <Check size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Origin provided</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      !errors.destination ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!errors.destination ? <Check size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Destination provided</span>
                </div>
              </div>

              <div className="my-6 border-t border-gray-700"></div>

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-white">Important Notes:</h3>
                <div className="flex gap-3 text-sm bg-gray-700/50 p-4 rounded-lg">
                  <AlertCircle className="min-w-5 h-5 mt-0.5 text-amber-400" />
                  <p className="text-gray-300">
                    Ensure all details are accurate. Once transferred, the mineral will be under the receiving party's control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}