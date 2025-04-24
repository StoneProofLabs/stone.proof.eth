import { Inter } from "next/font/google";
import Sidebar from "~~/components/dashboard/Sidebar";
import TopBar from "~~/components/dashboard/topBar";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sidebarItems = getSidebarItems("/admin");
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans bg-[#060A12] flex text-white h-screen`}>
      <Sidebar basePath="/admin" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar sidebarItems={sidebarItems} basePath="/admin" />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}