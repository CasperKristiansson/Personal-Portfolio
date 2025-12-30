import { IconChevronDown, IconChevronUp, IconLink } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUpItem, slideLeftItem, viewportOnce } from "./motion";

export type TimelineItem = {
  period: string;
  location: string;
  header: string;
  description: string;
  listItems?: string[];
  link: string;
  linkDisplay: string;
  hide?: boolean;
};

export const TimeLine: React.FC<{
  timelineItems: TimelineItem[];
  title: string;
  id?: string;
}> = ({ timelineItems, title, id }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isCompact, setIsCompact] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      id={id}
      className="relative bg-[#18253F] pt-36"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="pointer-events-none mb-8 md:sticky md:top-0 md:z-[60] md:flex md:h-[var(--sticky-nav-offset)] md:items-center">
        <div className="mx-auto w-full max-w-[1400px] pr-4 pl-10 sm:pr-6 sm:pl-12 lg:pr-10 lg:pl-16">
          <motion.h1
            className="text-4xl leading-none font-bold text-white sm:text-5xl md:-translate-y-2.5"
            variants={slideLeftItem}
          >
            {title}
          </motion.h1>
        </div>
      </div>
      {isSmallScreen ? (
        timelineItems.map((item, index) => {
          if (item.hide && isCompact) return null;
          return (
            <motion.div
              key={index}
              className="px-4 sm:px-10"
              variants={fadeUpItem}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h1 className="text-xl font-bold text-white">{item.location}</h1>
              <p className="mt-2 text-[#90a6bb]">{item.period}</p>
              <div className="">
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
              </div>
              {index !== timelineItems.length - 1 && <div className="mb-10" />}
            </motion.div>
          );
        })
      ) : (
        <div className="mx-auto w-full max-w-[1800px]">
          <div className="w-4/5 px-4 2xl:ml-[1vw]">
            <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
              {timelineItems.map((item, index) => {
                if (item.hide && isCompact) return null;
                return (
                  <motion.li
                    key={index}
                    style={{ gridTemplateColumns: "1fr auto 2fr" }}
                    className="mt-[-10px]"
                    variants={fadeUpItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
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
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {timelineItems.filter((item) => item.hide).length !== 0 && (
        <div className="mx-auto mt-10 flex w-full max-w-[1800px] justify-center">
          <motion.button
            className="btn w-48 btn-primary"
            onClick={() => setIsCompact(!isCompact)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCompact ? <IconChevronDown /> : <IconChevronUp />} More
          </motion.button>
        </div>
      )}
    </motion.section>
  );
};
