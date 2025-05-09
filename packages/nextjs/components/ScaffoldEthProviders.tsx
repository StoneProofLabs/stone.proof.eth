"use client";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { arbitrum, mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([mainnet, polygon, optimism, arbitrum, sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "StoneProof",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // ⚡ remember to replace!
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const ScaffoldEthProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthProviders;
