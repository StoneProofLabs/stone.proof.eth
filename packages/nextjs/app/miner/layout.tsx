import { Inter } from "next/font/google";
import Sidebar from "~~/components/dashboard/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function MinerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans bg-lightBlack flex gap-2 text-white`}>
      <Sidebar basePath="/miner" />
      {children}
    </div>
  );
}
