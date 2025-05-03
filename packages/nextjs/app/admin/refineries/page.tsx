"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChartBar, FaRegCheckSquare, FaUser } from "react-icons/fa";
import { useAccount } from "wagmi";
import { ShieldAlert, Copy, Loader2 } from "lucide-react";

import Icon from "~~/components/dashboard/Icon";
import AdminStatCard from "~~/components/dashboard/admin/AdminStatCard";
import RefineryTable from "~~/components/dashboard/admin/RefineryTable";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";

import { refineryList, demands, reports, shipments } from "~~/data/data";
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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto">
          <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-300" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Restricted</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your wallet doesn't have the required permissions to view this page.
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
              Request refiner or admin role assignment
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                3
              </span>
              Refresh this page after approval
            </li>
          </ol>
        </div>

        <div className="mt-6">
          <button
            onClick={onRefresh}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={isLoadingRefresh}
          >
            {isLoadingRefresh ? "Refreshing..." : "Refresh Access"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "validated">("pending");
  const router = useRouter();
  const { address } = useAccount();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: hasAccess, isLoading, refetch } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
    args: [address],
  });

  if (isLoading) return <FullPageLoader />;

  if (!hasAccess) {
    return (
      <AccessDeniedCard
        address={address ?? "Not connected"}
        isLoadingRefresh={isRefreshing}
        onRefresh={() => {
          setIsRefreshing(true);
          refetch().finally(() => setIsRefreshing(false));
        }}
      />
    );
  }

  return (
    <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
      {/* === Heading + Buttons === */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Refining Companies</p>
          <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
            Access or info about registered Refining Companies
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button className="flex-1 md:flex-none bg-[#202634] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Download Report</h1>
              <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
            </span>
          </button>

          <button className="bg-[#202634] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* === Stats === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <AdminStatCard
          icon={<FaUser size={24} color="#fff" />}
          iconBg="#22c55e"
          title="Total Refiners"
          value="1,234"
          buttonText="View"
          cardBg="#060910"
          onButtonClick={() => router.push("/admin/refineries")}
        />
        <AdminStatCard
          icon={<FaChartBar size={24} color="#fff" />}
          iconBg="#2563eb"
          title="Frozen Refineries"
          value="56"
          cardBg="#060910"
          buttonText="View"
          onButtonClick={() => router.push("/admin/refineries/frozen")}
        />
        <AdminStatCard
          icon={<FaRegCheckSquare size={24} color="#fff" />}
          iconBg="#ef4444"
          title="Pending Approvals"
          value="12"
          cardBg="#060910"
          buttonText="View"
          onButtonClick={() => router.push("/admin/refineries/approvals")}
        />
      </div>

      {/* === Tabs === */}
      <div className="w-full">
        <div className="bg-[#060910] rounded-2xl flex flex-col sm:flex-row items-center">
          <button
            onClick={() => setActiveTab("pending")}
            className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
              activeTab === "pending" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
            }`}
          >
            Active Refining Enterprises
          </button>
          <div className="w-full h-[1px] sm:hidden bg-white my-1"></div>
          <button
            onClick={() => setActiveTab("validated")}
            className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
              activeTab === "validated" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
            }`}
          >
            Waiting for Approval
          </button>
        </div>
      </div>

      {/* === Table === */}
      <RefineryTable
        data={refineryList}
        showActions={activeTab === "validated"}
        tableTitle={activeTab === "validated" ? "Pending Refining Requests" : undefined}
      />

      {/* === Bottom Grid === */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <RecentShipments shipments={shipments} onViewAll={() => {}} bgColor="bg-[#060910]" />
        <TopDemands demands={demands} onRefresh={() => {}} onAddDemand={() => {}} bgColor="bg-[#060910]" />
        <MineralReports reports={reports} onRefresh={() => {}} onViewDetails={() => {}} bgColor="bg-[#060910]" />
      </div>
    </div>
  );
};

export default Page;
