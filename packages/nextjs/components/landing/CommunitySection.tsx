"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const CommunitySection = () => {
  return (
    <section className="w-full py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Mesh pattern in top right */}
      {/* <div className="absolute top-0 right-0 w-full md:w-2/3 h-full opacity-30 pointer-events-none z-0">
        <Image
          src="/mesh-pattern.png"
          alt="Mesh pattern"
          width={800}
          height={600}
          className="object-contain object-right-top"
        />
      </div> */}

      {/* Blue blob on left (original position) */}
      <div className="absolute -left-[160px] bottom-0 w-2/3 h-full opacity-60 pointer-events-none z-0">
        <Image
          src="/blue_blob.png"
          alt="Blue blob"
          width={500}
          height={500}
          className="object-contain object-left-bottom"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white font-montserrat"
          >
            <span className="text-sm uppercase tracking-wider text-gray-400 mb-2 block">
              COMMUNITY-OWNED AND OPERATED
            </span>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-white/100 to-white/40 inline-block text-transparent bg-clip-text flex items-center">
              Enter a Universe <br />
              of Connected <br />
              Services.
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Stoneproof apps and services connect using IBC, the Inter-Blockchain Communication protocol. This
              innovation enables you to freely exchange assets and data across sovereign.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="w-40 bg-gradient-to-r from-white via-white/100 to-white/40 hover:bg-white text-gray-800 font-medium px-8 py-3 rounded-lg transition-colors">
                Learn
              </button>
              <button className="text-white  hover:border-white bg-transparent font-medium px-8 py-3 rounded-full group flex items-center transition-all">
                Connect To Wallet
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white font-montserrat"
          >
            <div className="space-y-12">
              <div className="text-right">
                <h3 className="text-6xl md:text-7xl font-bold mb-1 bg-gradient-to-r from-white via-white/100 to-white/40 inline-block text-transparent bg-clip-text">
                  265<span>+</span>
                </h3>
                <p className="text-lg text-gray-300">Apps & services</p>
              </div>

              <div className="text-right">
                <h3 className="text-6xl md:text-7xl font-bold mb-1 bg-gradient-to-r from-white via-white/100 to-white/40 inline-block text-transparent bg-clip-text">
                  $63B<span>+</span>
                </h3>
                <p className="text-lg text-gray-300">Digital assets</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
