/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ConnectWalletButton from "./hero/ConnectWalletButton";

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
        {/* big stone at the bottom left of the hero */}
        <img
          src="/landing/hero_ring.svg"
          alt="Stone Bottom Left"
          className="hidden lg:block absolute left-[20px] bottom-[-22%] z-[100] w-32 md:w-48 lg:w-56 pointer-events-none select-none"
        />

        {/* Yellow spotlight at far left of hero banner */}
        <div
          className="absolute left-0 bottom-[20%] sm:bottom-[25%] w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full opacity-40 blur-[80px] sm:blur-[100px]"
          style={{
            background: "#D9C834",
            zIndex: 1,
          }}
        ></div>

        <div className="relative z-30 flex flex-col items-center justify-center px-4 sm:px-8 w-full">
          {/* Badge */}
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4 tracking-wide">
            1% OF THE INDUSTRY
          </span>
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-semibold text-white text-center leading-tight mb-4">
            Trust, Transparency &<br />
            Traceability in Mining
          </h1>
          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-lg md:text-xl text-center max-w-2xl mx-auto mb-8">
            We believe the future of mineral traceability isn&apos;t about changing the industry — it&apos;s about
            securing it, empowering it, and moving it forward with trust
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 relative">
            <Link
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 z-20"
            >
              Get Started
            </Link>

            <div className="relative z-20 group">
              {/* blurred spotlight */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[120px] rounded-full bg-white opacity-15 blur-[50px] -z-10 transition-all duration-300 group-hover:w-[360px] group-hover:h-[150px]"></div>

              {/* ConnectWalletButton */}
              <div className="">
                <ConnectWalletButton />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Image */}
        <div className="relative z-20 flex justify-center w-full mt-2 px-4 sm:px-8">
          {/* big stone at top right of dashboard */}
          <img
            src="/landing/hero_stone.svg"
            alt="Stone Top Right"
            className="hidden lg:block absolute top-[-260px] right-[1.5%] w-[480px] md:w-[580px] lg:w-[640px] pointer-events-none select-none z-20"
          />
          <div className="w-full max-w-[1600px] z-50">
            <Image
              src="/landing/banner-stoneproof.svg"
              alt="StoneProof Admin Dashboard"
              width={2200}
              height={1200}
              className="rounded-xl shadow-2xl w-full h-auto object-cover"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
