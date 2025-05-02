"use client";

import { useEffect, useState } from "react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// Custom light and dark themes for RainbowKit
const customLightTheme = lightTheme({
  accentColor: "#0A7AFF", // StoneProof Blue
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "rounded",
  overlayBlur: "small", // light frosted-glass effect
});

const customDarkTheme = darkTheme({
  accentColor: "#0A7AFF", // StoneProof Blue
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "rounded",
  overlayBlur: "small", // dark frosted-glass effect
});

// Main ScaffoldEthAppWithProviders component
const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

// Initialize query client for React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// ScaffoldEthAppWithProviders component wrapping app with all required providers
export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar height="3px" color="#2299dd" />
        <RainbowKitProvider avatar={BlockieAvatar} theme={customDarkTheme}>
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
