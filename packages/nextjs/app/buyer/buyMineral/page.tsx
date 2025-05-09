"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAccount, useBalance } from "wagmi";
import { z } from "zod";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

// Token list for Sepolia testnet
const ACCEPTED_TOKENS = [
  {
    name: "USDC",
    address: "0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f",
    decimals: 6,
    logo: "/usdc-logo.png",
  },
  {
    name: "DAI",
    address: "0x68194a729C2450ad26072b3D33ADaCbcef39D574",
    decimals: 18,
    logo: "/dai-logo.png",
  },
  {
    name: "WETH",
    address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    decimals: 18,
    logo: "/weth-logo.png",
  },
];

const formSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  paymentMethod: z.enum(["ETH", "TOKEN"], {
    required_error: "Payment method is required",
  }),
  tokenAddress: z.string().optional(),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d+)?$/, "Must be a valid number")
    .refine(val => parseFloat(val) > 0, "Amount must be greater than 0"),
});

type FormData = z.infer<typeof formSchema>;

export default function BuyMineralPage() {
  const { address, isConnected } = useAccount();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [userBalance, setUserBalance] = useState<string>("0");
  const [selectedToken, setSelectedToken] = useState(ACCEPTED_TOKENS[0]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "ETH",
      tokenAddress: ACCEPTED_TOKENS[0].address,
    },
  });

  const paymentMethod = watch("paymentMethod");
  const amount = watch("amount");

  // Get ETH balance
  const { data: ethBalance } = useBalance({ address });

  // Get ERC20 balance when token is selected
  const { data: tokenBalance } = useBalance({
    address,
    token: paymentMethod === "TOKEN" ? (watch("tokenAddress") as `0x${string}`) : undefined,
    enabled: paymentMethod === "TOKEN" && isConnected,
  });

  const { writeContractAsync } = useScaffoldWriteContract("MineralWarehouse");

  // Update balance display
  useEffect(() => {
    if (paymentMethod === "ETH" && ethBalance) {
      setUserBalance(parseFloat(ethBalance.formatted).toFixed(4));
    } else if (paymentMethod === "TOKEN" && tokenBalance) {
      setUserBalance(parseFloat(tokenBalance.formatted).toFixed(4));
    }
  }, [ethBalance, tokenBalance, paymentMethod]);

  // Handle token selection
  const handleTokenChange = (tokenAddress: string) => {
    const token = ACCEPTED_TOKENS.find(t => t.address === tokenAddress);
    if (token) {
      setSelectedToken(token);
      setValue("tokenAddress", token.address);
    }
  };

  // Format amount to wei/units based on token decimals
  const formatAmount = (amount: string, decimals: number): bigint => {
    const amountFloat = parseFloat(amount);
    return BigInt(amountFloat * 10 ** decimals);
  };

  const onSubmit = async (data: FormData) => {
    if (!isConnected || !address) {
      notification.error("Please connect your wallet");
      return;
    }

    setIsTransactionPending(true);
    try {
      const decimals = paymentMethod === "ETH" ? 18 : selectedToken.decimals;
      const amountInUnits = formatAmount(data.amount, decimals);

      const txArgs = [
        data.mineralId,
        paymentMethod === "ETH" ? 0 : 1, // 0 for ETH, 1 for TOKEN
        paymentMethod === "ETH" ? "0x0000000000000000000000000000000000000000" : data.tokenAddress,
        amountInUnits,
      ];

      notification.info("Processing transaction...");

      await writeContractAsync({
        functionName: "purchase_mineral",
        args: txArgs,
        value: paymentMethod === "ETH" ? amountInUnits : undefined,
      });

      notification.success("Mineral purchased successfully!");
    } catch (err: any) {
      console.error("Transaction error:", err);

      let errorMessage = "Transaction failed";
      if (err.message.includes("Token not accepted")) {
        errorMessage = "This token is not accepted";
      } else if (err.message.includes("Insufficient funds")) {
        errorMessage = "Insufficient balance";
      } else if (err.message.includes("User rejected request")) {
        errorMessage = "Transaction cancelled";
      }

      notification.error(errorMessage);
    } finally {
      setIsTransactionPending(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-md p-8 rounded-lg bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6 text-center">Please connect to purchase minerals</p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Purchase Mineral</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Mineral ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Mineral ID *</label>
            <input
              {...register("mineralId")}
              placeholder="Enter mineral ID"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mineralId && <p className="mt-1 text-sm text-red-400">{errors.mineralId.message}</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method *</label>
            <select
              {...register("paymentMethod")}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ETH">ETH</option>
              <option value="TOKEN">ERC-20 Token</option>
            </select>
          </div>

          {/* Token Selection (shown only when TOKEN is selected) */}
          {paymentMethod === "TOKEN" && (
            <div>
              <label className="block text-sm font-medium mb-1">Select Token *</label>
              <select
                {...register("tokenAddress")}
                onChange={e => handleTokenChange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ACCEPTED_TOKENS.map(token => (
                  <option key={token.address} value={token.address}>
                    {token.name}
                  </option>
                ))}
              </select>
              {selectedToken && (
                <div className="flex items-center mt-2 text-sm text-gray-300">
                  <span>
                    Balance: {userBalance} {selectedToken.name}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount ({paymentMethod === "ETH" ? "ETH" : selectedToken?.name}) *
            </label>
            <input
              {...register("amount")}
              type="number"
              step="any"
              placeholder={`0.00 ${paymentMethod === "ETH" ? "ETH" : selectedToken?.name}`}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.amount && <p className="mt-1 text-sm text-red-400">{errors.amount.message}</p>}
            {paymentMethod === "ETH" && ethBalance && (
              <div className="flex justify-between mt-1 text-sm text-gray-300">
                <span>Balance: {userBalance} ETH</span>
                <button
                  type="button"
                  onClick={() => setValue("amount", ethBalance.formatted)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Use Max
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isTransactionPending}
            className={`w-full py-2 px-4 rounded-md font-medium text-white ${
              isTransactionPending ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isTransactionPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Processing...
              </span>
            ) : (
              "Purchase Mineral"
            )}
          </button>
        </form>

        {/* Transaction Tips */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Important Notes:</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Ensure you have sufficient balance</li>
            <li>• Only approved tokens can be used</li>
            <li>• Transactions cannot be reversed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
