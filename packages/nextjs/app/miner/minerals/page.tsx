"use client";

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
  return (
    <div className="px-10 flex flex-col gap-10">
      {/* the welcome message */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[28px] font-bold m-0 leading-tight">Minerals</p>
          <p className="text-[16px] text-[#979AA0] m-0 leading-tight">Access detailed info about minerals</p>
        </div>

        <div className="flex gap-1">
          <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Download Report</h1>
              <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
            </span>
          </button>

          <Link
            href={"/miner/registerMineral"}
            className="bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center"
          >
            <h1 className="translate-y-[4px]">Register Mineral</h1>
          </Link>

          <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* the mineral activity */}
      <div className="flex gap-5 w-full items-stretch">
        <div className="w-2/3">
          <div className="h-full">
            <MineralActivity />
          </div>
        </div>
        <div className="w-1/3">
          <div className="h-full">
            <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
          </div>
        </div>
      </div>

      {/* the history table */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3 justify-between">
          <div>
            <p className="text-[20px] font-bold m-0 leading-tight">Minerals History</p>
          </div>

          <div className="scale-90">
            <Search />
          </div>

          <div className="flex gap-2">
            <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-1 font-medium px-3 py-1 rounded-[6px] text-sm">
              <span className="flex items-center gap-1">
                <span>Download Report</span>
                <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" width={14} height={14} />
              </span>
            </button>

            <Link href={"#"} className="bg-red-500 gap-1 font-medium px-3 py-1 rounded-[6px] flex items-center text-sm">
              Clear history
            </Link>

            <button className="bg-[#252525] border border-[#323539] flex items-center justify-center px-2 py-1 rounded-[6px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* the table */}
        <MineralListTable minerals={mineralsList} />
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
