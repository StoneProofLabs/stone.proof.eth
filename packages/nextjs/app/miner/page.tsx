import TopBar from "~~/components/dashboard/topBar";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";

export default function Page() {
  const sidebarItems = getSidebarItems("/miner");

  return (
    <div>
      <TopBar sidebarItems={sidebarItems} basePath={"/miner"} />
      <h1>Miner admin page</h1>
    </div>
  );
}
