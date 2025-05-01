"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Icon from "~~/components/dashboard/Icon";
import ManagementTable from "~~/components/dashboard/admin/ManagementTable";
import ProgressCardsSection from "~~/components/dashboard/admin/ProgressCardsSection";

const ActivitiesDemographicsCard = dynamic(() => import("~~/components/dashboard/admin/ActivitiesDemographicsCard"), {
  ssr: false,
});

const OverallActivitiesReviewCard = dynamic(() => import("~~/components/dashboard/admin/OverallActivitiesReviewCard"), {
  ssr: false,
});

const Page = () => {
  const router = useRouter();
  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] sm:text-[26px] md:text-[28px] font-bold m-0 leading-tight">Management</p>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
            Take action into your system
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button className="flex-1 md:flex-none bg-[#202634] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Download Performance Report</h1>
              <img src="/dashboard/icon_set/download.svg" alt="Add Auditor icon" className="w-4 h-4 font-bold top-2" />
            </span>
          </button>

          <button className="bg-[#202634] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>
      <div>
        <ProgressCardsSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 w-full mt-4 sm:mt-6">
        <ActivitiesDemographicsCard />
        <OverallActivitiesReviewCard />
      </div>
      <div>
        <ManagementTable />
      </div>
    </div>
  );
};

export default Page;
