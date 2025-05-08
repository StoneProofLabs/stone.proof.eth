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

const buyMineralSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  paymentMethod: z.enum(["ETH", "TOKEN"], {
    required_error: "Payment method is required",
  }),
  tokenAddress: z.string().optional(),
  amount: z.string().min(1, "Amount is required")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number"),
});

export default function BuyMineralPage() {
  const { address, isConnected, isConnecting } = useAccount();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const { writeContractAsync } = useScaffoldWriteContract("MineralWarehouse");

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(buyMineralSchema),
    defaultValues: {
      paymentMethod: "ETH",
      tokenAddress: "",
      amount: ""
    }
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    if (!isConnected) return;

    setIsTransactionPending(true);
    try {
      let args;
      let value;

      if (data.paymentMethod === "ETH") {
        const amountInWei = BigInt(Math.floor(parseFloat(data.amount) * 10 ** 18));
        args = [data.mineralId, 0, data.tokenAddress || address(0), amountInWei];
        value = amountInWei;
      } else {
        const amount = BigInt(Math.floor(parseFloat(data.amount) * 10 ** 18));
        args = [data.mineralId, 1, data.tokenAddress, amount];
        value = undefined;
      }

      await writeContractAsync({
        functionName: "purchase_mineral",
        args,
        value,
      });

      notification.success("Mineral purchased successfully!");
    } catch (err) {
      console.error("Transaction error:", err);
      notification.error(err.message || "Transaction failed");
    } finally {
      setIsTransactionPending(false);
    }
  };

  if (!isConnected) return <div>Please connect your wallet</div>;

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Purchase Mineral</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
          <div>
            <label className="block mb-2">Mineral ID</label>
            <input
              {...register("mineralId")}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            />
            {errors.mineralId && <p className="text-red-400">{errors.mineralId.message}</p>}
          </div>

          <div>
            <label className="block mb-2">Payment Method</label>
            <select
              {...register("paymentMethod")}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            >
              <option value="ETH">ETH</option>
              <option value="TOKEN">ERC-20 Token</option>
            </select>
          </div>

          {paymentMethod === "TOKEN" && (
            <div>
              <label className="block mb-2">Token Address</label>
              <input
                {...register("tokenAddress")}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600"
              />
            </div>
          )}

          <div>
            <label className="block mb-2">Amount</label>
            <input
              {...register("amount")}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            />
            {errors.amount && <p className="text-red-400">{errors.amount.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isTransactionPending}
            className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-600"
          >
            {isTransactionPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" />
                Processing...
              </span>
            ) : "Purchase"}
          </button>
        </form>
      </div>
    </div>
  );
}
