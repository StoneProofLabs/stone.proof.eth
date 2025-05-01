import Footer from "~~/components/Footer";
import Header from "~~/components/Header";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-black">
        <div>
          <Header />
          <main className="relative flex flex-col flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
