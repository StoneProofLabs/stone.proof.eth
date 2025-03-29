"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

export const SecuritySection = () => {
  return (
    <section className="w-full py-20 px-4 md:px-8 text-white font-montserrat">
      <div className="max-w-7xl mx-auto">
        {/* Top section with 3D shape */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24 mb-24">
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Image
              src="/diamond.png"
              alt="3D blue hexagon"
              width={600}
              height={600}
              className="object-contain drop-shadow-[0_0_50px_rgba(0,100,255,0.4)]"
            />
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl text-fade-white  bg-fade-white inline-block text-transparent bg-clip-text font-bold mb-6 leading-tight font-montserrat">
              Secured by
              <br />
              the stone.
              <br />
              proof.
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl font-montserrat">
              In return for securing the services on the Chain, transaction fees and staking rewards are distributed to
              HEXAGON stakers.
            </p>
            <div className="flex gap-4">
              <button className="bg-fade-white hover:bg-gray-300 text-gray-800 font-medium px-8 py-3 rounded-md transition-colors text-lg font-montserrat">
                Start Staking
              </button>
              <button className="hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-md transition-colors flex items-center text-lg font-montserrat">
                Learn More <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Middle heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold  bg-fade-white inline-block text-transparent bg-clip-text mb-4 font-montserrat">
            Be Part of the Open
            <br />
            Mineral Market of the Future.
          </h2>
          <button className="text-white flex items-center font-medium font-montserrat">
            Powerful features <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Feature 1 - Large left box */}
          <motion.div
            className="bg-[#0a1522]/40 backdrop-blur-sm p-16 rounded-lg border border-gray-800/30 shadow-[0_0_30px_rgba(0,0,0,0.2)] row-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 text-sm text-gray-400 uppercase tracking-wider font-montserrat">
              Blockchain ACCOUNTS
              <br />
              Basic
            </div>
            <div className="flex flex-col gap-8">
              <Image
                src="/sec2.png"
                alt="Safe icon"
                width={240}
                height={240}
                className="object-contain drop-shadow-[0_0_20px_rgba(255,200,0,0.3)]"
              />
              <h3 className="text-4xl bg-fade-white inline-block text-transparent bg-clip-text md:text-5xl font-bold leading-tight font-montserrat tracking-tight w-full">
                One secure
                <br />
                account for all
                <br />
                your digital
                <br />
                assets.
              </h3>
              <div className="text-sm text-gray-400 font-montserrat">COMING SOON</div>
            </div>
          </motion.div>

          {/* Feature 2 - Smaller right top box */}
          <motion.div
            className="bg-[#0a1522]/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800/30 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 text-sm text-gray-400 uppercase tracking-wider font-montserrat">
              DECENTRALIZED EXCHANGE
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl md:text-4xl font-bold leading-tight font-montserrat tracking-tight w-full bg-fade-white inline-block text-transparent bg-clip-text">
                  Swap
                  <br />
                  Minerals &<br />
                  collectibles.
                </h3>
                <Image
                  src="/sec1.png"
                  alt="Gold coin"
                  width={160}
                  height={160}
                  className="object-contain drop-shadow-[0_0_20px_rgba(255,200,0,0.3)]"
                />
              </div>
              <div className="text-sm text-gray-400 font-montserrat">COMING SOON</div>
            </div>
          </motion.div>

          {/* Feature 4 - Smaller right bottom box */}
          <motion.div
            className="bg-[#0a1522]/40 backdrop-blur-sm p-8 rounded-lg border border-gray-800/30 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 text-sm text-gray-400 uppercase tracking-wider font-montserrat">
              Transport Transactions
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl md:text-4xl font-bold leading-tight font-montserrat tracking-tight w-full bg-fade-white inline-block text-transparent bg-clip-text">
                Provide
                <br />
                liquidity,
                <br />
                earn
                <br />
                rewards.
              </h3>
              <div className="text-sm text-gray-400 font-montserrat">COMING SOON</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
