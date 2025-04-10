"use client";

import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import MineralSupplyGraph from "~~/components/dashboard/overview/mineralSupply";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import StatsCard from "~~/components/dashboard/overview/statsCard";
import TopDemands from "~~/components/dashboard/overview/topDemands";

// dummy user
interface User {
  name: string;
}

// sample user
const user: User = {
  name: "Brian Ford",
};

// some dummy chart data
const mineralsData = [
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 80 },
  { value: 100 },
  { value: 90 },
  { value: 70 },
  { value: 60 },
  { value: 80 },
  { value: 70 },
];

const transfersData = [
  { value: 30 },
  { value: 40 },
  { value: 60 },
  { value: 90 },
  { value: 100 },
  { value: 90 },
  { value: 80 },
  { value: 60 },
  { value: 70 },
  { value: 60 },
];

const shipmentsData = [
  { value: 40 },
  { value: 50 },
  { value: 70 },
  { value: 90 },
  { value: 100 },
  { value: 80 },
  { value: 60 },
  { value: 70 },
  { value: 80 },
  { value: 70 },
];
// dummy graphdata
const supplyData = [
  { month: "Apr", completed: 18000, inTransit: 0 },
  { month: "May", completed: 14000, inTransit: 0 },
  { month: "Jun", completed: 22000, inTransit: 0 },
  { month: "Jul", completed: 25000, inTransit: 0 },
  { month: "Aug", completed: 11000, inTransit: 0 },
  { month: "Sep", completed: 30000, inTransit: 0 },
  { month: "Oct", completed: 25000, inTransit: 0 },
  { month: "Nov", completed: 17000, inTransit: 0 },
  { month: "Dec", completed: 22000, inTransit: 0 },
  { month: "Jan", completed: 20000, inTransit: 0 },
  { month: "Feb", completed: 15000, inTransit: 0 },
  { month: "Mar", completed: 30000, inTransit: 0 },
];

type Shipment = {
  id: string;
  mineralName: string;
  mineralImage: string;
  timeAgo: string;
  status: "in-transit" | "completed";
};

const shipments: Shipment[] = [
  {
    id: "1",
    mineralName: "Gold",
    mineralImage: "/dashboard/gold.jpeg",
    timeAgo: "16 hrs ago",
    status: "in-transit",
  },
  {
    id: "2",
    mineralName: "Cobalt",
    mineralImage: "/dashboard/cobalt.jpeg",
    timeAgo: "3 days ago",
    status: "completed",
  },
  {
    id: "3",
    mineralName: "Copper",
    mineralImage: "/dashboard/copper.jpeg",
    timeAgo: "2 weeks ago",
    status: "completed",
  },
];

// Sample data for top demands
const demands = [
  {
    id: "1",
    mineralName: "Cobalt",
    date: "Jan 23 2023",
    icon: "/dashboard/cobalt.jpeg",
  },
  {
    id: "2",
    mineralName: "Coltan",
    date: "Jun 15 2023",
    icon: "/dashboard/copper.jpeg",
  },
  {
    id: "3",
    mineralName: "Gold",
    date: "Jan 15 2023",
    icon: "/dashboard/gold.jpeg",
  },
];

// Sample data for mineral reports
const reports = [
  {
    id: "1",
    title: "Impurity Conflict",
    mineral: "Gold",
    date: "20/4/2025",
  },
  {
    id: "2",
    title: "Incomplete Quantity",
    mineral: "Iron",
    date: "20/4/2025",
  },
  {
    id: "3",
    title: "Impurity Conflict",
    mineral: "Coltan",
    date: "20/4/2025",
  },
];

export default function Page() {
  return (
    <div className="px-10 flex flex-col gap-10">
      {/* the welcome message */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
          <p className="text-[16px] text-[#979AA0] m-0 leading-tight">
            Welcome back, we&apos;re happy to have you here!
          </p>
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

      {/* the stats cards */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* the mineral supply graph */}
      <MineralSupplyGraph data={supplyData} />

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
