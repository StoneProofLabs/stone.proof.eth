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
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
      {/* the welcome message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] sm:text-[26px] md:text-[28px] font-bold m-0 leading-tight">Minerals Market</p>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
            Browse and purchase minerals
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Filter</h1>
              <Icon path="/dashboard/icon_set/filter.svg" alt="Filter icon" />
            </span>
          </button>

          <Link
            href={"/buyer/mineral-market"}
            className="flex-1 sm:flex-none bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center sm:justify-start"
          >
            <h1 className="translate-y-[4px]">View Market</h1>
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

      {/* the history table */}
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div>
            <p className="text-[18px] sm:text-[19px] md:text-[20px] font-bold m-0 leading-tight">Purchase History</p>
          </div>

          <div className="w-full sm:w-auto sm:scale-90">
            <Search />
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex-1 sm:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-1 font-medium px-3 py-1 rounded-[6px] text-sm">
              <span className="flex items-center gap-1">
                <span>Download History</span>
                <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" width={14} height={14} />
              </span>
            </button>

            <Link
              href={"#"}
              className="flex-1 sm:flex-none bg-red-500 gap-1 font-medium px-3 py-1 rounded-[6px] flex items-center justify-center text-sm"
            >
              Clear history
            </Link>

            <button className="bg-[#252525] border border-[#323539] flex items-center justify-center px-2 py-1 rounded-[6px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* the table */}
        <div className="overflow-x-auto">
          <MineralListTable minerals={mineralsList} />
        </div>
      </div>

      {/* the other metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
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
