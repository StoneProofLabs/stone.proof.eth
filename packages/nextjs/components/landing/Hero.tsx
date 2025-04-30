import React from "react";
import Image from "next/image";
import ConnectWalletButton from "./hero/ConnectWalletButton";
import { FaWallet } from "react-icons/fa";

// Decorative stone component (for reuse)
// const DecorativeStone = ({
//   src,
//   alt,
//   className,
//   size = 220,
//   glowColor = "#fff",
// }: {
//   src: string;
//   alt: string;
//   className?: string;
//   size?: number;
//   glowColor?: string;
// }) => (
//   <div
//     className={`absolute z-10 pointer-events-none ${className} hidden sm:block`}
//     style={{ width: size, height: size }}
//   >
//     {/* Glow */}
//     <div
//       className="absolute inset-0 rounded-full blur-3xl opacity-60"
//       style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
//     />
//     <Image src={src} alt={alt} width={size} height={size} className="object-contain" draggable={false} priority />
//   </div>
// );

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-visible bg-[#060910] pt-16 pb-8 sm:pb-16 min-h-[80vh] flex flex-col justify-center items-center">
      

      <div className="relative w-full min-h-[600px] flex flex-col items-center justify-center">
        {/* Stones */}
        <img
          src="/landing/hero_ring.svg"
          alt="Stone Bottom Left"
          className="absolute left-[20px] bottom-[-22%] z-[100] w-32 md:w-48 lg:w-56 pointer-events-none select-none"
        />

        <div className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-8 w-full">
          {/* Badge */}
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4 tracking-wide">
            1% OF THE INDUSTRY
          </span>
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center leading-tight mb-4">
            Trust, Transparency &<br />
            Traceability in Mining
          </h1>
          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-8">
            We believe the future of mineral traceability isn&apos;t about changing the industry — it&apos;s about
            securing it, empowering it, and moving it forward with trust
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
              Get Started
            </button>
            <ConnectWalletButton />
          </div>
        </div>
        {/* Dashboard Image - direct child, centered, responsive */}
        <div className="relative z-10 flex justify-center w-full mt-2">
          {/* Big stone at top right of dashboard, close to center */}
          <img
            src="/landing/hero_stone.svg"
            alt="Stone Top Right"
            className="absolute top-[-260px] right-[1.5%] w-[480px] md:w-[580px] lg:w-[640px] pointer-events-none select-none"
            style={{ zIndex: 2 }}
          />
          <Image
            src="/landing/dashboard.svg"
            alt="StoneProof Admin Dashboard"
            width={900}
            height={440}
            className="rounded-xl shadow-2xl w-full max-w-4xl z-50 h-auto border border-[#23272F] bg-[#10131c]"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
