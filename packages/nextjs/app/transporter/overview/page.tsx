"use client";

import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import LocationMap from "~~/components/dashboard/transporter/MapSection";
import StatsSection from "~~/components/dashboard/transporter/StatsSection";
import TransportRequestsTable from "~~/components/dashboard/transporter/TransfersTable";

// dummy user
interface User {
  name: string;
}

// sample user
const user: User = {
  name: "Transporter",
};

const stats = {
  totalTrips: 157,
  completed: 124,
  pendingTransfers: 33,
  declined: 4,
  percentageChanges: {
    total: 12,
    completed: 8,
    pending: -5,
    declined: 2,
  },
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
      {/* the welcome message */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
          <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">
            Welcome back, we&apos;re happy to have you here!
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-1">
          <Link
            href={"/transporter/transferMineral"}
            className="w-full sm:w-auto bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center"
          >
            <h1 className="translate-y-[4px]">Transfer Mineral</h1>
          </Link>

          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* the stats cards */}
      <div>
        <StatsSection stats={stats} />
      </div>

      {/* transports requests table */}
      <TransportRequestsTable />

      {/* the map */}
      <LocationMap />
    </div>
  );
}
