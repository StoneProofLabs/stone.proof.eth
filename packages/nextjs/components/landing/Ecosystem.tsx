/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

const ENTERPRISES = [
  {
    title: "Mining Enterprises",
    desc: "Stay up to date with the latest features, enhancements, and fixes",
    icon: "/dashboard/icon_set/mineCart.svg",
  },
  {
    title: "Refining Enterprises",
    desc: "Effortlessly integrate our SaaS product with your existing systems",
    icon: "/dashboard/icon_set/refineCart.svg",
  },
  {
    title: "Warehouse Enterprises",
    desc: "Tailor the SaaS product to fit your unique business processes.",
    icon: "/dashboard/icon_set/warehouseCart.svg",
  },
  {
    title: "Transport Companies",
    desc: "Gain valuable insights and make data-driven decisions.",
    icon: "/dashboard/icon_set/mineTruck.svg",
  },
  {
    title: "Inspectors",
    desc: "Gain valuable insights and make data-driven decisions.",
    icon: "/dashboard/icon_set/inspectorTemp.svg",
  },
  {
    title: "Auditors",
    desc: "Gain valuable insights and make data-driven decisions.",
    icon: "/dashboard/icon_set/refiners.svg",
  },
];

const ROLES = [
  { label: "Transporters", color: "bg-[#FF4747]", text: "text-white", icon: "/dashboard/icon_set/mineTruckWhite.svg" },
  {
    label: "Inspectors",
    color: "bg-[#1CC8EE]",
    text: "text-white",
    icon: "/dashboard/icon_set/inspectorTempWhite.svg",
  },
  { label: "Refineries", color: "bg-[#258AFF]", text: "text-white", icon: "/dashboard/icon_set/refinerCartWhite.svg" },
  { label: "Warehouse", color: "bg-[#181B20]", text: "text-white", icon: "/dashboard/icon_set/warehouseCartWhite.svg" },
  { label: "Buyers", color: "bg-[#3DD598]", text: "text-white", icon: "/dashboard/icon_set/buyerCar.svg" },
  { label: "Auditors", color: "bg-[#181B20]", text: "text-white", icon: "/dashboard/icon_set/refinersWhite.svg" },
  { label: "Miners", color: "bg-[#23262F]", text: "text-white", icon: "/dashboard/icon_set/minerMan.svg" },
];

// Role block component for reusability
// @ts-ignore
const RoleBlock = ({ role, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-[12px] flex flex-col items-center justify-center shadow-md transition-all duration-300 hover:shadow-xl ${role.color} ${role.text} ${className} relative group overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
      }}
    >
      {/* Add subtle glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />
      <div className="w-8 h-8 sm:w-10 sm:h-10 mb-1 sm:mb-2 flex items-center justify-center">
        <img src={role.icon} alt={role.label} className="w-full h-full object-contain" />
      </div>
      <span className="font-semibold text-sm sm:text-base md:text-lg leading-tight px-1">{role.label}</span>
    </div>
  );
};

const Ecosystem = () => {
  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Update screen size state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Assign roles to columns based on screen size
  const getRoleLayout = () => {
    if (isMobile) {
      // For mobile, have a single column layout
      return {
        leftCol: [],
        midCol: ROLES,
        rightCol: [],
      };
    } else if (isTablet) {
      // For tablet, have a two column layout
      return {
        leftCol: [ROLES[0], ROLES[1], ROLES[6]],
        midCol: [],
        rightCol: [ROLES[2], ROLES[3], ROLES[4], ROLES[5]],
      };
    } else {
      // For desktop, maintain the original three column layout
      return {
        leftCol: [ROLES[0], ROLES[3]],
        midCol: [ROLES[1], ROLES[4], ROLES[5]],
        rightCol: [ROLES[2], ROLES[6]],
      };
    }
  };

  const { leftCol, midCol, rightCol } = getRoleLayout();

  // Dynamic sizing for role blocks based on screen size
  const getBlockSize = () => {
    if (isMobile) {
      return "w-[100px] h-[90px]";
    } else if (isTablet) {
      return "w-[120px] h-[110px]";
    } else {
      return "w-[110px] h-[100px] md:w-[140px] md:h-[130px]";
    }
  };

  const blockSize = getBlockSize();

  return (
    <section className="w-full py-12 sm:py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#10131A] to-[#0A0F1B]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">Our Ecosystem</h2>
      <p className="text-gray-300 text-center max-w-2xl mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-2">
        Uniting Enterprises Across the Mineral Supply Chain
        <br />
        <span className="text-gray-400 text-xs sm:text-sm md:text-base">
          From extraction to refinement — we connect every step with trust and transparency.
        </span>
      </p>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 w-full max-w-6xl mx-auto items-stretch">
        {/* Left Card - Enterprise Info */}
        <div className="flex-1 bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-[#23262F] min-w-[300px] max-w-full sm:max-w-xl flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-8">
            {ENTERPRISES.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4">
                {/* Icon */}
                <div className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center mt-1 flex-shrink-0">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 rounded text-[#258AFF] flex items-center justify-center bg-transparent">
                    <img src={item.icon} alt={item.title} className="w-5 sm:w-7 h-5 sm:h-7 object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-base sm:text-lg font-semibold leading-tight mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card - Roles Visual */}
        <div className="flex-1 bg-[#060910] rounded-2xl border border-[#23262F] shadow-lg flex items-center justify-center relative min-w-[300px] max-w-full sm:max-w-xl p-2 sm:p-4 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src="/landing/bg2.svg" alt="background" className="w-full h-full object-cover opacity-60" />
          </div>

          {/* Responsive role layout */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center w-full h-full py-4 sm:py-6 md:py-8">
            {/* Left column - Only show on desktop and tablet */}
            {leftCol.length > 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 sm:gap-4 mb-4 sm:mb-0 sm:mr-3">
                {leftCol.map((role, idx) => (
                  <RoleBlock key={`left-${idx}`} role={role} className={blockSize} />
                ))}
              </div>
            )}

            {/* Middle column */}
            {midCol.length > 0 && (
              <div
                className={`flex ${isMobile ? "flex-row flex-wrap justify-center" : "flex-col justify-between"} items-center h-full gap-3 sm:gap-4 mx-0 sm:mx-3`}
              >
                {midCol.map((role, idx) => (
                  <RoleBlock
                    key={`mid-${idx}`}
                    role={role}
                    className={`${blockSize} ${isMobile ? "mx-2 mb-3" : "my-1 sm:my-2"}`}
                  />
                ))}
              </div>
            )}

            {/* Right column - Only show on desktop and tablet */}
            {rightCol.length > 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 sm:gap-4 mt-4 sm:mt-0 sm:ml-3">
                {rightCol.map((role, idx) => (
                  <RoleBlock key={`right-${idx}`} role={role} className={blockSize} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
