import { Inter } from "next/font/google";
import Sidebar from "~~/components/dashboard/Sidebar";
import TopBar from "~~/components/dashboard/topBar";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sideBarItems = getSidebarItems("/refiner");

export default function MinerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans bg-lightBlack flex text-white h-screen`}>
      <Sidebar basePath="/refiner" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar sidebarItems={sideBarItems} basePath="/refiner" />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}
