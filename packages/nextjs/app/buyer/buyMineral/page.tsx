"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, Check, ChevronDown, Copy, Loader2, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAccount, useBalance } from "wagmi";
import { z } from "zod";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
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

// Example minerals data
const MINERAL_EXAMPLES = [
  {
    id: "GOLD-0x8e07d295",
    name: "Gold Bar",
    type: "Gold",
    purity: 99.9,
    weight: "1 kg",
    price: "65,000",
    origin: "South Africa",
    image: "/minerals/gold-bar.png",
    description: "24K pure gold bar with certified authenticity",
  },
  {
    id: "SILVER-0xa3f5e1d2",
    name: "Silver Bullion",
    type: "Silver",
    purity: 99.5,
    weight: "5 kg",
    price: "3,800",
    origin: "Mexico",
    image: "/minerals/silver-bullion.png",
    description: "Investment-grade silver bullion with assay certificate",
  },
  {
    id: "COPPER-0xb2c4e3f1",
    name: "Copper Cathode",
    type: "Copper",
    purity: 99.99,
    weight: "100 kg",
    price: "900",
    origin: "Chile",
    image: "/minerals/copper-cathode.png",
    description: "High-grade copper cathode for industrial use",
  },
  {
    id: "LITHIUM-0xc5d6e7f8",
    name: "Lithium Carbonate",
    type: "Lithium",
    purity: 99.5,
    weight: "500 kg",
    price: "12,000",
    origin: "Australia",
    image: "/minerals/lithium-carbonate.png",
    description: "Battery-grade lithium carbonate for EV production",
  },
  {
    id: "COBALT-0xd9e8f7a6",
    name: "Cobalt Ingot",
    type: "Cobalt",
    purity: 99.8,
    weight: "25 kg",
    price: "18,750",
    origin: "DR Congo",
    image: "/minerals/cobalt-ingot.png",
    description: "High-purity cobalt for aerospace and battery applications",
  },
  {
    id: "PLATINUM-0xe1f2a3b4",
    name: "Platinum Bar",
    type: "Platinum",
    purity: 99.95,
    weight: "1 kg",
    price: "32,000",
    origin: "Russia",
    image: "/minerals/platinum-bar.png",
    description: "Certified platinum bar with unique serial number",
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

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gray-900">
    <div className="max-w-md w-full p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Your Wallet</h2>
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to purchase minerals</p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
    {isLoading && (
      <div className="flex items-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="text-sm">Connecting wallet...</span>
      </div>
    )}
  </div>
);

export default function BuyMineralPage() {
  const { address, isConnected, isConnecting } = useAccount();
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [userBalance, setUserBalance] = useState<string>("0");
  const [selectedToken, setSelectedToken] = useState(ACCEPTED_TOKENS[0]);
  const [inputMethod, setInputMethod] = useState<"select" | "manual">("select");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMineral, setSelectedMineral] = useState<any>(null);

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

  // Handle mineral selection
  const handleSelectMineral = (mineral: any) => {
    setSelectedMineral(mineral);
    setValue("mineralId", mineral.id);
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
      } else if (err.message.includes("Mineral not found")) {
        errorMessage = "Mineral ID not found";
      } else if (err.message.includes("Already purchased")) {
        errorMessage = "This mineral has already been purchased";
      }

      notification.error(errorMessage);
    } finally {
      setIsTransactionPending(false);
    }
  };

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Purchase Minerals
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-3">
            Browse and purchase certified minerals from our verified marketplace.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Minerals List */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Available Minerals</h2>
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
                          setSelectedMineral(null);
                          setValue("mineralId", "");
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
                  {MINERAL_EXAMPLES.map(mineral => (
                    <div
                      key={mineral.id}
                      onClick={() => handleSelectMineral(mineral)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedMineral?.id === mineral.id
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-gray-700 hover:border-gray-600 bg-gray-700/50 hover:bg-gray-700/70"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image width={64} height={64} alt={mineral.name} src={mineral.image} className="rounded-md" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">{mineral.name}</h3>
                            <span className="text-xs text-gray-400">${mineral.price}</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-300">
                            {mineral.type} • {mineral.weight}
                          </div>
                          <div className="mt-2">
                            <div className="text-xs mb-1 flex justify-between">
                              <span>Purity: {mineral.purity}%</span>
                              <span className="text-blue-400">
                                {selectedMineral?.id === mineral.id ? "Selected" : ""}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  mineral.purity > 99
                                    ? "bg-green-500"
                                    : mineral.purity > 98
                                      ? "bg-blue-500"
                                      : "bg-yellow-500"
                                }`}
                                style={{ width: `${mineral.purity}%` }}
                              ></div>
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
                          Check the mineral&apos;s details page or transaction history for its unique identifier. Mineral IDs
                          are typically in format &quot;TYPE-0x...&quot;.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Purchase Form */}
          <div className="w-full lg:w-3/5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6">Purchase Details</h2>

              {inputMethod === "select" && selectedMineral && (
                <div className="mb-5 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Selected Mineral:</span>
                    <span className="font-medium">{selectedMineral.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedMineral.id);
                        notification.success("Mineral ID copied to clipboard");
                      }}
                      className="ml-auto text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 break-all">ID: {selectedMineral.id}</div>
                </div>
              )}

              <div className="space-y-5">
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method *</label>
                  <select
                    {...register("paymentMethod")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="ETH">ETH</option>
                    <option value="TOKEN">ERC-20 Token</option>
                  </select>
                </div>

                {/* Token Selection (shown only when TOKEN is selected) */}
                {paymentMethod === "TOKEN" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Token *</label>
                    <select
                      {...register("tokenAddress")}
                      onChange={e => handleTokenChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    >
                      {ACCEPTED_TOKENS.map(token => (
                        <option key={token.address} value={token.address}>
                          {token.name}
                        </option>
                      ))}
                    </select>
                    {selectedToken && (
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-300">
                        <span>
                          Balance: {userBalance} {selectedToken.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setValue("amount", userBalance)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Use Max
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amount ({paymentMethod === "ETH" ? "ETH" : selectedToken?.name}) *
                  </label>
                  <input
                    {...register("amount")}
                    type="number"
                    step="any"
                    placeholder={`0.00 ${paymentMethod === "ETH" ? "ETH" : selectedToken?.name}`}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                  {errors.amount && <p className="mt-1 text-sm text-red-400">{errors.amount.message}</p>}
                  {paymentMethod === "ETH" && ethBalance && (
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-300">
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
              </div>

              <div className="mt-8 pt-5 border-t border-gray-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMineral(null);
                    setValue("mineralId", "");
                    setValue("amount", "");
                  }}
                  disabled={isTransactionPending}
                  className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isTransactionPending || !watch("mineralId") || !watch("amount")}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                >
                  {isTransactionPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Purchase"
                  )}
                </button>
              </div>
            </form>

            {/* Validation Summary */}
            <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">Purchase Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      watch("mineralId") ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {watch("mineralId") ? <Check className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {inputMethod === "select" ? "Mineral selected" : "Valid Mineral ID"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">Choose from list or enter manually</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      watch("amount") && !errors.amount ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {watch("amount") && !errors.amount ? <Check className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Valid amount</p>
                    <p className="text-xs text-gray-400 mt-0.5">Must be greater than 0 and within your balance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">Important Notes</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>All purchases are final and non-refundable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Only approved payment methods are accepted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Mineral authenticity is blockchain-verified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
