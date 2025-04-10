import { usePathname } from "next/navigation";

export const useDynamicPathText = () => {
  const path = usePathname();

  const getWorkspace = () => {
    if (!path) return ""; // the default fallback

    if (path.includes("miner")) return "Miner Workspace";
    if (path.includes("refiner")) return "Refiner Workspace";
    if (path.includes("warehouse")) return "Warehouse Workspace";
    if (path.includes("auditor")) return "Auditor Workspace";
    return ""; // the default fallback
  };

  return { dynamicWorkspace: getWorkspace() };
};
