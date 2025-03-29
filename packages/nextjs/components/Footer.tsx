"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    Learn: [
      { label: "About", href: "/#about" },
      { label: "Features", href: "/#features" },
      { label: "Services", href: "/#services" },
      { label: "FAQ", href: "/#faq" },
    ],
    Build: [
      { label: "Documentation", href: "https://docs.scaffoldeth.io" },
      { label: "API Reference", href: "#" },
      { label: "Developer Tools", href: "#" },
      { label: "Tutorials", href: "#" },
    ],
    Explore: [
      { label: "Marketplace", href: "#" },
      { label: "Minerals", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Use Cases", href: "#" },
    ],
    Participate: [
      { label: "Community", href: "#" },
      { label: "Contribute", href: "#" },
      { label: "Events", href: "#" },
      { label: "Governance", href: "#" },
    ],
  };

  return (
    <footer className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex relative w-10 h-10">
                <div className="w-10 h-10 bg-primary rounded-full"></div>
                <span className="absolute inset-0 flex items-center justify-center font-bold text-primary-content">
                  SP
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold leading-tight">Stoneproof</span>
                <span className="text-xs">Mineral Trading Platform</span>
              </div>
            </div>
            <p className="text-base-content/70 mb-4 max-w-xs">
              Revolutionizing the mineral industry with blockchain technology. Secure, transparent, and efficient.
            </p>
            <div className="flex gap-3">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5 text-base-content/70 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 text-base-content/70 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base-content/70 hover:text-primary hover:underline transition-colors"
                    >
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
