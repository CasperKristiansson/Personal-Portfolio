import cisco from "../assets/other/cisco.webp";
import eoa from "../assets/other/eoa.jpg";
import eoab from "../assets/other/eoab.png";
import { motion } from "framer-motion";
import {
  fadeUpItem,
  slideLeftItem,
  staggerContainer,
  viewportOnce,
} from "../shared/motion";

const certifications = [
  {
    image: eoab,
    description: "Elements of AI - Building AI",
    relation: "University of Helsinki",
    link: "https://certificates.mooc.fi/validate/pgcyqu3vdma",
  },
  {
    image: eoa,
    description: "Elements of AI - Introduction to AI",
    relation: "University of Helsinki",
    link: "https://certificates.mooc.fi/validate/c6d987p5jlk",
  },
  {
    image: cisco,
    description: "CCNA: Enterprise Networking, Security, and Automation",
    relation: "Cisco",
    link: "https://www.credly.com/badges/e2da5183-4b4a-45dc-ad20-d6fbc4ad3524?source=linked_in_profile",
  },
  {
    image: cisco,
    description: "CCNA: Switching, Routing, and Wireless Essentials",
    relation: "Cisco",
    link: "https://www.credly.com/badges/ef60012e-e90f-4d59-af73-1c3eeab48e9d?source=linked_in_profile",
  },
];

export const Certificates: React.FC = () => {
  return (
    <motion.section
      id="certifications"
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
            Certifications
          </motion.h1>
        </div>
      </div>
      <div className="w-full px-4 sm:px-10 2xl:mx-auto 2xl:max-w-[1400px]">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={staggerContainer}
        >
          {certifications.map((certification, index) => (
            <motion.div
              key={index}
              className="card card-side bg-[#111c32] shadow-xl"
              variants={fadeUpItem}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <figure className="h-60 w-60 bg-[#111c32]">
                <img
                  src={certification.image}
                  alt={certification.description}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body h-60 w-60 p-4 text-white">
                <h2 className="card-title">{certification.relation}</h2>
                <p>{certification.description}</p>
                <div className="card-actions">
                  <button
                    className="btn w-44 btn-primary"
                    onClick={() => window.open(certification.link, "_blank")}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
