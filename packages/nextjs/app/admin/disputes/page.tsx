"use client";

import React from "react";
import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import MineralDisputesGraphCard from "~~/components/dashboard/admin/MineralDisputesGraphCard";
import RecentDisputesCard from "~~/components/dashboard/admin/RecentDisputesCard";

const Page = () => {
  return (
    <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
     
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Disputes Resolution</p>
          <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
            View All On-going Disputes in the network
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <button className="flex-1 md:flex-none bg-[#202634] border border-[#202634] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Ongoing Disputes</h1>
              <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
            </span>
          </button>

          <Link
            href={"/admin/disputes"}
            className="flex-1 md:flex-none bg-[#E33B32] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
          >
            <h1 className="translate-y-[4px]">Raise Dispute</h1>
          </Link>

          <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex-1 min-w-0">
          <MineralDisputesGraphCard />
        </div>
        <div className="w-full lg:w-[340px] flex-shrink-0">
          <RecentDisputesCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
