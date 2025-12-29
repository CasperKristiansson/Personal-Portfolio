import React from "react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface IconsProps {
  dark?: boolean;
}

export const Icons: React.FC<IconsProps> = ({ dark = false }) => {
  const iconColor = dark ? "black" : "white";

  return (
    <motion.div
      className="fixed top-2 right-2 z-[9999] hidden transform flex-row gap-3 lg:flex"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        type="button"
        className="cursor-pointer border-0 bg-transparent p-0"
        aria-label="Open LinkedIn profile"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/casperKristiansson/",
            "_blank",
          )
        }
      >
        <IconBrandLinkedin size={44} color={iconColor} />
      </motion.button>
      <motion.button
        type="button"
        className="cursor-pointer border-0 bg-transparent p-0"
        aria-label="Open GitHub profile"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() =>
          window.open("https://github.com/CasperKristiansson", "_blank")
        }
      >
        <IconBrandGithub size={44} color={iconColor} />
      </motion.button>
    </motion.div>
  );
};
