"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import StoneProof from "../logo/Stoneproof";
import Icon from "./Icon";
import Search from "./search";
import SubscriptionCard from "./subscriptionCard";

interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  iconAlt: string;
}

interface SidebarProps {
  basePath: string;
}

export default function Sidebar({ basePath }: SidebarProps) {
  const pathname = usePathname();

  // Common items for all roles
  const sidebarItems: SidebarItem[] = [
    {
      name: "Overview",
      path: `${basePath}`,
      icon: "/dashboard/icon_set/overview.svg",
      iconAlt: "Overview icon",
    },
    {
      name: "Minerals",
      path: `${basePath}/minerals`,
      icon: "/dashboard/icon_set/minerals.svg",
      iconAlt: "Minerals icon",
    },
    {
      name: "Notifications",
      path: `${basePath}/notifications`,
      icon: "/dashboard/icon_set/notification.svg",
      iconAlt: "Notifications icon",
    },
    {
      name: "All mines",
      path: `${basePath}/mines`,
      icon: "/dashboard/icon_set/all_mines.svg",
      iconAlt: "All mines icon",
    },
    {
      name: "Disputes Resolutions",
      path: `${basePath}/disputes`,
      icon: "/dashboard/icon_set/disputes.svg",
      iconAlt: "Disputes icon",
    },
  ];

  // Check if item is active
  const isActive = (itemPath: string) => {
    return pathname === itemPath || pathname?.startsWith(`${itemPath}/`);
  };

  return (
    <div className="bg-darkBlack min-h-screen w-[20vw] flex flex-col gap-10">
      {/* Logo */}
      <div className="flex justify-between px-5 py-[16px]">
        <StoneProof />
        <div className="cursor-pointer flex items-center justify-center">
          <Icon path="/dashboard/icon_set/menu.svg" alt="Menu icon" />
        </div>
      </div>

      {/* the search bar */}
      <div className="px-5">
        <Search />
      </div>

      {/* the menu list */}
      <div>
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
            <p className={`text-[15px] ${isActive(item.path) ? "text-[#F9F9F9]" : "text-[#979AA0]"}`}>{item.name}</p>
          </Link>
        ))}
      </div>

      {/* the subscription plan card */}
      <div>
        <SubscriptionCard />
      </div>
    </div>
  );
}
