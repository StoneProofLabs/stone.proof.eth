"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import MineralSupplyGraph from "~~/components/dashboard/overview/mineralSupply";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import StatsCard from "~~/components/dashboard/overview/statsCard";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, mineralsData, reports, shipments, shipmentsData, supplyData, transfersData } from "~~/data/data";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ text = "Loading miner data..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
    <Loader2 className="w-12 h-12 animate-spin" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

export default function MinerOverviewPage() {
  const { address, isConnected } = useAccount();
  const [isDataLoading, setIsDataLoading] = useState(true);

  // COMMENTED OUT: Original role check (kept for reference)
  // const {
  //   data: hasMinerRole,
  //   isLoading: isLoadingRoleCheck,
  //   refetch: refetchRoleCheck,
  // } = useScaffoldReadContract({
  //   contractName: "RolesManager",
  //   functionName: "hasMinerRole",
  //   args: [address],
  //   /*enabled: isConnected*/
  // });

  // COMMENTED OUT: Original refresh access logic (kept for reference)
  // const handleRefreshAccess = async () => {
  //   try {
  //     await refetchRoleCheck();
  //   } catch (e) {
  //     console.error("Error refreshing access:", e);
  //     notification.error("Error checking miner permissions");
  //   }
  // };

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1500); // Reduced loading time
    return () => clearTimeout(timer);
  }, []);

  // MODIFIED: Simplified loading state
  if (isDataLoading) {
    return <LoadingSpinner text="Loading miner dashboard..." />;
  }

  // Sample user data (would normally come from your backend)
  const user = {
    name: "Miner",
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
      {/* Welcome message */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
          <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">
            Welcome back, we&apos;re happy to have you here!
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-1">
          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Download Report</h1>
              <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
            </span>
          </button>

          <Link
            href={"/miner/minerals/registerMineral"}
            className="w-full sm:w-auto bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center"
          >
            <h1 className="translate-y-[4px]">Register Mineral</h1>
          </Link>

          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* Stats cards with loading states */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatsCard
            title="Total Minerals Supplied"
            value="30"
            tagName="Coltan"
            chartData={mineralsData}
            color="blue"
          />

          <StatsCard title="Completed Transfers" value="27" tagName="Gold" chartData={transfersData} color="green" />

          <StatsCard title="Active Shipments" value="27" tagName="Copper" chartData={shipmentsData} color="red" />
        </div>
      </div>

      {/* Mineral supply graph */}
      <div className="w-full overflow-x-auto">
        <MineralSupplyGraph data={supplyData} />
      </div>

      {/* Other metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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