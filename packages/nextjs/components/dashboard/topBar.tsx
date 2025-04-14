"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { useSidebarStore } from "~~/stores/useSidebarStore";
import { SidebarItem } from "~~/types/dashboard/sidebarItems";

interface BreadcrumbProps {
  sidebarItems: SidebarItem[];
  basePath: string;
}

export default function TopBar({ sidebarItems, basePath }: BreadcrumbProps) {
  const pathname = usePathname();

  const getPortalName = useMemo(() => {
    if (!pathname) return "";

    const base = pathname.split("/")[1];

    switch (base) {
      case "miner":
        return "Miner Portal";
      case "refiner":
        return "Refiner Portal";
      case "warehouse":
        return "Warehouse Portal";
      case "auditor":
        return "Auditor Portal";
      default:
        return "";
    }
  }, [pathname]);

  const breadcrumbItems = useMemo(() => {
    if (!pathname) return [];

    if (pathname.includes("registerMineral")) {
      return [
        { name: getPortalName, path: basePath },
        { name: "Register Mineral", path: pathname },
      ];
    }

    const activeItem = sidebarItems.find(
      item => pathname === item.path || (pathname.startsWith(item.path) && item.path !== basePath),
    );

    if (activeItem) {
      return [
        { name: getPortalName, path: basePath },
        { name: activeItem.name, path: activeItem.path },
      ];
    }

    return [{ name: getPortalName, path: basePath }];
  }, [pathname, sidebarItems, basePath, getPortalName]);

  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <div
      className={`flex h-16 sticky top-0 z-30 items-center justify-between px-3 sm:px-6 md:px-[50px] transition-all duration-300 ease-in-out ${isCollapsed ? "w-[100vw]" : "w-[80vw]"}`}
    >
      <div className="flex gap-1 items-center min-w-0">
        <button className="shrink-0 mx-1 sm:mx-2" onClick={toggleSidebar}>
          <Icon path="/dashboard/icon_set/book.svg" alt="Menu" />
        </button>

        <Link href="#" className="shrink-0 mx-1 sm:mx-2 hidden sm:block">
          <Icon path="/dashboard/icon_set/star.svg" alt="Favorite" />
        </Link>

        <div className="flex items-center ml-1 sm:ml-2 overflow-hidden">
          {breadcrumbItems.map((item, index) => (
            <div
              key={item.path}
              className="flex items-center text-[#cdcdce] text-[12px] sm:text-[14px] whitespace-nowrap"
            >
              {index > 0 && <span className="mx-1 sm:mx-2 text-gray-500 shrink-0">/</span>}
              <Link
                href={item.path}
                className="text-white hover:text-gray-300 transition-colors truncate max-w-[120px] sm:max-w-[160px] md:max-w-none"
                title={item.name}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center">
        <button className="mx-2">
          <Icon path="/dashboard/icon_set/sun.svg" alt="Theme toggle" />
        </button>
        <button className="mx-2">
          <Icon path="/dashboard/icon_set/clock.svg" alt="History" />
        </button>
        <button className="mx-2">
          <Icon path="/dashboard/icon_set/notification.svg" alt="Notifications" />
        </button>
        <button className="mx-2">
          <Icon path="/dashboard/icon_set/book.svg" alt="Apps" />
        </button>
      </div>
    </div>
  );
}
