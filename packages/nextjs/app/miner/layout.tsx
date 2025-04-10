import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function MinerLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${inter.variable} font-sans bg-lightBlack min-h-screen`}>{children}</div>;
}
