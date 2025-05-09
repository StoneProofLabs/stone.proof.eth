"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChartBar } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Icon from "~~/components/dashboard/Icon";
import AdminStatCard from "~~/components/dashboard/admin/AdminStatCard";
import TransactionTable from "~~/components/dashboard/buyer/recentPurchasesTable";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, reports, sampleTransactions, shipments } from "~~/data/data";

// dummy user
interface User {
  name: string;
}

const user: User = {
  name: "Buyer",
};

const Page = () => {
  const router = useRouter();
  return (
    <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
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
            href={"/buyer/buyMineral"}
            className="flex-1 md:flex-none bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
          >
            <h1 className="translate-y-[4px]">Buy Mineral</h1>
          </Link>

          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <AdminStatCard
          icon={<FaUser size={24} color="#fff" />}
          iconBg="#22c55e"
          title="Total Purchases"
          value="2,345"
          buttonText="View"
          cardBg="#060910"
          onButtonClick={() => router.push("/admin/miners")}
        />
        <AdminStatCard
          icon={<FaChartBar size={24} color="#fff" />}
          iconBg="#2563eb"
          title="In-transit"
          value="203"
          cardBg="#060910"
          buttonText="View"
          onButtonClick={() => router.push("/admin/frozen-mines")}
        />
        <AdminStatCard
          icon={<FaRegCheckSquare size={24} color="#fff" />}
          iconBg="#ef4444"
          title="Failed Purchases"
          value="21"
          cardBg="#060910"
          buttonText="View"
          onButtonClick={() => router.push("/admin/approvals")}
        />
      </div>

      {/* recent purchases */}
      <TransactionTable transactions={sampleTransactions} />

      {/* the other metric cards */}
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
};

export default Page;
