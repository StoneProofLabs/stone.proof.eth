import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import { ToastProvider } from "./lib/toast";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Stone.proof | Blockchain Mineral Trading Platform",
  description: "Secure, transparent, and efficient mineral trading platform powered by blockchain technology.",
  keywords: "blockchain, mineral trading, cryptocurrency, supply chain, stone proof, minerals",
  openGraph: {
    title: "Stone.proof | Blockchain Mineral Trading Platform",
    description: "Secure, transparent, and efficient mineral trading platform powered by blockchain technology.",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stone.proof | Blockchain Mineral Trading Platform",
    description: "Secure, transparent, and efficient mineral trading platform powered by blockchain technology.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/dashboard/stone_proof_logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} min-h-screen`}>
      <body>
        <Suspense fallback={<div>loading...</div>}>
          <ScaffoldEthAppWithProviders>
            <ThemeProvider enableSystem>
              {children}
              <ToastProvider />
            </ThemeProvider>
          </ScaffoldEthAppWithProviders>
        </Suspense>
      </body>
    </html>
  );
}
