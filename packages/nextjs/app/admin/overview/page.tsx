"use client";

import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import NetworkTransactionsGraph from "~~/components/dashboard/admin/NetworkTransactionsGraph";
import StatsSection from "~~/components/dashboard/admin/StatsSection";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { shipments } from "~~/data/data";
import { reports } from "~~/data/data";
import { demands } from "~~/data/data";

interface User {
  name: string;
}

// sample user
const user: User = {
  name: "Super Admin",
};

const stats = {
  totalTransactions: 157,
  completedTransactions: 124,
  pendingTransactions: 33,
  disputes: 4,
  percentageChanges: {
    total: 12,
    completed: 8,
    pending: -5,
    disputes: 2,
  },
};

export default function AdminOverviewPage() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8">
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col">
            <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
            <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">
              Welcome back, we&apos;re happy to have you here!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <span className="flex items-center gap-2">
                <h1 className="text-sm translate-y-[7px]">Download Report</h1>
                <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
              </span>
            </button>

            <Link
              href={"/admin/minerals"}
              className="w-full sm:w-auto bg-[#202634] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center"
            >
              <h1 className="translate-y-[4px]">View Minerals</h1>
            </Link>

            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <StatsSection stats={stats} />
      </div>

      <div className="w-full">
        <NetworkTransactionsGraph />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
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
    </div>
  );
}
