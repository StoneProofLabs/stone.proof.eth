"use client";

// import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { AboutSection } from "~~/components/landing/AboutSection";
import { FeaturesSection } from "~~/components/landing/FeaturesSection";
import { SecuritySection } from "~~/components/landing/SecuritySection";
import { ServicesSection } from "~~/components/landing/ServicesSection";
import Subscribe from "~~/components/landing/Subscribe";

const Home: NextPage = () => {
  

  return (
    <>
      <div className="flex items-center flex-col flex-grow">

        {/* <AboutSection /> */}
        {/* <ServicesSection />
        <SecuritySection />
        <FeaturesSection />
        <Subscribe /> */}


      </div>
      ;
    </>
  );
};

export default Home;
