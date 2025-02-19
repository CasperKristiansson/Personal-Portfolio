import { IconLink } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export type TimelineItem = {
  period: string;
  location: string;
  header: string;
  description: string;
  listItems?: string[];
  link: string;
  linkDisplay: string;
};

export const TimeLine: React.FC<{
  timelineItems: TimelineItem[];
  title: string;
}> = ({ timelineItems, title }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative z-10 bg-[#18253F] pt-36">
      <h1 className="mx-auto mb-14 max-w-[2000px] text-center text-6xl font-bold text-white sm:pl-10 sm:text-left lg:pl-40">
        {title}
      </h1>
      {isSmallScreen ? (
        timelineItems.map((item, index) => (
          <div key={index} className="px-4 sm:px-10">
            <h1 className="text-xl font-bold text-white">{item.location}</h1>
            <p className="mt-2 text-[#90a6bb]">{item.period}</p>
            <div className="">
              <div className="text-2xl font-bold text-white">{item.header}</div>
              <p className="mt-2 text-[#90a6bb]">{item.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:underline"
                >
                  <IconLink className="mr-1" />
                  {item.linkDisplay}
                </a>
              </div>
            </div>
            {index !== timelineItems.length - 1 && <div className="mb-10" />}
          </div>
        ))
      ) : (
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="w-full px-4 xl:w-4/5 2xl:ml-[2vw]">
            <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
              {timelineItems.map((item, index) => (
                <li
                  key={index}
                  style={{ gridTemplateColumns: "1fr auto 2fr" }}
                  className="mt-[-10px]"
                >
                  <div className="timeline-start mr-6 h-full">
                    <h1 className="text-end text-xl font-bold text-white">
                      {item.location}
                    </h1>
                    <p className="mt-2 text-end text-[#90a6bb]">
                      {item.period}
                    </p>
                  </div>
                  <div className="timeline-middle">
                    <div className="h-6 w-6 cursor-pointer rounded-full bg-[#90A6BB] transition-all duration-300 hover:bg-[#0f0] hover:shadow-2xl hover:shadow-green-500" />
                  </div>
                  <div className="timeline-end ml-6 h-full">
                    <div className="text-2xl font-bold text-white">
                      {item.header}
                    </div>
                    <p className="mt-2 text-[#90a6bb]">{item.description}</p>
                    {item.listItems && (
                      <ul className="mt-4 ml-6 list-outside space-y-2 text-[#90a6bb]">
                        {item.listItems.map((listItem, index) => (
                          <li
                            key={index}
                            className="relative list-disc text-base marker:left-0 marker:text-[#90a6bb]"
                          >
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex items-center gap-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:underline"
                      >
                        <IconLink className="mr-1" />
                        {item.linkDisplay}
                      </a>
                    </div>
                    {index !== timelineItems.length - 1 && (
                      <div className="mb-20" />
                    )}
                  </div>
                  <hr className="bg-[#094a68]" style={{ width: "2px" }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
