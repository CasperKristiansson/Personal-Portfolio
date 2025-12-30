import { IconAward } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  fadeUpItem,
  slideLeftItem,
  staggerFast,
  viewportOnce,
} from "../shared/motion";

export const Rewards: React.FC = () => {
  return (
    <motion.section
      id="awards"
      className="relative bg-[#18253F] pt-36"
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="pointer-events-none sticky top-0 z-[60] mb-8 flex h-[var(--sticky-nav-offset)] items-center">
        <div className="mx-auto w-full max-w-[1400px] pr-4 pl-10 sm:pr-6 sm:pl-12 lg:pr-10 lg:pl-16">
          <motion.h1
            className="-translate-y-2.5 text-4xl leading-none font-bold text-white sm:text-5xl"
            variants={slideLeftItem}
          >
            Rewards
          </motion.h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-10 2xl:max-w-[1400px]">
        <motion.div
          className="flex items-center gap-2 text-white"
          variants={fadeUpItem}
        >
          <IconAward className="shrink-0" />
          <span>
            <strong>Anna Whitlocks Minnesfond</strong> - Award for exchange
            studies in Japan
          </span>
        </motion.div>
        <motion.div
          className="mt-2 flex items-center gap-2 text-white"
          variants={fadeUpItem}
        >
          <IconAward className="shrink-0" />
          <span>
            <strong>Scandinavia-Japan Sasakawa Foundation</strong> - Award for
            exchange studies in Japan
          </span>
        </motion.div>
        <motion.div
          className="mt-2 flex items-center gap-2 text-white"
          variants={fadeUpItem}
        >
          <IconAward className="shrink-0" />
          <span>
            <strong>Sten Vigrens Stipendiefond</strong> - Award for high grades
            for Highschool education in Information and Media Technology
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};
