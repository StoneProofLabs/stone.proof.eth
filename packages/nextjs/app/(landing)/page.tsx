"use client";

// import { useEffect, useState } from "react";
import type { NextPage } from "next";
import  Hero  from "~~/components/landing/Hero";
import Features from "~~/components/landing/Features";
import Unique from "~~/components/landing/Unique";
import Ecosystem from "~~/components/landing/Ecosystem";


const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Unique />
      <Ecosystem />
      
    </>
  );
};

export default Home;
