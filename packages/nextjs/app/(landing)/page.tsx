"use client";

// import { useEffect, useState } from "react";
import Faq from "../../components/landing/Faq";
import type { NextPage } from "next";
import CallToAction from "~~/components/landing/CallToAction";
import Ecosystem from "~~/components/landing/Ecosystem";
import Features from "~~/components/landing/Features";
import Hero from "~~/components/landing/Hero";
import Unique from "~~/components/landing/Unique";

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
