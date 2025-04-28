"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import NotificationCard from "~~/components/dashboard/notifications/notificationCard";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import StatsCard from "~~/components/dashboard/overview/statsCard";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import Search from "~~/components/dashboard/search";
import { demands, mineralsData, notifications, reports, shipments, shipmentsData, transfersData } from "~~/data/data";

export default function Page() {
  const [notification, setNotifications] = useState(notifications);
  const handleClose = (id: number) => {
    setNotifications(
      notification.map(
        (note: {
          id: number;
          type: "error" | "success" | "warning" | "info";
          title: string;
          message: string;
          visible: boolean;
        }) => (note.id === id ? { ...note, visible: false } : note),
      ),
    );
  };

  const loadPrevious = () => {
    console.log("Loading previous notifications");
    // fetch more notifications
  };

  return (
    <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
      {/* the welcome message */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Notifications</p>
          <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">Realtime blockchain updates</p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-1">
          <button className="flex-1 md:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Download Report</h1>
              <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
            </span>
          </button>

          <Link
            href={"#"}
            className="flex-1 md:flex-none bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
          >
            <h1 className="translate-y-[4px]">Update Mineral</h1>
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
            title="Total Actions today"
            value="3405"
            tagName="Shipments"
            chartData={mineralsData}
            color="blue"
            tagLabel="Top actions"
          />

          <StatsCard
            title="Succeeded contracts"
            value="27"
            tagName="Refining"
            chartData={transfersData}
            color="green"
            tagLabel="Top contracts"
          />

          <StatsCard
            title="Total issues"
            value="27"
            tagName="Impurities"
            chartData={shipmentsData}
            color="red"
            tagLabel="Top issues"
          />
        </div>
      </div>

      {/* the notifications */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
          <div>
            <p className="text-[18px] md:text-[20px] font-bold m-0 leading-tight">Minerals History</p>
          </div>

          <div className="w-full md:w-auto md:scale-90">
            <Search />
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex-1 md:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-1 font-medium px-3 py-1 rounded-[6px] text-sm">
              <span className="flex items-center gap-1">
                <span>Download Report</span>
                <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" width={14} height={14} />
              </span>
            </button>

            <Link
              href={"#"}
              className="flex-1 md:flex-none bg-red-500 gap-1 font-medium px-3 py-1 rounded-[6px] flex items-center justify-center text-sm"
            >
              Clear history
            </Link>

            <button className="bg-[#252525] border border-[#323539] flex items-center justify-center px-2 py-1 rounded-[6px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" width={14} height={14} />
            </button>
          </div>
        </div>

        {/* the notifications */}
        <div className="p-4 min-h-screen">
          {notification
            .filter(note => note.visible)
            .map(note => (
              <NotificationCard
                key={note.id}
                type={note.type}
                title={note.title}
                message={note.message}
                onClose={() => handleClose(note.id)}
                onShowMore={() => console.log(`Showing more details for notification ${note.id}`)}
              />
            ))}

          <div className="flex justify-center mt-4">
            <button
              onClick={loadPrevious}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-4 rounded flex items-center"
            >
              Load Previous
              <Icon path="/dashboard/icon_set/menu.svg" alt="Load previous icon" />
            </button>
          </div>
        </div>
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
