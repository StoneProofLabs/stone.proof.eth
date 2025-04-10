import { Montserrat } from "next/font/google";
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
  keywords: "blockchain, mineral trading, cryptocurrency, supply chain, stone proof",
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
    icon: "/logo.png",
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={`${montserrat.variable} min-h-screen`}>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
