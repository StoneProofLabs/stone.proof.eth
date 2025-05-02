"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import StoneProof from "../logo/Stoneproof";
import Icon from "./Icon";
import Search from "./search";
import SubscriptionCard from "./subscriptionCard";
import { useSidebarStore } from "~~/stores/useSidebarStore";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";

interface SidebarProps {
  basePath: string;
}

export default function Sidebar({ basePath }: SidebarProps) {
  const pathname = usePathname();

  // Common items for all roles
  const sidebarItems = getSidebarItems(basePath);

  // Check if item is active
  const isActive = (itemPath: string) => {
    return pathname === itemPath;
  };

  const { isCollapsed } = useSidebarStore();

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => useSidebarStore.getState().toggleSidebar()}
        />
      )}
      <div
        className={`bg-darkBlack min-h-screen flex flex-col gap-10 transition-all duration-300 ease-in-out fixed left-0 top-0 h-full z-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isCollapsed ? "w-0 overflow-hidden" : "w-[85vw] md:w-[20vw] max-w-[300px]"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-between px-5 py-[16px]">
          <StoneProof />
          <div
            className="cursor-pointer flex items-center justify-center"
            onClick={() => useSidebarStore.getState().toggleSidebar()}
          >
            <Icon path="/dashboard/icon_set/menu.svg" alt="Menu icon" />
          </div>
        </div>

        {/* the search bar */}
        <div className="px-5">
          <Search />
        </div>

          {/* the menu list */}
          <div className="flex flex-col">
            {sidebarItems.map((item, index) => (
              <Link
                className={`px-5 border-l-[3px] flex items-center gap-[10px] ${
                  isActive(item.path) ? "border-accentBlue bg-[#2B2D2F]" : "border-transparent hover:bg-[#2B2D2F]/50"
                }`}
                href={item.path}
                key={index}
              >
                <div>
                  <Icon path={item.icon} alt={item.iconAlt} />
                </div>
                <p className={`text-[15px] ${isActive(item.path) ? "text-[#F9F9F9]" : "text-[#979AA0]"}`}>
                  {item.name}
                </p>
              </Link>
            ))}
          </div>

          {/* the subscription plan card */}
          <SubscriptionCard />
        </div>
      
    </>
  );
}
