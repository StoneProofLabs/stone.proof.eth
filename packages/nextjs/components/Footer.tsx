import React from "react";
import StoneProof from "./landing/Header/StoneProof";

// Footer data structure
const footerData = {
  description: "Design outstanding interfaces with advanced Figma features in a matter of minutes.",
  sections: [
    {
      title: "Why Choose Us?",
      links: ["Scale", "Solutions", "Our Competition", "Channels", "Events", "Watch the Demo"],
    },
    {
      title: "Company",
      links: ["Leadership", "Careers", "Investor Relations", "Media Kit"],
    },
    {
      title: "Resources",
      links: ["Community", "Events", "Help Center", "Partners"],
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#060910] text-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 md:gap-16">
          {/* Logo and subscription section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <StoneProof />
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">{footerData.description}</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Input your email"
                className="bg-[#252525] border border-gray-700 rounded-l-md py-2 px-4 w-full focus:outline-none"
              />
              <button className="bg-[#1D4ED8] hover:bg-[#1e40af] text-white py-2 px-6 rounded-r-md transition-colors duration-200">
                Submit
              </button>
            </div>
          </div>

          {/* Dynamic sections */}
          {footerData.sections.map((section, index) => (
            <div key={index} className="sm:pl-0 lg:pl-16">
              <h3 className="text-lg font-semibold mb-4 sm:mb-6">{section.title}</h3>
              <ul className="space-y-2 sm:space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 sm:my-10"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500">© 2025 stoneProof. All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
