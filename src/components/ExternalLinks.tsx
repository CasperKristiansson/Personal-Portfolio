import { IconLink } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  fadeUpItem,
  slideLeftItem,
  staggerFast,
  viewportOnce,
} from "../shared/motion";

export const ExternalLinks: React.FC = () => {
  const openPdf = (file: string) => {
    window.open(file, "_blank");
  };

  return (
    <motion.section
      id="external-links"
      className="relative bg-[#18253F] py-36"
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="pointer-events-none sticky top-0 z-[60] mb-8 flex h-[var(--sticky-nav-offset)] items-center">
        <div className="mx-auto w-full max-w-[1400px] pl-10 pr-4 sm:pl-12 sm:pr-6 lg:pl-16 lg:pr-10">
          <motion.h1
            className="-translate-y-2 text-4xl font-bold leading-none text-white sm:text-5xl"
            variants={slideLeftItem}
          >
            External Links
          </motion.h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-10 2xl:max-w-[1400px]">
        <motion.ul className="list-disc space-y-4 text-lg text-white" variants={staggerFast}>
          <motion.a
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center text-blue-400 hover:underline"
            onClick={() => openPdf("/files/cv.pdf")}
            variants={fadeUpItem}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
          >
            <IconLink className="mr-1 shrink-0" />
            CV - English
          </motion.a>
          <motion.a
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center text-blue-400 hover:underline"
            onClick={() => openPdf("/files/recommendationLetter.pdf")}
            variants={fadeUpItem}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
          >
            <IconLink className="mr-1 shrink-0" />
            Recommendation Letter - Embry Riddle Aeronautical University
          </motion.a>
        </motion.ul>
      </div>
    </motion.section>
  );
};
