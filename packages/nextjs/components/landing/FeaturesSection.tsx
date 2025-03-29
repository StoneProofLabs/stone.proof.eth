"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="w-full py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute -left-[160px] bottom-0 w-2/3 h-full opacity-60 pointer-events-none z-0">
        <Image
          src="/community.png"
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
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 bg-fade-white inline-block text-transparent bg-clip-text">
              Meet the <br />
              worldwide <br />
              community.
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Join a fast-growing community of developers and innovators connected all over the world, building the new
              era of the internet.
            </p>
            <button className="text-white hover:text-gray-300 bg-transparent font-medium py-3 rounded-full group flex items-center transition-all">
              Community
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right content - Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white font-montserrat space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center justify-between">
                Community Chat
                <ArrowUpRight className="h-4 w-4" />
              </h3>
              <p className="text-gray-300">Ask general questions and chat with the worldwide community on Telegram.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center justify-between">
                Twitter
                <ArrowUpRight className="h-4 w-4" />
              </h3>
              <p className="text-gray-300">
                Follow @cronos to get the latest news and updates from across the ecosystem.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center justify-between">
                Developer Chat
                <ArrowUpRight className="h-4 w-4" />
              </h3>
              <p className="text-gray-300">
                Have technical questions about Cronos tools? Ask a developer on the Discord.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center justify-between">
                Stone.proof Forum
                <ArrowUpRight className="h-4 w-4" />
              </h3>
              <p className="text-gray-300">Thinking about becoming a validator or interested in network matters?</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
