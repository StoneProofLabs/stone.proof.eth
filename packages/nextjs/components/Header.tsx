"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StatsSection } from "./landing/StatsSection";
import { GithubIcon, MessageCircleIcon, TwitterIcon } from "lucide-react";

const navLinks = [
  {
    label: "Smart Contracts",
    href: "/",
  },
  {
    label: "Services",
    href: "/",
  },
  {
    label: "Solutions",
    href: "/",
  },
  {
    label: "Roadmap",
    href: "/",
  },
  {
    label: "Whitepaper",
    href: "/",
  },
];

export const Header = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]); // Add pathname as dependency to trigger on route changes

  return (
    <div className="relative min-h-screen font-montserrat">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline className="object-cover w-full h-full">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#000000] 
            via-[#1E1E1E] to-[#484848] opacity-70"
        ></div>
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Stone.Proof" width={48} height={48} className="" />
                <span className="text-2xl font-medium text-white font-montserrat">Stone.Proof</span>
              </Link>
            </div>

            {/* Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center gap-8 font-montserrat">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-white hover:text-primary transition-colors ${
                    pathname === href ? "text-primary" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Social Links - Right */}
            <div className="flex items-center gap-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="w-5 h-5 text-white hover:text-primary transition-colors" />
              </Link>
              <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <MessageCircleIcon className="w-5 h-5 text-white hover:text-primary transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="w-5 h-5 text-white hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-32 overflow-hidden">
        {/* Decorative Stones */}
        <div className="absolute left-0 top-[70%] -translate-y-1/2 pointer-events-none hidden lg:block">
          <div className="relative">
            <Image
              src="/st2.png"
              alt="Decorative stone"
              width={600}
              height={600}
              className="opacity-90 rotate-12 -translate-x-[40%] relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] 
              hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-1000 filter brightness-110"
            />
          </div>
        </div>
        <div className="absolute right-0 top-[30%] -translate-y-1/2 pointer-events-none hidden lg:block">
          <div className="relative">
            <Image
              src="/st1.png"
              alt="Decorative stone"
              width={600}
              height={600}
              className="opacity-90 -rotate-12 translate-x-[40%] relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]
              hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-1000 filter brightness-110"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white font-montserrat">
            Trade Premium Minerals <br />
            on the <span className="text-yellow-400">Blockchain</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto font-montserrat">
            Our technology performing fast blockchain (120K TPS) and it has guaranteed AI based data security. Proof of
            Stake, its consensus algorithm enables unlimited speeds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="px-8 py-4 bg-[#1D4ED8] text-white text-xl rounded-xl 
              hover:bg-blue-700 transition-all font-montserrat"
            >
              Get started
            </button>
            <button
              className="px-8 py-4 border-2 border-white text-white text-xl rounded-xl 
              hover:bg-white/10 transition-all flex items-center gap-3 font-montserrat relative group"
            >
              {/* Top-right corner */}
              <div className="absolute -top-3 -right-3">
                <div className="w-6 h-0.5 bg-white rounded-r-lg"></div>
                <div className="h-6 w-0.5 bg-white absolute right-0 top-0 rounded-full"></div>
              </div>
              {/* Bottom-left corner */}
              Connect to Wallet
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 -mb-36 mt-auto">
        <StatsSection />
      </div>
    </div>
  );
};
