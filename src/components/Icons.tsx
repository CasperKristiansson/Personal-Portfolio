import React from "react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

interface IconsProps {
  dark?: boolean;
}

export const Icons: React.FC<IconsProps> = ({ dark = false }) => {
  const iconColor = dark ? "black" : "white";

  return (
    <div className="fixed top-2 right-2 z-[9999] hidden transform flex-row gap-3 lg:flex">
      <IconBrandLinkedin
        className="cursor-pointer duration-300 ease-in-out hover:scale-110"
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
        className="cursor-pointer duration-300 ease-in-out hover:scale-110"
        size={44}
        color={iconColor}
        onClick={() =>
          window.open("https://github.com/CasperKristiansson", "_blank")
        }
      />
    </div>
  );
};
