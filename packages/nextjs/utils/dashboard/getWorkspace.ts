import { usePathname } from "next/navigation";

export const useDynamicPathText = () => {
  const path = usePathname();

  const getWorkspace = () => {
    if (!path) return "";

    const base = path.split("/")[1];

    switch (base) {
      case "miner":
        return "Miner Workspace";
      case "refiner":
        return "Refiner Workspace";
      case "warehouse":
        return "Warehouse Workspace";
      case "auditor":
        return "Auditor Workspace";
      case "inspector":
        return "Inspector Workspace";
      case "admin":
        return "Admin Workspace";
      case "buyer":
        return "Buyer Workspace";
      case "transporter":
        return "Transporter Workspace";
      default:
        return "";
    }
  };

  return { dynamicWorkspace: getWorkspace() };
};
