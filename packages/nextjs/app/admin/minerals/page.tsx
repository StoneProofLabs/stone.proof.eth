"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, Loader2, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import MineralActivity from "~~/components/dashboard/minerals/mineralActivity";
import MineralListTable from "~~/components/dashboard/minerals/mineralListTable/mineralList";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, mineralsList, reports, shipments } from "~~/data/data";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying access permissions..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const AccessDeniedCard = ({
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
    notification.success("Wallet address copied!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto">
          <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-300" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Restricted</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your wallet doesn't have the required permissions to view minerals data.
        </p>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Connected Wallet:</span>
            <button
              onClick={copyAddress}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              title="Copy address"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="font-mono text-sm break-all text-left">{address}</p>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-white">How to get access:</h3>
          <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-300 text-left">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                1
              </span>
              Contact system administrator
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                2
              </span>
              Request miner or admin role assignment
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                3
              </span>
              Refresh this page after approval
            </li>
          </ol>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Contact Administrators</h3>
          <div className="space-y-3">
            {[
              {
                name: "Admin Email",
                value: "admin@stone.proof",
                icon: <Mail className="w-5 h-5" />,
                action: "mailto:admin@stone.proof?subject=Minerals%20Access%20Request",
              },
              {
                name: "Support Phone",
                value: "+1 (555) 123-4567",
                icon: <Phone className="w-5 h-5" />,
                action: "tel:+15551234567",
              },
              {
                name: "Telegram Support",
                value: "@StoneProofSupport",
                icon: <MessageSquare className="w-5 h-5" />,
                action: "https://t.me/StoneProofSupport",
              },
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.action}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{contact.value}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onRefresh}
            disabled={isLoadingRefresh}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoadingRefresh ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Check Access Again
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {isLoading ? "Connecting..." : "Connect Your Wallet"}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect a wallet with miner privileges"}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pending" | "validated">("pending");
  const { address, isConnected, isConnecting } = useAccount();
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Check if connected wallet has miner or admin role
  const { data: hasMinerRole, isLoading: isLoadingMinerCheck } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasMinerRole",
    args: [address],
    enabled: isConnected,
  });

  const { data: isAdmin, isLoading: isLoadingAdminCheck } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
    args: [address],
    enabled: isConnected,
  });

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      // You might want to refetch both role checks here
      // For simplicity, we're just refetching miner role
      const { data } = await refetchMinerRole();
      if (!data) {
        notification.error("Still no access. Contact administrator.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      notification.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  const { refetch: refetchMinerRole } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasMinerRole",
    args: [address],
    enabled: false, // We'll call this manually
  });

  useEffect(() => {
    if (hasMinerRole || isAdmin) {
      const timer = setTimeout(() => {
        setIsDataLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasMinerRole, isAdmin]);

  // Loading state while checking roles
  if (isConnected && (isLoadingMinerCheck || isLoadingAdminCheck)) {
    return <FullPageLoader text="Checking access permissions..." />;
  }

  // Not connected state
  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  // No required role state
  if (isConnected && !hasMinerRole && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <AccessDeniedCard
          address={address || ""}
          isLoadingRefresh={isRefreshingAccess}
          onRefresh={handleRefreshAccess}
        />
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
      {isDataLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size={12} text="Loading minerals dashboard..." />
        </div>
      ) : (
        <>
          {/* the welcome message */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-0">
            <div className="flex flex-col">
              <p className="text-[24px] sm:text-[26px] md:text-[28px] font-bold m-0 leading-tight">Minerals</p>
              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
                Access detailed info about minerals
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button className="flex-1 md:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                <span className="flex items-center gap-2">
                  <h1 className="text-sm translate-y-[7px]">Download Report</h1>
                  <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
                </span>
              </button>

              <Link
                href={""}
                className="flex-1 md:flex-none bg-[#202634] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
              >
                <h1 className="translate-y-[4px]">Request a report</h1>
              </Link>

              <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
              </button>
            </div>
          </div>

          {/* the mineral activity */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch">
            <div className="w-full lg:w-2/3">
              <div className="h-full">
                <MineralActivity headerBg="#060910" footerBg="#060910" />
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="h-full">
                <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="w-full">
            <div className="bg-[#060910] rounded-2xl flex flex-col sm:flex-row items-center">
              <button
                onClick={() => setActiveTab("pending")}
                className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
                  activeTab === "pending" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                }`}
              >
                Pending Transactions (Waiting For Validation)
              </button>

              <div className="w-full h-[1px] sm:hidden bg-white my-1"></div>
              <button
                onClick={() => setActiveTab("validated")}
                className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
                  activeTab === "validated" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                }`}
              >
                Validated Transactions
              </button>
            </div>

            {/* Content based on active tab */}
            <div className="pt-4">
              {activeTab === "pending" ? (
                <div className="overflow-x-auto">
                  <MineralListTable minerals={mineralsList} title="Your Stored Mineral List" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <MineralListTable minerals={mineralsList} title="Your Stored Mineral List" />
                </div>
              )}
            </div>
          </div>

          {/* the other metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <RecentShipments
              shipments={shipments}
              onViewAll={() => console.log("View all shipments")}
              bgColor="bg-[#060910]"
            />

            <TopDemands
              demands={demands}
              onRefresh={() => console.log("Refresh demands")}
              onAddDemand={id => console.log("Add demand", id)}
              bgColor="bg-[#060910]"
            />

            <MineralReports
              reports={reports}
              onRefresh={() => console.log("Refresh reports")}
              onViewDetails={id => console.log("View report details", id)}
              bgColor="bg-[#060910]"
            />
          </div>
        </>
      )}
    </div>
  );
}
