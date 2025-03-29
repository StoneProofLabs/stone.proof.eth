"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const StatsSection = () => {
  const stats = [
    { value: "+100", label: "Companies" },
    { value: "+100", label: "Users" },
    { value: "120+", label: "Wallets" },
  ];

  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/minerals-background.jpg" alt="Minerals Background" fill className="object-cover" />
      </div>

      {/* Decorative mineral on left */}
      <div className="absolute left-16 top-1/2 transform -translate-y-1/2">
        <Image src="/cube.png" alt="Mineral Cube" width={60} height={60} className="object-contain" />
      </div>

      {/* Decorative mineral on right */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
        <Image src="/cube.png" alt="Mineral Cube" width={60} height={60} className="object-contain" />
      </div>

      {/* Stats container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between p-8 rounded-none bg-gray-900/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center py-4 md:py-0">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-sm text-gray-300">{stat.label}</span>
            </div>
          ))}

          {/* Chain/link symbol */}
          <div className="hidden md:block">
            <Image src="/chain.png" alt="Chain Symbol" width={120} height={80} className="object-contain" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
