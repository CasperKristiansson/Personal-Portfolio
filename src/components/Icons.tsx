import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { motion } from "framer-motion";
import type { FC } from "react";

interface IconsProps {
  dark?: boolean;
}

export const Icons: FC<IconsProps> = ({ dark = false }) => {
  const iconColor = dark ? "#e2e8f0" : "white";

  return (
    <motion.div
      className={`
        fixed top-4 right-5 z-9999 hidden transform flex-row items-center gap-3
        rounded-full border border-white/10 bg-[#0b1224]/80 px-3 py-2
        shadow-[0_18px_45px_-30px_rgba(15,23,42,0.9)] backdrop-blur
        lg:flex
      `}
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
        <IconBrandLinkedin size={40} color={iconColor} />
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
        <IconBrandGithub size={40} color={iconColor} />
      </motion.button>
    </motion.div>
  );
};
