
'use client';

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, sepolia],
  [publicProvider()]
);


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

      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>

    </WagmiConfig>
  );
};

export default ScaffoldEthProviders;
