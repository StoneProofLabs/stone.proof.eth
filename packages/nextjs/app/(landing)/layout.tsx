import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#111B2B] via-[#2C3C54] to-[#111B2B]">
        <div className="flex flex-col min-h-screen bg-transparent">
          <Header />
          <main className="relative flex flex-col flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
