"use client";

import type { NextPage } from "next";
import { AboutSection } from "~~/components/landing/AboutSection";
// import { CommunitySection } from "~~/components/landing/CommunitySection";
import { FeaturesSection } from "~~/components/landing/FeaturesSection";
// import { HeroSection } from "~~/components/landing/HeroSection";
import { SecuritySection } from "~~/components/landing/SecuritySection";
import { ServicesSection } from "~~/components/landing/ServicesSection";
// import { StatsSection } from "~~/components/landing/StatsSection";
import Subscribe from "~~/components/landing/Subscribe";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow">
        {/* <StatsSection />  */}
        {/* <HeroSection /> */}
        <AboutSection></AboutSection>
        {/* <CommunitySection /> */}
        <ServicesSection />
        <SecuritySection />
        <FeaturesSection />
        <Subscribe />

        {/* <AboutSection />
        
        
       
        
         */}
      </div>
    </>
  );
};

export default Home;
