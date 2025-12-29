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
      className="relative z-10 bg-[#18253F] pt-36"
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h1
        className="mx-auto mb-14 max-w-[2000px] text-center text-5xl font-bold text-white sm:pl-10 sm:text-left sm:text-6xl lg:pl-40"
        variants={slideLeftItem}
      >
        Rewards
      </motion.h1>
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
