import { motion } from "framer-motion";
import type { FC } from "react";
import { Link } from "react-router";

import { fadeUpItem, pageVariants } from "../shared/motion";

export const NotFound: FC = () => {
  return (
    <motion.div
      className={`flex min-h-screen flex-col items-center justify-center bg-[#18253F] p-10`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={`text-center text-[60px] leading-none font-extrabold text-blue-300 sm:text-[120px]`}
        variants={fadeUpItem}
      >
        404
      </motion.div>
      <motion.h1
        className={`text-center text-4xl font-extrabold text-white sm:text-3xl`}
        variants={fadeUpItem}
      >
        Page not found
      </motion.h1>
      <motion.p
        className="mt-6 mb-8 max-w-xl text-center text-lg text-blue-200"
        variants={fadeUpItem}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>
      <motion.div variants={fadeUpItem}>
        <Link to={"/"} className="btn btn-primary">
          Go back home
        </Link>
      </motion.div>
    </motion.div>
  );
};
