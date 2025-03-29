"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CommunitySection } from "./CommunitySection";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const AboutSection = () => {
  // Set up Embla Carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  );

  // For dots navigation
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // For previous and next buttons
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Carousel items
  const carouselItems = [
    {
      id: 1,
      title: "Extensive Audits",
      description:
        "All the mining activities are controlled by integrity professionals that provide pure quality of information and prevent manipulation and prevent counterfeiting and fraud from bad actors.",
    },
    {
      id: 2,
      title: "Secure Transactions",
      description:
        "All the mining activities are controlled by integrity professionals that provide pure quality of information and prevent manipulation and prevent counterfeiting and fraud from bad actors.",
    },
    {
      id: 3,
      title: "Transparent Supply Chain",
      description:
        "All the mining activities are controlled by integrity professionals that provide pure quality of information and prevent manipulation and prevent counterfeiting and fraud from bad actors.",
    },
    {
      id: 4,
      title: "Blockchain Verification",
      description:
        "All the mining activities are controlled by integrity professionals that provide pure quality of information and prevent manipulation and prevent counterfeiting and fraud from bad actors.",
    },
  ];

  return (
    <section id="about" className="w-full py-16 relative overflow-hidden">
      {/* Wave pattern background - moved higher */}
      <div className="absolute inset-x-0 -top-48 h-[1000px] -mx-48 z-0">
        <Image src="/wave.png" alt="Wave pattern background" fill className="object-cover opacity-70" />
      </div>

      {/* Header with wave background behind it */}
      <div className="text-center mb-12 text-white relative z-20">
        <h2 className="text-5xl md:text-6xl font-bold mb-2 font-montserrat">Meet Stoneproof</h2>
        <p className="text-lg text-white/80 font-montserrat">Supply chain management for minerals.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Carousel container */}
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {carouselItems.map(item => (
                <div
                  key={item.id}
                  className="min-w-[85%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] pl-4 flex-shrink-0"
                >
                  <motion.div
                    className="bg-transparent rounded-lg overflow-hidden h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative h-64 w-full">
                      <Image src="/crystal.png" alt="Golden mineral crystal" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold mb-2 font-montserrat">{item.title}</h3>
                        <p className="text-sm text-white/80 mb-4 font-montserrat">{item.description}</p>
                        <div className="flex items-center text-[#4ecdc4] text-sm font-medium cursor-pointer group font-montserrat">
                          <span>More</span>
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 -ml-2 hidden md:block"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10 -mr-2 hidden md:block"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-[#4ecdc4]" : "bg-white/30"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Community Section with its own background */}
      <div className="relative">
        <CommunitySection />
      </div>
    </section>
  );
};
