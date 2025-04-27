'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChartBar, FaRegCheckSquare, FaUser } from "react-icons/fa";
import Icon from "~~/components/dashboard/Icon";
import AdminStatCard from "~~/components/dashboard/admin/AdminStatCard";
import RefineryTable from "~~/components/dashboard/admin/RefineryTable";
import { refineryList } from "~~/data/data";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, mineralsList, reports, shipments } from "~~/data/data";


const Page = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "validated">("pending");
  const router = useRouter();
  return (
    <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
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
          onButtonClick={() => router.push("/admin/frozen-refineries")}
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
      <div className="w-full">
        <div className="bg-[#060910] rounded-2xl flex flex-col sm:flex-row items-center">
          <button
            onClick={() => setActiveTab("pending")}
            className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
              activeTab === "pending" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
            }`}
          >
            Active Mining Refineries
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
      <RefineryTable data={refineryList} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")}
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
};

export default Page;
