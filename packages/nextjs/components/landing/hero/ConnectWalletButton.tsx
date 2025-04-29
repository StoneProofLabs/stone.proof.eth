"use client";

import React from "react";
import { FaWallet } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2 } from "lucide-react";

const ConnectWalletButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
        openChainModal,
        openAccountModal,
        isConnecting,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="relative flex items-center gap-2 px-8 py-3 rounded-lg font-semibold bg-[#23272F] text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[0_0_16px_2px_rgba(59,130,246,0.25)] min-h-[48px]"
                  >
                    {isConnecting ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <FaWallet className="text-lg" />
                    )}
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-red-600 text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-red-400 shadow-[0_0_16px_2px_rgba(239,68,68,0.25)] min-h-[48px]"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openAccountModal}
                    className="relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#23272F] text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[0_0_16px_2px_rgba(59,130,246,0.25)] min-h-[48px]"
                  >
                    {account.displayName}
                  </button>
                  <button
                    onClick={openChainModal}
                    className="relative flex items-center gap-2 px-4 py-3 rounded-lg font-semibold bg-[#23272F] text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-green-400 shadow-[0_0_16px_2px_rgba(34,197,94,0.25)] min-h-[48px]"
                  >
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    {chain.name}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
