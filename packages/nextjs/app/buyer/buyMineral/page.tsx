"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { z } from "zod";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin text-emerald-500`} />
    {text && <p className="text-sm text-gray-400">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying access..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-900">
    <div className="max-w-md w-full p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Your Wallet</h2>
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to purchase minerals</p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
    {isLoading && <LoadingSpinner size={8} text="Connecting wallet..." />}
  </div>
);

// form schema
const buyMineralSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  paymentMethod: z.enum(["eth", "erc20"], {
    required_error: "Payment method is required",
  }),
  tokenAmount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
});

type BuyMineralFormData = z.infer<typeof buyMineralSchema>;

export default function BuyMineralPage() {
  const { address, isConnected, isConnecting } = useAccount();
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BuyMineralFormData>({
    resolver: zodResolver(buyMineralSchema),
    mode: "onChange",
  });

  const paymentMethod = watch("paymentMethod");
  const { writeContractAsync } = useScaffoldWriteContract("Marketplace");

  const onSubmit = async (data: BuyMineralFormData) => {
    if (!isConnected) return;

    setIsTransactionPending(true);
    try {
      notification.info("Preparing transaction...");

      await writeContractAsync({
        functionName: "buyMineral",
        args: [
          data.mineralId,
          data.paymentMethod,
          BigInt(Math.floor(parseFloat(data.tokenAmount) * 10 ** 18)), // Convert to wei
        ],
      });

      notification.success("Mineral purchased successfully!");
    } catch (err: any) {
      console.error("Transaction error:", err);

      if (err.message.includes("User rejected the request")) {
        notification.error("Transaction rejected by user");
      } else if (err.message.includes("Marketplace__InvalidMineralId")) {
        notification.error("Invalid mineral ID");
      } else if (err.message.includes("Marketplace__InsufficientFunds")) {
        notification.error("Insufficient funds");
      } else if (err.message.includes("Marketplace__MineralAlreadyPurchased")) {
        notification.error("Mineral has already been purchased");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsTransactionPending(false);
    }
  };

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (isConnected && isConnecting) {
    return <FullPageLoader text="Connecting wallet..." />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 text-white">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Purchase Mineral</h1>
          <p className="text-gray-400">Buy minerals from the marketplace. All fields are required.</p>
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
                {errors.mineralId && <p className="text-sm text-red-400 mt-1">{errors.mineralId.message}</p>}
              </div>

              {/* Payment Method Field */}
              <div className="space-y-2">
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-300">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  {...register("paymentMethod")}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                >
                  <option value="">Select payment method</option>
                  <option value="eth">ETH</option>
                  <option value="erc20">ERC-20 Token</option>
                </select>
                {errors.paymentMethod && <p className="text-sm text-red-400 mt-1">{errors.paymentMethod.message}</p>}
              </div>

              {/* Token Amount Field */}
              <div className="space-y-2">
                <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-300">
                  {paymentMethod === "eth" ? "ETH Amount" : "Token Amount"}
                </label>
                <input
                  id="tokenAmount"
                  type="text"
                  {...register("tokenAmount")}
                  placeholder={paymentMethod === "eth" ? "0.00 ETH" : "0.00 Tokens"}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.tokenAmount && <p className="text-sm text-red-400 mt-1">{errors.tokenAmount.message}</p>}
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
                  "Purchase Mineral"
                )}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                {isValid
                  ? "All required fields are complete. You can purchase the mineral."
                  : "Please fill all required fields to purchase."}
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
                      !errors.paymentMethod ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!errors.paymentMethod ? <Check size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Payment method selected</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      !errors.tokenAmount ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!errors.tokenAmount ? <Check size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Valid amount</span>
                </div>
              </div>

              <div className="my-6 border-t border-gray-700"></div>

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-white">Important Notes:</h3>
                <div className="flex gap-3 text-sm bg-gray-700/50 p-4 rounded-lg">
                  <AlertCircle className="min-w-5 h-5 mt-0.5 text-amber-400" />
                  <p className="text-gray-300">
                    Ensure you have sufficient balance. Once purchased, the mineral will be transferred to your account.
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
