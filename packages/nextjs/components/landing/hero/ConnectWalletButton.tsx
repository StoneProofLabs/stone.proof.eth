/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2 } from "lucide-react";
import { FaWallet } from "react-icons/fa";

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

const ConnectWalletButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, authenticationStatus, mounted, openChainModal, openAccountModal }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain;
        const isConnecting = authenticationStatus === "loading";

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
                    className="relative flex items-center justify-center gap-2 px-8 py-3 font-semibold bg-[#23272F] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[48px] rounded-md border border-transparent"
                  >
                    {/* Left Bracket */}
                    <div className="absolute left-0 top-0 h-[2px] w-[12px] bg-white rounded-tr-sm" />
                    <div className="absolute left-0 bottom-0 h-[2px] w-[12px] bg-white rounded-br-sm" />
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white" />

                    {/* Right Bracket */}
                    <div className="absolute right-0 top-0 h-[2px] w-[12px] bg-white rounded-tl-sm" />
                    <div className="absolute right-0 bottom-0 h-[2px] w-[12px] bg-white rounded-bl-sm" />
                    <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white" />

                    {isConnecting ? <Loader2 className="animate-spin w-5 h-5" /> : <FaWallet className="text-lg" />}
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
                  {/* Account Button with bracket borders */}
                  <button
                    onClick={openAccountModal}
                    className="relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#23272F] text-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[0_0_16px_2px_rgba(59,130,246,0.25)] min-h-[48px] border-0"
                  >
                    {/* left border */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-white"
                      style={{ height: "calc(100% + 10px)", top: "-5px" }}
                    ></div>
                    <div className="absolute left-0 top-0 h-[2px] w-[12px] bg-white" style={{ top: "-5px" }}></div>
                    <div
                      className="absolute left-0 bottom-0 h-[2px] w-[12px] bg-white"
                      style={{ bottom: "-5px" }}
                    ></div>

                    {/* right border */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-[2px] bg-white"
                      style={{ height: "calc(100% + 10px)", top: "-5px" }}
                    ></div>
                    <div className="absolute right-0 top-0 h-[2px] w-[12px] bg-white" style={{ top: "-5px" }}></div>
                    <div
                      className="absolute right-0 bottom-0 h-[2px] w-[12px] bg-white"
                      style={{ bottom: "-5px" }}
                    ></div>

                    {account.displayName}
                  </button>

                  {/* Chain Button with bracket borders */}
                  <button
                    onClick={openChainModal}
                    className="relative flex items-center gap-2 px-4 py-3 rounded-lg font-semibold bg-[#23272F] text-white focus:outline-none focus:ring-2 focus:ring-green-400 shadow-[0_0_16px_2px_rgba(34,197,94,0.25)] min-h-[48px] border-0"
                  >
                    {/* left border */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-white"
                      style={{ height: "calc(100% + 10px)", top: "-5px" }}
                    ></div>
                    <div className="absolute left-0 top-0 h-[2px] w-[12px] bg-white" style={{ top: "-5px" }}></div>
                    <div
                      className="absolute left-0 bottom-0 h-[2px] w-[12px] bg-white"
                      style={{ bottom: "-5px" }}
                    ></div>

                    {/* right border */}
                    <div
                      className="absolute right-0 top-0 bottom-0 w-[2px] bg-white"
                      style={{ height: "calc(100% + 10px)", top: "-5px" }}
                    ></div>
                    <div className="absolute right-0 top-0 h-[2px] w-[12px] bg-white" style={{ top: "-5px" }}></div>
                    <div
                      className="absolute right-0 bottom-0 h-[2px] w-[12px] bg-white"
                      style={{ bottom: "-5px" }}
                    ></div>

                    {chain.iconUrl && (
                      <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} className="w-5 h-5 rounded-full" />
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
