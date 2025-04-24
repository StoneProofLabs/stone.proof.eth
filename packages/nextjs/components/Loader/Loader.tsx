"use client";

import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#111B2B] via-[#2C3C54] to-[#111B2B] z-50">
      <div className="relative">
        {/* Optimized animated hexagon with better performance */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-crystal-500 to-crystal-700 rounded-xl"
          initial={{ scale: 1, rotate: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            // Add GPU acceleration
            type: "tween",
          }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />

        {/* Optimized Stone.proof text */}
        <motion.div
          className="relative z-10 bg-[#0a1522] p-8 rounded-lg border border-gray-800/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <h2 className="text-3xl font-bold text-white font-montserrat mb-2">Stone.proof</h2>
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-crystal-500 rounded-full"
                animate={{
                  y: ["0%", "-50%", "0%"],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                style={{ willChange: "transform" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
