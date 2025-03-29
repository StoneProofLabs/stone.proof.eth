"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StatsSection } from "./landing/StatsSection";
import { GithubIcon, MessageCircleIcon, TwitterIcon } from "lucide-react";

const navLinks = [
  {
    label: "Smart Contracts",
    href: "/smart-contracts",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Solutions",
    href: "/solutions",
  },
  {
    label: "Roadmap",
    href: "/roadmap",
  },
  {
    label: "Whitepaper",
    href: "/whitepaper",
  },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen font-montserrat">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {/* <Image 
          src="/" 
          alt="Minerals Background" 
          fill 
          className="object-cover"
          priority
        /> */}
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Stone.Proof" width={32} height={32} />
                <span className="text-xl font-medium text-white font-montserrat">Stone.Proof</span>
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
      <div className="relative z-10 container mx-auto px-6 pt-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white font-montserrat">
            Trade Premium Minerals <br />
            on the <span className="text-yellow-400">Blockchain</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto font-montserrat">
            Our technology performing fast blockchain (120K TPS) and it has guaranteed AI based data security. Proof of
            Stake, its consensus algorithm enables unlimited speeds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-montserrat">
              Get started
            </button>
            <button className="px-8 py-3 border border-white text-white rounded-md  transition-colors flex items-center gap-2 font-montserrat">
              Connect to Wallet
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
      <div className="relative z-10 mt-20">
        <StatsSection />
      </div>
    </div>
  );
};
