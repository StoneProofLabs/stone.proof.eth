"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    Learn: [
      { label: "Introduction", href: "#" },
      { label: "Features", href: "#" },
      { label: "Staking", href: "#" },
      { label: "Get Stone.prof", href: "#" },
      { label: "FAQ", href: "#" },
    ],
    Build: [
      { label: "EnvironmentI", href: "#" },
      { label: "BlockChain", href: "#" },
      { label: "Community", href: "#" },
    ],
    Explore: [
      { label: "Mining", href: "#" },
      { label: "Transport", href: "#" },
      { label: "WareHouses", href: "#" },
      { label: "Market Place", href: "#" },
    ],
    Participate: [
      { label: "Community", href: "#" },
      { label: "Contributors", href: "#" },
      { label: "Events", href: "#" },
      { label: "Newsletters", href: "#" },
    ],
    Resources: [
      { label: "About", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Design", href: "#" },
      { label: "Resources", href: "#" },
    ],
  };

  return (
    <footer className="py-12 px-4 md:px-8 text-gray-400 font-montserrat">
      <div className="max-w-7xl mx-auto">
        <div className="w-full h-[1px] bg-white opacity-10 mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-base-content/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-base-content/50">© {new Date().getFullYear()} Stoneproof. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-base-content/50 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-base-content/50 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-base-content/50 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
