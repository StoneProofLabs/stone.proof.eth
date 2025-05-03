"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import Sidebar from "~~/components/dashboard/Sidebar";
import TopBar from "~~/components/dashboard/topBar";
import { useSidebarStore } from "~~/stores/useSidebarStore";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";
import { ShieldAlert, Copy, Mail, Phone, MessageSquare, ChevronRight, Loader2, Lock } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "../lib/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sidebarItems = getSidebarItems("/admin");

const LoadingSpinner = ({ size = 12, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-lg text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying admin privileges..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-[#060A12]">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-[#060A12]">
    <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">
        {isLoading ? "Connecting..." : "Connect Admin Wallet"}
      </h1>
      <p className="text-gray-400 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect your admin wallet"}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

const AccessDeniedView = ({
  address,
  isLoadingRefresh,
  onRefresh,
}: { 
  address: string;
  isLoadingRefresh: boolean;
  onRefresh: () => void;
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Wallet address copied!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900 rounded-full mx-auto">
            <Lock className="w-8 h-8 text-red-300" />
          </div>

          <h2 className="text-2xl font-bold text-white">Admin Access Required</h2>
          <p className="text-gray-400">Your wallet doesn&apos;t have admin privileges</p>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Connected Wallet:</span>
              <button onClick={copyAddress} className="text-blue-400 hover:text-blue-300" title="Copy address">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <p className="font-mono text-sm break-all text-left">{address}</p>
          </div>

          <div className="pt-4 space-y-3 text-left">
            <h3 className="font-medium text-white">How to get admin access:</h3>
            <ol className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                  1
                </span>
                <div>
                  <p>Contact system owner at:</p>
                  <div className="mt-1 space-y-2 pl-2">
                    <a
                      href="mailto:admin@stone.proof?subject=Admin%20Access%20Request"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <Mail className="w-4 h-4" />
                      admin@stone.proof
                    </a>
                    <a href="tel:+250795107436" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                      <Phone className="w-4 h-4" />
                      +(250) 795 107 436
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                  2
                </span>
                <div>
                  <p>Request admin role through:</p>
                  <div className="mt-1 pl-2">
                    <a
                      href="https://t.me/StoneProofSupport"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <MessageSquare className="w-4 h-4" />
                      @StoneProofSupport
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                  3
                </span>
                <div>
                  <p>Refresh this page after approval</p>
                  <p className="text-xs text-gray-500 mt-1">
                    If access isn&apos;t granted immediately, wait a few minutes then refresh
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="pt-4">
            <button
              onClick={onRefresh}
              disabled={isLoadingRefresh}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoadingRefresh ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Verify Access Again
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarStore();
  const { address, isConnected, isConnecting } = useAccount();
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const {
    data: hasAdminRole,
    isLoading: isRoleLoading,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasRole",
    args: ["0x0000000000000000000000000000000000000000000000000000000000000000", address], // DEFAULT_ADMIN_ROLE
    enabled: isConnected,
  });

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      const { data } = await refetchRoleCheck();
      if (!data) {
        toast.error("Still no admin access. Contact system owner.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      toast.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  useEffect(() => {
    if (hasAdminRole) {
      const timer = setTimeout(() => {
        setIsDataLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasAdminRole]);

  if (isConnected && isRoleLoading) {
    return <FullPageLoader text="Verifying admin privileges..." />;
  }

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (!hasAdminRole) {
    return (
      <div className={`${inter.variable} font-sans bg-[#060A12] flex text-white min-h-screen`}>
        <Sidebar basePath="/admin" />
        <div
          className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${!isCollapsed ? "md:ml-[250px]" : ""}`}
        >
          <TopBar sidebarItems={sidebarItems} basePath="/admin" />
          <main className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
            <AccessDeniedView 
              address={address || ""}
              isLoadingRefresh={isRefreshingAccess}
              onRefresh={handleRefreshAccess}
            />
          </main>
        </div>
      </div>
    );
  }

  if (isDataLoading) {
    return <FullPageLoader text="Loading admin dashboard..." />;
  }

  return (
    <div className={`${inter.variable} font-sans bg-[#060A12] flex text-white h-screen`}>
      <Sidebar basePath="/admin" />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${!isCollapsed ? "md:ml-[250px]" : ""}`}
      >
        <TopBar sidebarItems={sidebarItems} basePath="/admin" />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}