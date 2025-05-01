import { ReactNode } from "react";
import Footer from "~~/components/Footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#060910]">
      <main className="flex-grow flex items-center justify-center pb-16">{children}</main>
      <div className="h-px bg-[#23272F] w-full"></div>
      <Footer />
    </div>
  );
}
