import { motion } from "framer-motion";
import React, { useRef } from "react";

import { fadeInItem, fadeUpItem, staggerContainer } from "../shared/motion";
import { HeroStarfieldCanvas } from "./HeroStarfieldCanvas";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={heroRef}
      className="parallax relative flex h-[calc(100svh-95px)] items-center justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 h-full w-full"
        variants={fadeInItem}
      >
        <HeroStarfieldCanvas containerRef={heroRef} />
      </motion.div>
      <motion.h1
        className="relative z-10 text-3xl font-bold text-white sm:text-6xl md:text-7xl"
        variants={fadeUpItem}
      >
        <span className="typewriter">Casper Kristiansson.</span>
      </motion.h1>
    </motion.div>
  );
};
