export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
  iconAlt: string;
}

export const getSidebarItems = (basePath: string): SidebarItem[] => {
  switch (basePath) {
    case "/miner":
      return [
        {
          name: "Overview",
          path: `${basePath}/overview`,
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

    case "/inspector":
      return [
        {
          name: "Overview",
          path: `${basePath}/overview`,
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
          name: "Inspector",
          path: `${basePath}/inspector`,
          icon: "/dashboard/icon_set/all_mines.svg",
          iconAlt: "Inspector icon",
        },
        {
          name: "Disputes Resolution",
          path: `${basePath}/disputes`,
          icon: "/dashboard/icon_set/disputes.svg",
          iconAlt: "Disputes icon",
        }
      ];

    case "/auditor":
      return [
        {
          name: "Overview",
          path: `${basePath}/overview`,
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
          name: "Auditory",
          path: `${basePath}/auditor`,
          icon: "/dashboard/icon_set/all_mines.svg",
          iconAlt: "Auditor icon",
        },
        {
          name: "Disputes Resolution",
          path: `${basePath}/disputes`,
          icon: "/dashboard/icon_set/disputes.svg",
          iconAlt: "Disputes icon",
        }
      ];

    case "/refiner":
      return [
        {
          name: "Overview",
          path: `${basePath}/overview`,
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
          name: "Warehouse",
          path: `${basePath}/warehouse`,
          icon: "/dashboard/icon_set/warehouse.svg",
          iconAlt: "Warehouse icon",
        },
        {
          name: "Disputes Resolutions",
          path: `${basePath}/disputes`,
          icon: "/dashboard/icon_set/disputes.svg",
          iconAlt: "Disputes icon",
        },
      ];
    case "/warehouse":
      return [
        {
          name: "Overview",
          path: `${basePath}/overview`,
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
          name: "Warehouse",
          path: `${basePath}/warehouse`,
          icon: "/dashboard/icon_set/warehouse.svg",
          iconAlt: "Warehouse icon",
        },
        {
          name: "Disputes Resolutions",
          path: `${basePath}/disputes`,
          icon: "/dashboard/icon_set/disputes.svg",
          iconAlt: "Disputes icon",
        },
      ];
    case "/admin":
      return [
        {
          name: "Overview",
          path: `${basePath}/overview`,
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
          name: "Mines",
          path: `${basePath}/miners`,
          icon: "/dashboard/icon_set/miners.svg",
          iconAlt: "Miners icon",
        },
        {
          name: "Refineries",
          path: `${basePath}/refineries`,
          icon: "/dashboard/icon_set/miners.svg",
          iconAlt: "Refineries icon",
        },
        {
          name: "Auditors",
          path: `${basePath}/auditors`,
          icon: "/dashboard/icon_set/auditors.svg",
          iconAlt: "Auditors icon",
        },
        {
          name: "Inspectors",
          path: `${basePath}/inspectors`,
          icon: "/dashboard/icon_set/inspectors.svg",
          iconAlt: "Inspectors icon",
        },
        {
          name: "Notifications",
          path: `${basePath}/notifications`,
          icon: "/dashboard/icon_set/notification.svg",
          iconAlt: "Notifications icon",
        },
        {
          name:"Management",
          path: `${basePath}/management`,
          icon: "/dashboard/icon_set/management.svg",
          iconAlt: "Management icon",
        },
        {
          name: "Disputes Resolutions",
          path: `${basePath}/disputes`,
          icon: "/dashboard/icon_set/disputes.svg",
          iconAlt: "Disputes icon",
        },
      ];

    default:
      return [];
  }
};
