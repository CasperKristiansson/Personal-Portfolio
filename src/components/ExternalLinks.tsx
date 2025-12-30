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
      className="relative z-10 bg-[#18253F] py-36"
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h1
        className="mx-auto mb-14 max-w-[2000px] text-center text-5xl font-bold text-white sm:pl-10 sm:text-left sm:text-6xl lg:pl-40"
        variants={slideLeftItem}
      >
        External Links
      </motion.h1>
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
