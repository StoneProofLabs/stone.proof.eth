"use client";

import { Inter } from "next/font/google";
import Sidebar from "~~/components/dashboard/Sidebar";
import TopBar from "~~/components/dashboard/topBar";
import { useSidebarStore } from "~~/stores/useSidebarStore";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sidebarItems = getSidebarItems("/auditor");

export default function AuditorLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className={`${inter.variable} font-sans bg-lightBlack flex text-white h-screen`}>
      <Sidebar basePath="/auditor" />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${!isCollapsed ? "md:ml-[300px]" : ""}`}
      >
        <TopBar sidebarItems={sidebarItems} basePath="/auditor" />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}
