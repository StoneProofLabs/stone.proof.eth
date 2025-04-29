import React from "react";

const CARDS = [
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",
    icon: "/landing/pic1.svg", // Replace with your icon
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
    icon: "/landing/pic4.svg", // Replace with your icon
  },
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",
    icon: "/landing/pic4.svg", // Replace with your icon
  },
  {
    title: "Advanced Data Encryption",
    desc: "Immutable and traceable transactions for complete trust.",
    icon: "/landing/icon5.svg", // Replace with your icon
  },
];

const CARD_GRADIENT = "linear-gradient(180deg, rgba(42,47,61,0.20) 0%, rgba(10,15,27,0.40) 100%)";

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
            <div
              key={idx}
              className="rounded-2xl border border-[#23262F] shadow-xl flex flex-col items-center justify-between px-6 pt-6 pb-0 min-h-[250px] transition-transform hover:-translate-y-1 hover:shadow-2xl relative"
              style={{
                backdropFilter: "blur(2px)",
                minHeight: 250,
                background: CARD_GRADIENT,
              }}
            >
              <div className="flex flex-col items-center justify-center flex-1 w-full pb-6">
                <h3 className="text-white text-xl font-semibold mb-2 text-center leading-tight mt-2">{card.title}</h3>
                <p className="text-gray-400 text-sm text-center max-w-xs mb-8">{card.desc}</p>
              </div>
              {/* Very Large Icon at the bottom */}
              <div className="w-full flex justify-center relative z-20" style={{ marginBottom: "-32px" }}>
                <img src={card.icon} alt="icon" className="w-36 h-36 md:w-40 md:h-40 object-contain drop-shadow-2xl" />
              </div>
            </div>
          ))}
        </div>
        {/* Add extra space below for icon overflow */}
        <div className="h-20 md:h-24" />
      </div>
    </section>
  );
};

export default Unique;
