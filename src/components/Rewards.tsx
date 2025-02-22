import { IconAward } from "@tabler/icons-react";

export const Rewards: React.FC = () => {
  return (
    <div className="relative z-10 bg-[#18253F] pt-36">
      <h1 className="mx-auto mb-14 max-w-[2000px] text-center text-5xl font-bold text-white sm:pl-10 sm:text-left sm:text-6xl lg:pl-40">
        Rewards
      </h1>
      <div className="w-full px-4 sm:px-10 2xl:mx-auto 2xl:max-w-[1400px]">
        <div className="flex items-center gap-2 text-white">
          <IconAward className="shrink-0" />
          <span>
            <strong>Anna Whitlocks Minnesfond</strong> - Award for exchange
            studies in Japan
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-white">
          <IconAward className="shrink-0" />
          <span>
            <strong>Scandinavia-Japan Sasakawa Foundation</strong> - Award for
            exchange studies in Japan
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-white">
          <IconAward className="shrink-0" />
          <span>
            <strong>Sten Vigrens Stipendiefond</strong> - Award for high grades
            for Highschool education in Information and Media Technology
          </span>
        </div>
      </div>
    </div>
  );
};
