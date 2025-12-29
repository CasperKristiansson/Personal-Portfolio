import React from "react";
import { motion } from "framer-motion";
import profilePicture from "../assets/profilePicture.jpg";
import {
  fadeUpItem,
  staggerContainer,
  staggerFast,
  viewportOnce,
} from "../shared/motion";

export const About: React.FC = () => {
  return (
    <motion.section
      className="relative z-10 flex w-full items-center justify-center bg-[#18253F] p-2 lg:p-6 xl:p-10"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mt-12 flex w-full max-w-[1400px] flex-col items-center gap-6 rounded-lg bg-[#182642] p-4 shadow-lg xl:flex-row xl:items-start">
        <motion.img
          src={profilePicture}
          alt="Casper Kristiansson"
          className="mb-4 h-1/2 w-full rounded-lg object-cover shadow-xl md:mb-0 lg:w-3/5 xl:w-1/2"
          variants={fadeUpItem}
        />
        <motion.div
          className="mt-4 w-full max-w-[750px] text-white lg:mt-6 xl:mt-8 xl:w-full xl:max-w-full"
          variants={staggerFast}
        >
          <motion.h2 className="text-3xl font-bold" variants={fadeUpItem}>
            Hey there, I'm Casper
          </motion.h2>
          <motion.p className="mt-4 font-bold italic" variants={fadeUpItem}>
            Co-Founder Driving Scalable Tech Solutions
          </motion.p>
          <motion.p className="mt-2" variants={fadeUpItem}>
            As the co-founder of two impactful companies, I am passionate about
            building scalable, innovative solutions. Klimra simplifies the
            process of claiming compensation for delayed train journeys in
            Sweden, while my U.S.-based traffic analytics firm focuses on
            advanced traffic data collection and analysis. Both ventures
            showcase my expertise in full-stack and cloud development, as well
            as my ability to lead projects from concept to execution.
          </motion.p>
          <motion.p className="mt-2" variants={fadeUpItem}>
            In addition to my entrepreneurial endeavors, I’ve worked extensively
            at Scatterin, where I developed a cloud-based platform for real-time
            data analysis of neutron and synchrotron experiments, handling
            large-scale datasets through AWS infrastructure.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};
