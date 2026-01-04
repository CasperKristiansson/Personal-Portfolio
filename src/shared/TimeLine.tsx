import { IconChevronDown, IconChevronUp, IconLink } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { type FC,useEffect, useState } from "react";

import { fadeUpItem, slideLeftItem, viewportOnce } from "./motion";

export type TimelineItem = {
  period: string;
  location: string;
  header: string;
  description: string;
  listItems?: string[];
  tags?: string[];
  tagLimit?: number;
  link: string;
  linkDisplay: string;
  hide?: boolean;
};

const tagBaseClass =
  "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-200/80 uppercase transition duration-200 ease-out hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-white/10 hover:text-slate-100 hover:shadow-[0_10px_25px_-18px_rgba(56,189,248,0.6)] motion-reduce:transform-none motion-reduce:transition-none";

const tagActionClass =
  "relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-200/60 uppercase transition duration-200 ease-out hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-white/10 hover:text-slate-100 hover:shadow-[0_14px_30px_-20px_rgba(56,189,248,0.7)] motion-reduce:transform-none motion-reduce:transition-none before:absolute before:inset-0 before:rounded-full before:bg-sky-400/15 before:opacity-0 before:transition before:duration-300 before:scale-75 hover:before:opacity-100 hover:before:scale-100";

export const TimeLine: FC<{
  timelineItems: TimelineItem[];
  title: string;
  id?: string;
}> = ({ timelineItems, title, id }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isCompact, setIsCompact] = useState(true);
  const [expandedTags, setExpandedTags] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTags = (item: TimelineItem, index: number) => {
    if (!item.tags || item.tags.length === 0) return null;

    const tagLimit = item.tagLimit ?? 6;
    const isExpanded = expandedTags[index] ?? false;
    const visibleTags = isExpanded ? item.tags : item.tags.slice(0, tagLimit);
    const remaining = item.tags.length - visibleTags.length;

    return (
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {visibleTags.map((tag) => (
          <span key={`${item.header}-${tag}`} className={tagBaseClass}>
            {tag}
          </span>
        ))}
        {remaining > 0 && !isExpanded && (
          <button
            type="button"
            className={tagActionClass}
            onClick={() =>
              setExpandedTags((prev) => ({ ...prev, [index]: true }))
            }
          >
            +{remaining} more
          </button>
        )}
        {isExpanded && item.tags.length > tagLimit && (
          <button
            type="button"
            className={tagActionClass}
            onClick={() =>
              setExpandedTags((prev) => ({ ...prev, [index]: false }))
            }
          >
            Show less
          </button>
        )}
      </div>
    );
  };

  return (
    <motion.section
      id={id}
      className="relative bg-[#18253F] pt-36"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className={`
        pointer-events-none mb-10
        md:mb-8
        lg:sticky lg:top-0 lg:z-[60] lg:flex lg:h-[var(--sticky-nav-offset)]
        lg:items-center
      `}>
        <div className={`
          mx-auto w-full max-w-[1400px] px-4
          sm:px-6
          lg:px-10 lg:pl-16
        `}>
          <motion.h1
            className={`
              text-center text-5xl leading-none font-bold text-white
              sm:text-5xl
              md:-translate-y-2.5 md:text-left
            `}
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
              className={`
                px-4
                sm:px-10
              `}
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
                  <ul className={`
                    mt-4 ml-6 list-outside space-y-2 text-[#90a6bb]
                  `}>
                    {item.listItems.map((listItem, index) => (
                      <li
                        key={index}
                        className={`
                          relative list-disc text-base
                          marker:left-0 marker:text-[#90a6bb]
                        `}
                      >
                        {listItem}
                      </li>
                    ))}
                  </ul>
                )}
                {renderTags(item, index)}
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center text-blue-400
                      hover:underline
                    `}
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
          <div className={`
            w-4/5 px-4
            2xl:ml-[1vw]
          `}>
            <ul className={`
              timeline timeline-vertical timeline-snap-icon
              max-md:timeline-compact
            `}>
              {timelineItems.map((item, index) => {
                if (item.hide && isCompact) return null;
                return (
                  <motion.li
                    key={index}
                    style={{ gridTemplateColumns: "1fr auto 2fr" }}
                    className="group mt-[-10px]"
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
                      <div className={`
                        h-6 w-6 cursor-pointer rounded-full bg-[#90A6BB]
                        transition-all duration-300 ease-out
                        group-hover:scale-110 group-hover:bg-emerald-400
                        group-hover:shadow-[0_0_18px_rgba(52,211,153,0.75)]
                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      `} />
                    </div>
                    <div className="timeline-end ml-6 h-full">
                      <div className="text-2xl font-bold text-white">
                        {item.header}
                      </div>
                      <p className="mt-2 text-[#90a6bb]">{item.description}</p>
                      {item.listItems && (
                        <ul className={`
                          mt-4 ml-6 list-outside space-y-2 text-[#90a6bb]
                        `}>
                          {item.listItems.map((listItem, index) => (
                            <li
                              key={index}
                              className={`
                                relative list-disc text-base
                                marker:left-0 marker:text-[#90a6bb]
                              `}
                            >
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      )}
                      {renderTags(item, index)}
                      <div className="mt-4 flex items-center gap-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`
                            flex items-center text-blue-400
                            hover:underline
                          `}
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
