import { motion } from "framer-motion";
import { Link } from "react-router";

import cloudComputing from "../assets/other/cloudComputing.png";
import thesis from "../assets/other/thesis.png";
import {
  fadeUpItem,
  slideLeftItem,
  staggerContainer,
  viewportOnce,
} from "../shared/motion";

export const Papers: React.FC = () => {
  return (
    <motion.section
      id="papers"
      className="relative bg-[#18253F] pt-36"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="pointer-events-none mb-10 md:mb-8 lg:sticky lg:top-0 lg:z-[60] lg:flex lg:h-[var(--sticky-nav-offset)] lg:items-center">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 lg:pl-16">
          <motion.h1
            className="text-center text-5xl leading-none font-bold text-white sm:text-5xl md:-translate-y-2.5 md:text-left"
            variants={slideLeftItem}
          >
            Papers
          </motion.h1>
        </div>
      </div>
      <div className="relative mx-auto h-[600px] w-full max-w-[1320px] overflow-hidden rounded-lg px-2">
        <motion.img
          className="hidden h-[600px] w-full rounded-lg object-cover sm:flex"
          src={cloudComputing}
          alt="Cloud Computing"
          variants={fadeUpItem}
        />
        <div className="absolute top-0 left-0 flex h-full w-full items-center px-4 sm:ml-4">
          <motion.div
            className="card mx-auto w-96 rounded-lg glass shadow-lg sm:mx-0"
            variants={fadeUpItem}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <figure>
              <img
                className="rounded-t-lg"
                src={thesis}
                alt="thesis paper overview"
              />
            </figure>
            <div className="card-body p-4 px-6 text-white sm:text-black">
              <h2 className="card-title">
                Cloud Computing Pricing and Deployment Efforts
              </h2>
              <p>
                Navigating Cloud Computing Pricing and Deployment Efforts:
                Exploring the Public-Private Landscape
              </p>
              <div className="mt-10 card-actions">
                <Link to="/papers/cloud-computing">
                  <button className="btn btn-primary">Read More</button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
