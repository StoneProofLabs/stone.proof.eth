export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  iconAlt: string;
}

export const getSidebarItems = (basePath: string): SidebarItem[] => [
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
