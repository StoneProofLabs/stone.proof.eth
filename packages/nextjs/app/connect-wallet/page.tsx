"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Lock } from "lucide-react";

export default function ConnectWalletPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
          <Lock className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please connect a wallet with miner privileges to continue
        </p>
        <div className="flex justify-center">
          <ConnectButton showBalance={true} accountStatus="address" chainStatus="none" />
        </div>
      </div>
    </div>
  );
}
