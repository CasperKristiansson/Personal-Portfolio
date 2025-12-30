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
      <div className="pointer-events-none sticky top-[calc(var(--sticky-nav-offset)-4rem)] z-[60] mb-8">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <motion.h1
            className="text-4xl font-bold text-white sm:text-5xl"
            variants={slideLeftItem}
          >
            Rewards
          </motion.h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-10 2xl:max-w-[1400px]">
        <motion.div className="flex items-center gap-2 text-white" variants={fadeUpItem}>
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
