"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { SidebarItem } from "~~/types/dashboard/sidebarItems";

interface BreadcrumbProps {
  sidebarItems: SidebarItem[];
  basePath: string;
}

export default function TopBar({ sidebarItems, basePath }: BreadcrumbProps) {
  const pathname = usePathname();

  const getPortalName = useMemo(() => {
    if (!pathname) return "";
    if (pathname.includes("miner")) return "Miner Portal";
    if (pathname.includes("refiner")) return "Refiner Portal";
    if (pathname.includes("warehouse")) return "Warehouse Portal";
    if (pathname.includes("auditor")) return "Auditor Portal";
    return "";
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

  return (
    <div className="flex h-16 sticky top-0 z-30 items-center justify-between w-[80vw] px-[50px]">
      <div className="flex gap-1">
        <Link href="#" className="mx-2">
          <Icon path="/dashboard/icon_set/book.svg" alt="Menu" />
        </Link>

        <Link href="#" className="mx-2">
          <Icon path="/dashboard/icon_set/star.svg" alt="Favorite" />
        </Link>

        <div className="flex items-center ml-2">
          {breadcrumbItems.map((item, index) => (
            <div key={item.path} className="flex items-center text-[#cdcdce] text-[14px]">
              {index > 0 && <span className="mx-2 text-gray-500">/</span>}
              <Link href={item.path} className="text-white hover:text-gray-300 transition-colors">
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
