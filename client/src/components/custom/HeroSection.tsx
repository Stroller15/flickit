import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div>
        <Image width={500} height={500} src="/assets/vs.png" alt="hero_img" />
      </div>
      <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold">
        Flickit
      </h1>
      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        Spot the Difference, Share Your Preference
      </p>
      <Link href="/login"> 
        <Button className="mt-3">Start Free</Button>
      </Link>
      
    </div>
  );
};

export default HeroSection;
