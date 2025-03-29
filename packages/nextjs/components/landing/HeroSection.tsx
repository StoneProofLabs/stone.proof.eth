"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="w-full py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Future of <span className="text-primary">Mineral Trading</span> is Here
          </h1>
          <div className="max-w-3xl mx-auto space-y-4 text-xl md:text-2xl text-center text-neutral-content">
            <p>Serving as the economic center of Stone.proof,</p>
            <p>the Stone.proof is a blockchain that provides</p>
            <p>vital services to the Blockchain</p>
          </div>
          <p className="text-lg md:text-xl mb-8 text-base-content/80 max-w-xl">
            Stoneproof revolutionizes how minerals are traded, stored, and verified with blockchain technology. Secure,
            transparent, and efficient.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/debug" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link href="#about" className="btn btn-outline btn-lg">
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="lg:w-1/2 relative h-[400px] w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute w-full h-full">
            {/* Floating minerals - we'll use placeholder divs for now */}
            <motion.div
              className="absolute top-[20%] left-[20%] w-24 h-24 bg-primary/20 rounded-xl"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-[50%] right-[30%] w-16 h-16 bg-secondary/30 rounded-xl"
              animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-[20%] left-[40%] w-20 h-20 bg-accent/20 rounded-xl"
              animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Main image placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-base-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">Stoneproof</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
