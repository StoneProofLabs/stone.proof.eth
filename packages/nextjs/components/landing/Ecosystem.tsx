import React from "react";

const ENTERPRISES = [
  {
    title: "Mining Enterprises",
    desc: "Stay up to date with the latest features, enhancements, and fixes",
    icon: "/dashboard/icon_set/refiners.svg",
  },
  {
    title: "Refining Enterprises",
    desc: "Effortlessly integrate our SaaS product with your existing systems",
    icon: "/dashboard/icon_set/refiners.svg",
  },
  {
    title: "Warehouse Enterprises",
    desc: "Tailor the SaaS product to fit your unique business processes.",
    icon: "/dashboard/icon_set/refiners.svg",
  },
  {
    title: "Transport Companies",
    desc: "Gain valuable insights and make data-driven decisions.",
    icon: "/dashboard/icon_set/refiners.svg",
  },
  {
    title: "Inspectors",
    desc: "Gain valuable insights and make data-driven decisions.",
    icon: "/dashboard/icon_set/refiners.svg",
  },
  {
    title: "Auditors",
    desc: "Gain valuable insights and make data-driven decisions.",
    icon: "/dashboard/icon_set/refiners.svg",
  },
];

const ROLES = [
  { label: "Transporters", color: "bg-[#FF4747]", text: "text-white", icon: "/dashboard/icon_set/auditors.svg" },
  { label: "Inspectors", color: "bg-[#1CC8EE]", text: "text-white", icon: "/dashboard/icon_set/auditors.svg" },
  { label: "Refineries", color: "bg-[#258AFF]", text: "text-white", icon: "/dashboard/icon_set/auditors.svg" },
  { label: "Warehouse", color: "bg-[#181B20]", text: "text-white", icon: "/dashboard/icon_set/auditors.svg" },
  { label: "Buyers", color: "bg-[#3DD598]", text: "text-white", icon: "/dashboard/icon_set/auditors.svg" },
  { label: "Auditors", color: "bg-[#181B20]", text: "text-white", icon: "/dashboard/icon_set/auditors.svg" },
  { label: "Miners", color: "bg-[#23262F]", text: "text-white", icon: "/dashboard/icon_set/auditors.svg" },
];

const Ecosystem = () => {
  // Assign roles to columns
  const leftCol = [ROLES[0], ROLES[3]]; // Transporters, Warehouse
  const midCol = [ROLES[1], ROLES[4], ROLES[5]]; // Inspectors, Buyers, Auditors
  const rightCol = [ROLES[2], ROLES[6]]; // Refineries, Miners

  const blockClass =
    "rounded-[12px] flex flex-col items-center justify-center shadow-md w-[110px] h-[100px] md:w-[140px] md:h-[130px] text-center transition-transform hover:-translate-y-1 hover:shadow-xl";

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#10131A] to-[#0A0F1B]">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Our Ecosystem</h2>
      <p className="text-gray-300 text-center max-w-2xl mb-12 text-base md:text-lg">
        Uniting Enterprises Across the Mineral Supply Chain
        <br />
        <span className="text-gray-400 text-sm md:text-base">
          From extraction to refinement — we connect every step with trust and transparency.
        </span>
      </p>
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl mx-auto items-stretch">
        {/* Left Card */}
        <div className="flex-1 bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 shadow-lg border border-[#23262F] min-w-[320px] max-w-xl flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {ENTERPRISES.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                {/* Icon placeholder */}
                <div className="w-8 h-8 flex items-center justify-center mt-1">
                  <div className="w-8 h-8 rounded text-[#258AFF] flex items-center justify-center bg-transparent">
                    <img src={item.icon} alt="icon" className="w-7 h-7 object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold leading-tight mb-1">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Card */}
        <div className="flex-1 bg-[#060910] rounded-2xl border border-[#23262F] shadow-lg flex items-center justify-center relative min-w-[320px] max-w-xl p-2 overflow-hidden">
          {/* Background image placeholder (user to provide) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src="/landing/bg2.svg" alt="bg" className="w-full h-full object-contain opacity-60" />
          </div>
          <div className="relative z-10 flex flex-row items-center justify-center w-[350px] md:w-[500px] h-[250px] md:h-[370px] mx-auto">
            {/* Left column */}
            <div className="flex flex-col items-center justify-center h-full mr-2 gap-4">
              <div className={`${blockClass} ${leftCol[0].color} ${leftCol[0].text}`}>
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img src={leftCol[0].icon} alt="icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg leading-tight">{leftCol[0].label}</span>
              </div>
              <div className={`${blockClass} ${leftCol[1].color} ${leftCol[1].text}`}>
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img src={leftCol[1].icon} alt="icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg leading-tight">{leftCol[1].label}</span>
              </div>
            </div>
            {/* Middle column */}
            <div className="flex flex-col items-center justify-between h-full mx-2">
              <div className={`${blockClass} ${midCol[0].color} ${midCol[0].text}`}>
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img src={midCol[0].icon} alt="icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg leading-tight">{midCol[0].label}</span>
              </div>
              <div className={`${blockClass} ${midCol[1].color} ${midCol[1].text} my-2`}>
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img src={midCol[1].icon} alt="icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg leading-tight">{midCol[1].label}</span>
              </div>
              <div className={`${blockClass} ${midCol[2].color} ${midCol[2].text}`}>
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img src={midCol[2].icon} alt="icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg leading-tight">{midCol[2].label}</span>
              </div>
            </div>
            {/* Right column */}
            <div className="flex flex-col items-center justify-center h-full ml-2 gap-4">
              <div className={`${blockClass} ${rightCol[0].color} ${rightCol[0].text}`}>
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img src={rightCol[0].icon} alt="icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg leading-tight">{rightCol[0].label}</span>
              </div>
              <div className={`${blockClass} ${rightCol[1].color} ${rightCol[1].text}`}>
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <img src={rightCol[1].icon} alt="icon" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg leading-tight">{rightCol[1].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
