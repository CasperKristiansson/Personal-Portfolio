import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Stars } from "../data/stars";
import { fadeInItem, fadeUpItem, staggerContainer } from "../shared/motion";

const Star: React.FC<{
  top: string;
  left: string;
  size: number;
  glow: string;
  duration: string;
}> = ({ top, left, size, glow, duration }) => {
  return (
    <div
      className="star absolute"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}vh`,
        left: `${left}vw`,
        boxShadow: glow,
        animation: `twinkle ${duration}s infinite alternate ease-in-out`,
      }}
    />
  );
};

export const Hero: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="parallax relative flex h-[80vh] items-center justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="stars-container pointer-events-none fixed inset-0 h-full w-full"
        variants={fadeInItem}
      >
        {Stars.slice(0, Math.floor(windowWidth * 0.15)).map((star, index) => (
          <Star key={index} {...star} />
        ))}
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
