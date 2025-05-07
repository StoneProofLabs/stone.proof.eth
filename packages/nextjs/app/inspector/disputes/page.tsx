"use client";


import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import { NotificationList } from "~~/components/dashboard/disputes/recentActivities";
import MineralDisputesGraphCard from "~~/components/dashboard/admin/MineralDisputesGraphCard";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import Search from "~~/components/dashboard/search";
import { demands, mockDisputes, reports, shipments } from "~~/data/data";

export default function Page() {
  return (
    <div className="px-4 sm:px-10 flex flex-col gap-10">
      {/* the welcome message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Activity</p>
          <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">
            View Your Activities & Blockchain Activities here
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-1">
        <Link
            href={"/inspector/disputes"}
            className="w-full sm:w-auto bg-[#252525] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center sm:justify-start"
          >
            <h1 className="translate-y-[4px]">Ongoing Disputes</h1>
          </Link>
          <Link
            href={"/inspector/disputes/raiseDispute"}
            className="w-full sm:w-auto bg-red-600 gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center sm:justify-start"
          >
            <h1 className="translate-y-[4px]">Raise Dispute</h1>
          </Link>
         

import { useState } from "react";
import Image from "next/image";
import { Clock, Copy, FileText, Minus, Plus } from "lucide-react";

export default function DisputeResolutionsPortal() {
  const [voteCount, setVoteCount] = useState(0);

  const handleVoteChange = (value: number) => {
    const newValue = Math.max(0, value);
    setVoteCount(newValue);
  };


          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>


      {/* the mineral activity */}
      <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">
        <div className="w-full lg:w-2/3">
          <div className="h-full">
            <MineralDisputesGraphCard />
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="h-full">
            <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
          </div>
        </div>
      </div>

      {/* the notifications */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div>
            <p className="text-[18px] sm:text-[20px] font-bold m-0 leading-tight">Recent Disputes in your network</p>
          </div>

          <div className="w-full sm:w-auto scale-90 origin-left sm:origin-center">
            <Search />
          </div>

          <div className="flex w-full sm:w-auto gap-2">
            <Link
              href={"#"}
              className="w-full sm:w-auto bg-red-500 gap-1 font-medium px-3 py-1 rounded-[6px] flex items-center justify-center text-sm"
            >
              Clear Activities
            </Link>

            <button className="bg-[#252525] border border-[#323539] flex items-center justify-center px-2 py-1 rounded-[6px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" width={14} height={14} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Dispute Details */}
        <div className=" border-2 border-[#323539] rounded-lg p-2 lg:col-span-2">
          <div className="lg:col-span-2 bg-[#1c1c1e] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-xl">
                <Image width={30} height={30} alt="" src="/dashboard/cobalt.png" />
              </div>
              <div className="font-medium text-lg">Cobalt</div>
              <div className="text-sm text-gray-400">[ 23/05/2025 - 23/05/2025 ]</div>
            </div>

            <div className="mb-4">
              <div className="text-sm mb-1">Purity Level:</div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-[#0A77FF] w-[30%]"></div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4 py-3">
                <div className="text-gray-400">Quantity :</div>
                <div className="font-medium text-white">50 Tons</div>
              </div>

              <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4  py-3">
                <div className="text-gray-400">Mineral ID</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white">#0xffed-ecd3-3...</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4 py-3">
                <div className="text-gray-400">Post count</div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white">400</span>
                  <span className="text-sm text-gray-400">Total Votes</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4 py-3">
                <div className="text-gray-400">Time left:</div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white font-mono">2:34:00</span>
                  <Clock size={20} className="text-white" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Dispute Details</h3>
              <div className="bg-[#252525] rounded-md p-4 text-sm">
                <p className="mb-4">
                  Company XYZ failed to deliver 500 metric tons of refined cobalt as per the contract dated March 10,
                  2025. Despite follow-ups, no shipment or valid justification has been provided, causing financial loss
                  and production delays.
                </p>
                <p className="font-medium mb-2">Supporting evidence:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Contract agreement (PDF)</li>
                  <li>Email correspondence</li>
                  <li>Warehouse inventory report</li>
                </ol>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 bg-[#252525] rounded-md p-3">
                <FileText size={20} className="text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Document.pdf</div>
                  <div className="text-xs text-gray-400">3.4 MB</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#252525] rounded-md p-3">
                <FileText size={20} className="text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Evidence.jpg</div>
                  <div className="text-xs text-gray-400">1.2 MB</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Voting */}
        <div className="lg:col-span-1">
          <div className="bg-[#1c1c1e] rounded-lg p-6 h-full">
            <h3 className="text-lg font-medium mb-4">Cast Your Vote</h3>

            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Select your position:</div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#252525] hover:bg-[#323539] border border-[#323539] rounded-md py-2 px-4 text-sm font-medium">
                  Support Claimant
                </button>
                <button className="bg-[#252525] hover:bg-[#323539] border border-[#323539] rounded-md py-2 px-4 text-sm font-medium">
                  Support Respondent
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Voting power:</div>
              <div className="bg-[#252525] border border-[#323539] rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{voteCount}</span>
                  <span className="text-sm text-gray-400">votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVoteChange(voteCount - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-[#323539] hover:bg-gray-600 rounded-md"
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={() => handleVoteChange(voteCount + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-[#323539] hover:bg-gray-600 rounded-md"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-400 mb-2">Add comment (optional):</div>
              <textarea
                className="w-full bg-[#252525] border border-[#323539] rounded-md p-3 text-sm min-h-[100px] focus:outline-none focus:border-[#0A77FF]"
                placeholder="Enter your reasoning..."
              ></textarea>
            </div>

            <button className="w-full bg-[#0A77FF] hover:bg-blue-600 text-white font-medium py-2 rounded-md">
              Submit Vote

            </button>
          </div>
        </div>

        {/* the table */}
        <NotificationList baseUrl="inspector" notifications={mockDisputes} />
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
