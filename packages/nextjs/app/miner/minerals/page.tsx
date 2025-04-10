"use client";

import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import MineralActivity from "~~/components/dashboard/minerals/mineralActivity";
import MineralListTable from "~~/components/dashboard/minerals/mineralListTable/mineralList";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import Search from "~~/components/dashboard/search";

type Shipment = {
  id: string;
  mineralName: string;
  mineralImage: string;
  timeAgo: string;
  status: "in-transit" | "completed";
};

const mineralsList = [
  {
    id: 1,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 3000,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Sri Lanka",
    status: "Raw",
    purity: 75,
    image: "/dashboard/gold.jpeg",
  },
  {
    id: 2,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 200,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Mauritania",
    status: "In-factory",
    purity: 50,
    image: "/dashboard/cobalt.jpeg",
  },
  {
    id: 3,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 2500,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Faroe Islands",
    status: "Refined",
    purity: 75,
    image: "/dashboard/copper.jpeg",
  },
  {
    id: 4,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 305.5,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Kuwait",
    status: "In-transit",
    purity: 25,
    image: "/dashboard/gold.jpeg",
  },
  {
    id: 5,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 4000,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Italy",
    status: "Refined",
    purity: 75,
    image: "/dashboard/cobalt.jpeg",
  },
  {
    id: 6,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 4000,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Kuwait",
    status: "In-factory",
    purity: 50,
    image: "/dashboard/copper.jpeg",
  },
  {
    id: 7,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 4000,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Singapore",
    status: "In-transit",
    purity: 75,
    image: "/dashboard/gold.jpeg",
  },
  {
    id: 8,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 1500,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Brazil",
    status: "Raw",
    purity: 90,
    image: "/dashboard/cobalt.jpeg",
  },
  {
    id: 9,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 750,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Australia",
    status: "Refined",
    purity: 85,
    image: "/dashboard/copper.jpeg",
  },
  {
    id: 10,
    name: "mineral-name",
    code: "#ffff-eeee-dddd-3333",
    weight: 2200,
    weightUnit: "KG",
    lbsWeight: 34,
    origin: "Canada",
    status: "In-transit",
    purity: 60,
    image: "/dashboard/gold.jpeg",
  },
];

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
    </div>
  );
}
