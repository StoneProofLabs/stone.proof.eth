import React, { useState } from "react";

const CARDS = [
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",
    icon: "/landing/pic4.svg", // Replace with your icon
  },
  {
    title: "Blockchain-based Supply Chain",
    desc: "Immutable and traceable transactions for complete trust.",
    icon: "/landing/pic2.svg", // Replace with your icon
  },
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",
    icon: "/landing/pic3.svg", // Replace with your icon
  },
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",
    icon: "/landing/pic1.svg", // Replace with your icon
  },
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",

    icon: "/landing/verified.png", // Replace with your icon

  },
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",

    icon: "/landing/wallet.png", // Replace with your icon

  },
];

const CARD_GRADIENT = "linear-gradient(180deg, rgba(42,47,61,0.20) 0%, rgba(10,15,27,0.40) 100%)";

const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="rounded-2xl border border-[#23262F] shadow-xl flex flex-col items-center justify-between px-6 pt-6 pb-0 min-h-[250px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative group "
      style={{
        backdropFilter: "blur(2px)",
        minHeight: 250,
        background: CARD_GRADIENT,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top highlight line */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[7px] bg-white opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"
        style={{
          width: "15%",
          boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.7)",
          transition: "all 0.3s ease",
          borderRadius: 10,
        }}
      />

      {/* Top center spotlight */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(15px)",
          top: "-50px",
        }}
      />

      <div className="flex flex-col items-center justify-center flex-1 w-full pb-6 z-20">
        <h3 className="text-white text-xl font-semibold mb-2 text-center leading-tight mt-2">{title}</h3>
        <p className="text-gray-400 text-sm text-center max-w-xs mb-8">{desc}</p>
      </div>

      {/* Icon container with spotlight effect */}
      <div className="w-full flex justify-center relative " style={{ marginBottom: "-32px" }}>
        {/* Icon spotlight (only visible on hover) */}
        <div
          className="absolute w-[120px] h-[120px] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(20px)",
            transform: "translate(-50%, -50%)",
            top: "40%",
            left: "50%",
            zIndex: 10,
          }}
        />

        {/* Icon with z-index to appear above the spotlight */}
        <img
          src={icon}
          alt={title}
          className="w-40 h-40 select-none pointer-events-none md:w-40 md:h-40 object-contain drop-shadow-2xl z-20 transition-transform duration-300 "
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>
    </div>
  );
};

const Unique = () => {
  return (
    <section
      className="relative bg-[#060910] w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "650px" }}
    >
      {/* Background image (user to provide actual image) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          src="/landing/bg.svg" // User to provide
          alt="background"
          className="w-full h-full object-cover opacity-60"
          style={{ filter: "brightness(0.7) blur(0.5px)" }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 text-left">What Sets Us Apart</h2>
        <p className="text-gray-300 text-base md:text-lg mb-10 text-left max-w-2xl">
          Discover the powerful foundations behind our secure blockchain ecosystem.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CARDS.map((card, idx) => (
            <FeatureCard key={idx} title={card.title} desc={card.desc} icon={card.icon} />
          ))}
        </div>

        {/* Add extra space below for icon overflow */}
        <div className="h-20 md:h-24" />
      </div>
    </section>
  );
};

export default Unique;
