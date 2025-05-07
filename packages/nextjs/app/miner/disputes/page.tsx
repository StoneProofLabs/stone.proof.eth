"use client";

import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import Link from "next/link";

import Icon from "~~/components/dashboard/Icon";
import MineralDisputesGraph from "~~/components/dashboard/disputes/mineralDisputesVariationGraph";
import { NotificationList } from "~~/components/dashboard/disputes/recentActivities";
import MineralActivity from "~~/components/dashboard/minerals/mineralActivity";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import Search from "~~/components/dashboard/search";
import { demands, mineralDisputesData, mockDisputes, myNotifications, reports, shipments } from "~~/data/data";


export default function Page() {
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);

  const onRefresh = () => {
    setIsLoadingRefresh(true);
    // Simulating an API call or data refresh
    setTimeout(() => {
      setIsLoadingRefresh(false);
    }, 1500);

import toast from "react-hot-toast";
import console from "console";



const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="text-white min-h-screen flex items-center justify-center">
    <div className="text-center max-w-md p-6 bg-gray-800 rounded-xl border border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">{isLoading ? "Connecting..." : "Wallet Not Connected"}</h2>
      <p className="text-gray-400 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect your wallet to raise disputes"}
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
    <div className="px-4 sm:px-10 flex flex-col gap-10">
      {/* the welcome message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Disputes resolutions</p>
          <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">

            View all On-goint disputes in the network
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-1">
          <Link
            href={"/refiner/disputes/raiseDispute"}
            className="w-full sm:w-auto bg-red-600 gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center sm:justify-start"
          >
            <h1 className="translate-y-[4px]">Raise Dispute</h1>
          </Link>

          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* the mineral activity */}
      <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">
        <div className="w-full lg:w-2/3">
          <div className="h-full">
            <MineralDisputesGraph data={mineralDisputesData} />
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="h-full">
            <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
          </div>
        </div>
      </div>

      {/* the notifications */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div>
            <p className="text-[18px] sm:text-[20px] font-bold m-0 leading-tight">Recent Disputes in your network</p>
          </div>


        <div className="flex flex-wrap gap-2 sm:gap-1">
          <Link
            href={"/miner/disputes/raiseDispute"}
            className="w-full sm:w-auto bg-red-600 gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center sm:justify-start"
          >
            <h1 className="translate-y-[4px]">Raise Dispute</h1>
          </Link>

          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* the mineral activity */}
      <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">
        <div className="w-full lg:w-2/3">
          <div className="h-full">
            <MineralDisputesGraph data={mineralDisputesData} />
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="h-full">
            <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
          </div>
        </div>
      </div>


      {/* the notifications */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div>
            <p className="text-[18px] sm:text-[20px] font-bold m-0 leading-tight">Recent Disputes in your network</p>
          </div>

              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                  2
                </span>
                <div>
                  <p>Request miner role assignment through:</p>
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


          <div className="w-full sm:w-auto scale-90 origin-left sm:origin-center">
            <Search />
          </div>

          {/* Refresh Button */}
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
                  Check Access Again
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* the table */}
        <NotificationList baseUrl="miner" notifications={mockDisputes} />
      </div>

      {/* the other metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />

        <TopDemands
          demands={demands}
          onRefresh={() => console.log("Refresh demands")}
          onAddDemand={id => console.log("Add demand", id)}
        />

        <MineralReports
          reports={reports}
          onRefresh={() => console.log("Refresh reports")}
          onViewDetails={id => console.log("View report details", id)}
        />
      </div>
    </div>
  );
};

export default function RaiseDisputePage() {
  const { address, isConnected, isConnecting } = useAccount();
  const [disputeTitle, setDisputeTitle] = useState("");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [mineralId, setMineralId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

  // Check if user has miner role
  const {
    data: hasMinerRole,
    isLoading: isRoleLoading,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasMinerRole",
    args: [address],
    enabled: isConnected,
  });

  const allFieldsReady = isConnected && hasMinerRole && disputeTitle && disputeDescription && mineralId;

  const { writeAsync, isLoading: isRaisingDispute } = useScaffoldContract({
    contractName: "DisputeResolution",
    functionName: "raiseDispute",
    args: [mineralId, disputeTitle, disputeDescription],
    enabled: allFieldsReady,
    onSuccess: (disputeId: string) => {
      toast.success(`Dispute raised successfully! Dispute ID: ${disputeId}`);
      // Reset form after successful submission
      setDisputeTitle("");
      setDisputeDescription("");
      setMineralId("");
    },
    onError: (error: { message: string | string[] }) => {
      console.error("Dispute raising failed:", error);
      let errorMessage = "Failed to raise dispute.";

      if (error.message.includes("caller is missing role")) {
        errorMessage = "Your account doesn't have miner privileges";
      } else if (error.message.includes("DisputeManager__InvalidMineralId")) {
        errorMessage = "Invalid mineral ID provided";
      }

      toast.error(errorMessage);
    },
  });

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      const { data } = await refetchRoleCheck();
      if (!data) {
        toast.error("Still no miner access. Contact administrator.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      toast.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  const handleSubmitDispute = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet.");
      return;
    }

    if (!hasMinerRole) {
      toast.error("Your account doesn't have miner privileges.");
      return;
    }

    if (!allFieldsReady) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    try {
      setIsSubmitting(true);
      if (writeAsync) {
        const tx = await writeAsync();
        console.log("Transaction submitted:", tx.hash);
        toast.info("Transaction submitted. Waiting for confirmation...");
      }
    } catch (err: any) {
      console.error("Error calling write function:", err);
      let errorMessage = "An unexpected error occurred.";

      if (err.message.includes("user rejected transaction")) {
        errorMessage = "Transaction was rejected";
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking roles
  if (isConnected && isRoleLoading) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <LoadingSpinner size={12} text="Checking access permissions..." />

      </div>

      {/* the other metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />

        <TopDemands
          demands={demands}
          onRefresh={() => console.log("Refresh demands")}
          onAddDemand={id => console.log("Add demand", id)}
        />

        <MineralReports
          reports={reports}
          onRefresh={() => console.log("Refresh reports")}
          onViewDetails={id => console.log("View report details", id)}
        />
      </div>
    </div>
  );
}
