"use client";

// import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
// import { Loader } from "~~/components/Loader/Loader";
import { AboutSection } from "~~/components/landing/AboutSection";
import { FeaturesSection } from "~~/components/landing/FeaturesSection";
import { SecuritySection } from "~~/components/landing/SecuritySection";
import { ServicesSection } from "~~/components/landing/ServicesSection";
import Subscribe from "~~/components/landing/Subscribe";

const Home: NextPage = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // 2 seconds delay

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {@
  //   return <Loader />;
  // }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-transparent">
        <Header />
        <main className="relative flex flex-col flex-1">
          <div className="flex items-center flex-col flex-grow">
            <AboutSection />
            <ServicesSection />
            <SecuritySection />
            <FeaturesSection />
            <Subscribe />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
