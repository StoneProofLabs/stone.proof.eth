"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, Loader2, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { FaChartBar, FaRegCheckSquare, FaUser } from "react-icons/fa";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import AdminStatCard from "~~/components/dashboard/admin/AdminStatCard";
import AuditorTable from "~~/components/dashboard/admin/AuditorTable";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { mockAuditors } from "~~/data/data";
import { demands, mineralsList, reports, shipments } from "~~/data/data";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying admin permissions..." }: { text?: string }) => (
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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl p-4 sm:p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center flex flex-col items-center gap-5">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-700 rounded-full mx-auto">
              <ShieldAlert className="w-8 h-8 text-red-300" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-400 mt-3">Admin Privileges Required</h2>
            <p className="text-sm sm:text-base text-gray-300 mt-2">
              Your wallet doesn&apos;t have admin access permissions to view this dashboard.
            </p>
          </div>

          {/* Main content - switches from row to column on small screens */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 w-[100%] ">
            {/* Left section - miner privileges */}
            <div className="w-full lg:w-[50%] h-[100%] flex flex-col justify-between">
              <div className="bg-gray-700 p-3 sm:p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-400">Connected Wallet:</span>
                  <button onClick={copyAddress} className="text-blue-400 hover:text-blue-300" title="Copy address">
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <p className="font-mono text-xs sm:text-sm break-all text-left text-gray-200">{address}</p>
              </div>

              <div className="pt-4 space-y-3">
                <h3 className="font-medium text-white">How to get admin access:</h3>
                <ol className="space-y-2 text-xs sm:text-sm text-gray-300 text-left">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      1
                    </span>
                    Contact system owner
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      2
                    </span>
                    Request admin role assignment
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      3
                    </span>
                    Refresh this page after approval
                  </li>
                </ol>
              </div>
            </div>

            {/* Right section - contact administrators */}
            <div className="w-full lg:w-[40%] mt-4 lg:mt-0 lg:pt-0">
              <h3 className="font-medium text-white mb-3 sm:mb-4">Contact Administrators</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  {
                    name: "Admin Email",
                    value: "admin@stone.proof",
                    icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "mailto:admin@stone.proof?subject=Miner%20Access%20Request",
                  },
                  {
                    name: "Support Phone",
                    value: "+1 (555) 123-4567",
                    icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "tel:+15551234567",
                  },
                  {
                    name: "Telegram Support",
                    value: "@StoneProofSupport",
                    icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "https://t.me/StoneProofSupport",
                  },
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-xs"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full text-blue-300">
                        {contact.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="font-medium text-white truncate leading-tight text-xs sm:text-sm">{contact.name}</p>
                      <p className="text-xs text-gray-400 truncate leading-tight">{contact.value}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Refresh button */}
          <div className="w-full pt-2 sm:pt-4">
            <button
              onClick={onRefresh}
              disabled={isLoadingRefresh}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
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
        {isLoading ? "Verifying wallet..." : "Please connect a wallet with admin privileges"}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

const Page = () => {
  const router = useRouter();
  const { address, isConnected, isConnecting } = useAccount();
  const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Check if connected wallet is admin
  const {
    data: isAdmin,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
    args: [address],
    enabled: isConnected,
  });

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      const { data } = await refetchRoleCheck();
      if (!data) {
        notification.error("Still no admin access. Contact system owner.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      notification.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      const timer = setTimeout(() => {
        setIsDataLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAdmin]);

  // Loading state while checking roles
  if (isConnected && isLoadingRoleCheck) {
    return <FullPageLoader text="Checking admin permissions..." />;
  }

  // Not connected state
  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  // No admin role state
  if (isConnected && !isAdmin) {
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
    <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
      {isDataLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size={12} text="Loading auditors dashboard..." />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <div className="flex flex-col">
              <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Auditors</p>
              <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
                Access or info about registered Auditors
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                className="flex-1 md:flex-none bg-[#202634] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]"
                onClick={() => router.push("/admin/auditors/register")}
              >
                <span className="flex items-center gap-2">
                  <h1 className="text-sm translate-y-[7px]">Add Auditor</h1>
                  <img src="/dashboard/icon_set/add.svg" alt="Add Auditor icon" className="w-4 h-4 font-bold top-2" />
                </span>
              </button>

              <button className="bg-[#202634] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <AdminStatCard
              icon={<FaUser size={24} color="#fff" />}
              iconBg="#22c55e"
              title="Total Auditors"
              value="1,234"
              buttonText="View"
              cardBg="#060910"
              onButtonClick={() => router.push("/admin/auditors/total")}
            />
            <AdminStatCard
              icon={<FaChartBar size={24} color="#fff" />}
              iconBg="#2563eb"
              title="Active"
              value="56"
              cardBg="#060910"
              buttonText="View"
              onButtonClick={() => router.push("/admin/auditors/active")}
            />
            <AdminStatCard
              icon={<FaRegCheckSquare size={24} color="#fff" />}
              iconBg="#ef4444"
              title="Inactive"
              value="12"
              cardBg="#060910"
              buttonText="View"
              onButtonClick={() => router.push("/admin/auditors/inactive")}
            />
          </div>

          <div className="w-full mt-4">
            <div className="bg-[#060910] rounded-2xl flex flex-row items-center">
              <button
                onClick={() => setActiveTab("active")}
                className={`flex-1 py-2 px-3 text-base transition-colors ${
                  activeTab === "active" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab("inactive")}
                className={`flex-1 py-2 px-3 text-base transition-colors ${
                  activeTab === "inactive" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
          <AuditorTable
            tableTitle={activeTab === "active" ? "Registered Auditors" : "Inactive Auditors"}
            data={mockAuditors}
            currentTab={activeTab}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
};

export default Page;
