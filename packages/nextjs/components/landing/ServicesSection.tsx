"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const ServicesSection = () => {
  const services = [
    {
      title: "Mining",
      description:
        "Set to operate a next-gen decentralized exchange, mapping digital assets across the Interchain, with very low fees and instant transaction confirmation.",
      icon: "/icon.png",
      iconAlt: "Gold coin icon",
    },
    {
      title: "Transport",
      description:
        "With the upcoming Interchain Security feature, IBC/SPof will soon be sending more chains in exchange for additional staking rewards.",
      icon: "/transport.png",
      iconAlt: "Shield icon",
    },
    {
      title: "WareHouse",
      description:
        "A core mission of the Hub – to connect chains by establishing IBC connections with compatible chains and operating decentralized exchanges between Cosmos and Bitcoin.",
      icon: "/warehouse.png",
      iconAlt: "Warehouse icon",
    },
    {
      title: "Market Place",
      description:
        "Located at the crossroads of the Interchain, the Hub is extremely secure, the best place to hold digital assets and manage transactions across the ecosystem.",
      icon: "/market.png",
      iconAlt: "Marketplace icon",
    },
  ];

  return (
    <section className="w-full py-20 px-4 md:px-8 relative overflow-hidden font-montserrat">
      {/* Blue blob at the top */}
      <div className="absolute top-0 left-[57%] -translate-x-1/2 w-full max-w-2xl h-96 opacity-70 pointer-events-none z-0">
        <Image src="/blob.png" alt="Blue blob" width={500} height={400} className="object-contain" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 block">ENTER THE BLOCKCHAIN</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6  leading-tight  bg-fade-white inline-block text-transparent bg-clip-text">
            The Heart of the <br />
            Interchain.
          </h2>
          <p className="text-base max-w-2xl mx-auto text-gray-300 leading-relaxed">
            Serving as the economic center of Stone.proof, the Stone.proof is a blockchain that provides vital services
            to the Blockchain
          </p>
          <br />
          <br />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 relative">
                <Image
                  src={service.icon || "/placeholder.svg"}
                  alt={service.iconAlt}
                  width={120}
                  height={120}
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform hover:scale-110 duration-300"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="bg-gradient-to-r from-white via-white/100 to-white/40 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center mx-auto">
            View Transactions
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
