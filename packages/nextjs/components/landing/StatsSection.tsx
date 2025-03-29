"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const StatsSection = () => {
  const stats = [
    { value: 100, label: "Companies" },
    { value: 100, label: "Users" },
    { value: 120, label: "Wallets" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds
    const steps = 60; // Number of steps in the animation
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      for (let i = 1; i <= steps; i++) {
        setTimeout(() => {
          setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[index] = Math.round((stat.value * i) / steps);
            return newCounts;
          });
        }, stepDuration * i);
      }
    });
  }, []); // Run once when component mounts

  return (
    <section className="w-full py-16 relative overflow-hidden ">
      {/* Top mineral image */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-[90%] h-[20vh] sm:h-48">
        <Image src="/minerals.png" alt="Minerals Background" fill className="object-cover rounded-lg object-bottom" />
      </div>

      {/* Small cube on top left */}
      <div className="absolute left-[3%] top-[5vh] sm:top-8">
        <Image
          src="/cube.png"
          alt="Mineral Cube"
          width={80}
          height={80}
          className="object-contain opacity-80 w-[10vw] max-w-[80px]"
        />
      </div>

      {/* Stats container with dark background */}
      <div className="relative z-10 mx-auto mt-[10vh] sm:mt-24 w-[90%]">
        <div className="bg-[#252E31] rounded-lg p-12 backdrop-blur-sm">
          <motion.div
            className="flex flex-col sm:flex-row items-center sm:items-center gap-8 sm:gap-24 pl-4 sm:pl-12 py-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center sm:items-start py-2">
                <span className="text-3xl sm:text-4xl font-bold text-white bg-fade-white inline-block text-transparent bg-clip-text">
                  +{counts[index]}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mt-2">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Chain symbol */}
          <div className="absolute right-[20%] sm:right-[400px] top-1/2 transform -translate-y-1/2">
            <Image
              src="/chain.png"
              alt="Chain Symbol"
              width={150}
              height={60}
              className="object-contain opacity-90 w-[100px] sm:w-[150px]"
            />
          </div>

          {/* Cube on right */}
          <div className="absolute -right-5 top-1/2 transform -translate-y-1/2">
            <Image src="/cube.png" alt="Chain Symbol" width={60} height={60} className="object-contain opacity-90" />
          </div>
        </div>
      </div>
    </section>
  );
};
