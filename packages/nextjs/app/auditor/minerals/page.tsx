"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import MineralActivity from "~~/components/dashboard/minerals/mineralActivity";
import MineralListTable from "~~/components/dashboard/minerals/mineralListTable/mineralList";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import Search from "~~/components/dashboard/search";
import { demands, mineralsList, reports, shipments } from "~~/data/data";

export type Shipment = {
  id: string;
  mineralName: string;
  mineralImage: string;
  timeAgo: string;
  status: "in-transit" | "completed";
};

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pending" | "validated">("pending");

  return (
    <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
      {/* the welcome message */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Minerals</p>
          <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
            Access detailed info about minerals
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button className="flex-1 md:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Download Report</h1>
              <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
            </span>
          </button>

          <Link
            href={"/miner/registerMineral"}
            className="flex-1 md:flex-none bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
          >
            <h1 className="translate-y-[4px]">View Pending Transactions</h1>
          </Link>

          <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* the mineral activity */}
      <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">
        <div className="w-full lg:w-2/3">
          <div className="h-full">
            <MineralActivity />
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
        <div className="bg-[#252525] rounded-2xl flex items-center">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 py-3 px-6 text-lg transition-colors ${
              activeTab === "pending" ? "text-white font-semibold" : "text-[#71727A]"
            }`}
          >
            Pending Transactions (Waiting For Validation)
          </button>
          <div className="w-[3px] h-4 bg-white"></div>
          <button
            onClick={() => setActiveTab("validated")}
            className={`flex-1 py-3 px-6 text-lg transition-colors ${
              activeTab === "validated" ? "text-white font-semibold" : "text-[#71727A]"
            }`}
          >
            Validated Transactions
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="pt-4">
          {activeTab === "pending" ? (
            <div className="overflow-x-auto">
              <MineralListTable minerals={mineralsList} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <MineralListTable minerals={mineralsList} />
            </div>
          )}
        </div>
      </div>

      {/* the other metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
