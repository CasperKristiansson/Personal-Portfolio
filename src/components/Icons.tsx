import React from "react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

interface IconsProps {
  dark?: boolean;
}

export const Icons: React.FC<IconsProps> = ({ dark = false }) => {
  const iconColor = dark ? "black" : "white";

  return (
    <div className="fixed top-1/2 left-0 z-[9999] ml-1 hidden -translate-y-1/2 transform flex-col gap-6 lg:flex xl:ml-4">
      <IconBrandLinkedin
        className="rotate-270 cursor-pointer duration-300 ease-in-out hover:scale-110"
        size={44}
        color={iconColor}
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/casperKristiansson/",
            "_blank",
          )
        }
      />
      <IconBrandGithub
        className="rotate-270 cursor-pointer duration-300 ease-in-out hover:scale-110"
        size={44}
        color={iconColor}
        onClick={() =>
          window.open("https://github.com/CasperKristiansson", "_blank")
        }
      />
    </div>
  );
};
