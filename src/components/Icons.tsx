import React from "react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

export const Icons: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-0 z-[9999] ml-1 hidden -translate-y-1/2 transform flex-col gap-6 lg:flex xl:ml-4">
      <IconBrandLinkedin
        className="rotate-270 cursor-pointer duration-300 ease-in-out hover:scale-110"
        size={44}
        color="white"
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
        color="white"
        onClick={() =>
          window.open("https://github.com/CasperKristiansson", "_blank")
        }
      />
    </div>
  );
};
