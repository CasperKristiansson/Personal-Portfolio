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
      id="about"
      className="relative z-10 flex w-full items-center justify-center overflow-hidden bg-[#18253F] px-2 py-12 sm:px-6 lg:px-10 lg:py-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="relative mt-8 flex w-full max-w-[1400px] flex-col gap-8 rounded-2xl border border-white/10 bg-[#111c32] p-6 shadow-[0_25px_60px_-35px_rgba(3,7,18,0.8)] xl:flex-row xl:items-stretch xl:p-10">
        <motion.img
          src={profilePicture}
          alt="Casper Kristiansson"
          className="w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 md:h-[420px] lg:h-auto lg:w-1/2 xl:w-[45%]"
          variants={fadeUpItem}
        />
        <motion.div
          className="flex w-full flex-col justify-center text-white xl:w-[55%]"
          variants={staggerFast}
        >
          <motion.h2
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            variants={fadeUpItem}
          >
            Hey there, I'm{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
              Casper
            </span>
          </motion.h2>
          <motion.p
            className="mt-5 w-fit rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-sky-200 uppercase sm:text-sm"
            variants={fadeUpItem}
          >
            Co-Founder Driving Scalable Tech Solutions
          </motion.p>
          <motion.p
            className="mt-5 text-base leading-relaxed text-slate-100/90 sm:text-lg"
            variants={fadeUpItem}
          >
            As CTO and co-founder of Klimra, I build and lead cloud native
            products from idea to production. Klimra is part of the SSE Business
            Lab incubator and makes it simple for passengers in Sweden to get
            compensation for delayed trains, including access to on-demand taxis
            for short-distance trips. I own the technical roadmap, architecture,
            and engineering team.
          </motion.p>
          <motion.p
            className="mt-4 text-base leading-relaxed text-slate-100/80 sm:text-lg"
            variants={fadeUpItem}
          >
            In parallel, I work at Scatterin as an early full-stack engineer,
            building a cloud platform for large-scale neutron and synchrotron
            data analysis on AWS. My focus is on turning complex research
            workflows into robust, usable software for industrial customers.
          </motion.p>
          <motion.p
            className="mt-4 text-base leading-relaxed text-slate-100/80 sm:text-lg"
            variants={fadeUpItem}
          >
            My day-to-day work spans product decisions, architecture, and
            hands-on implementation. Typical tools include AWS Lambda, DynamoDB,
            S3, API Gateway, Cognito, Terraform, Python, TypeScript, React, and
            CI/CD. I enjoy designing systems that are secure, cost-efficient,
            and easy to evolve as the team and customer base grow.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};
