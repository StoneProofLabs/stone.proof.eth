"use client";

import type React from "react";
import { useEffect, useState } from "react";
import ContactUsButton from "./landing/Header/ContactUsButton";
import StoneProof from "./landing/Header/StoneProof";
import { Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#060910]/80 backdrop-blur-md shadow-lg" : "bg-[#060910]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <StoneProof />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-2 lg:gap-10">
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-white text-xs lg:text-base opacity-70 hover:text-primary hover:opacity-100 transition-colors duration-200 whitespace-nowrap px-1 lg:px-0"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white fixed top-4 right-4 z-50"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Contact Us button - hidden on mobile and small tablets */}
        <div className="hidden lg:block">
          <ContactUsButton />
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#060910] z-40 flex flex-col items-center justify-center lg:hidden">
          <ul className="flex flex-col gap-6 text-center">
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-white text-lg opacity-70 hover:opacity-100 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mt-4">
              <ContactUsButton />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
