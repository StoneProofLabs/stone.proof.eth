"use client";

// import { useEffect, useState } from "react";
import type { NextPage } from "next";
import  Hero  from "~~/components/landing/Hero";
import Features from "~~/components/landing/Features";
import Unique from "~~/components/landing/Unique";
import Ecosystem from "~~/components/landing/Ecosystem";
import CallToAction from "~~/components/landing/CallToAction";
import Faq from "../../components/landing/Faq";

const Home: NextPage = () => {
  return (
   <>
      <Hero />
      <Features />
      <Unique />
      <Ecosystem />
      <CallToAction />
      <Faq />
    </>
    
  );
};

export default Home;
