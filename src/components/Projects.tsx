import React, { useEffect, useMemo } from "react";
import clsx from "clsx";
import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";
import {
  fadeUpItem,
  staggerContainer,
  staggerFast,
  viewportOnce,
} from "../shared/motion";

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111c32]/90 p-5 shadow-[0_18px_45px_-35px_rgba(3,7,18,0.85)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_60px_-40px_rgba(14,165,233,0.35)] focus-within:ring-2 focus-within:ring-sky-300/60 motion-reduce:transform-none motion-reduce:transition-none";

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-20px_rgba(14,165,233,0.8)] transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 motion-reduce:transition-none";

const secondaryCta =
  "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-sky-300/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 motion-reduce:transition-none";

type ImageFrameProps = {
  src: string;
  alt: string;
  aspectClass: string;
  loading?: "lazy" | "eager";
};

const ImageFrame: React.FC<ImageFrameProps> = ({
  src,
  alt,
  aspectClass,
  loading = "lazy",
}) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border border-white/10 bg-[#0b1428]",
        aspectClass,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1428]/60 via-transparent to-transparent opacity-80" />
    </div>
  );
};

const TagList: React.FC<{
  tags: string[];
  max?: number;
  size?: "default" | "compact";
}> = ({ tags, max = 3, size = "default" }) => {
  const visible = tags.slice(0, max);
  const remaining = tags.length - visible.length;
  const tagClass =
    size === "compact" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]";

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {visible.map((tag) => (
        <span
          key={tag}
          className={clsx(
            "rounded-full border border-white/10 bg-white/5 font-semibold tracking-wide whitespace-nowrap text-slate-200/80 uppercase",
            tagClass,
          )}
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className={clsx(
            "rounded-full border border-white/10 bg-white/5 font-semibold tracking-wide whitespace-nowrap text-slate-200/60 uppercase",
            tagClass,
          )}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
};

export const Projects: React.FC = () => {
  const locationRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get("scrollTo");
    if (scrollTo === "projects" && locationRef.current) {
      locationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const { spotlight, featured, notable, more } = useMemo(() => {
    const featuredItems = projects.filter(
      (project) => project.tier === "featured",
    );
    const spotlightItem =
      featuredItems.find((project) => project.spotlight) ?? featuredItems[0];
    return {
      spotlight: spotlightItem,
      featured: featuredItems.filter(
        (project) => project.id !== spotlightItem?.id,
      ),
      notable: projects.filter((project) => project.tier === "notable"),
      more: projects.filter((project) => project.tier === "more"),
    };
  }, []);

  const combinedHighlights = useMemo(() => {
    if (!spotlight) {
      return [...featured, ...notable];
    }
    return [spotlight, ...featured, ...notable];
  }, [spotlight, featured, notable]);

  const highlightLayout: Record<
    string,
    { cardClass: string; imageAspect: string }
  > = {
    "finance-tracker": {
      cardClass: "lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3",
      imageAspect: "aspect-[16/6]",
    },
    "pydantic-fixturegen": {
      cardClass: "lg:col-start-4 lg:col-end-6 lg:row-start-1 lg:row-end-2",
      imageAspect: "aspect-[16/5]",
    },
    "cpython-patch-pr-action": {
      cardClass: "lg:col-start-4 lg:col-end-6 lg:row-start-2 lg:row-end-3",
      imageAspect: "aspect-[16/5]",
    },
    pktraffic: {
      cardClass: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",
      imageAspect: "aspect-[4/3]",
    },
    "podcast-tracker": {
      cardClass: "lg:col-start-3 lg:col-end-6 lg:row-start-3 lg:row-end-4",
      imageAspect: "aspect-[16/7]",
    },
    "react-whiteboard-studio": {
      cardClass: "lg:col-start-4 lg:col-end-6 lg:row-start-4 lg:row-end-5",
      imageAspect: "aspect-[16/10]",
    },
    movieboxdb: {
      cardClass: "lg:col-start-1 lg:col-end-4 lg:row-start-4 lg:row-end-5",
      imageAspect: "aspect-[16/7]",
    },
  };

  const compactHighlightIds = new Set([
    "pydantic-fixturegen",
    "cpython-patch-pr-action",
  ]);

  if (!spotlight) {
    return null;
  }

  return (
    <motion.section
      id="projects"
      className="relative bg-[#18253F] pt-28 pb-28"
      ref={locationRef}
      variants={staggerContainer}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.div
        className="pointer-events-none mb-10 md:sticky md:top-0 md:z-[60] md:mb-0 md:flex md:h-[var(--sticky-nav-offset)] md:items-center"
        variants={staggerFast}
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 lg:pl-16">
          <motion.h1
            className="text-center text-5xl leading-none font-bold text-white sm:text-5xl md:-translate-y-2.5 md:text-left"
            variants={fadeUpItem}
          >
            Projects
          </motion.h1>
        </div>
      </motion.div>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 pt-0 sm:px-6 lg:px-10">
        <div>
          <div className="mt-1 grid grid-cols-1 gap-5 md:grid-cols-2 lg:auto-rows-[minmax(220px,auto)] lg:grid-cols-5">
            {combinedHighlights.map((project) => {
              const layout = highlightLayout[project.id] ?? {
                cardClass: "lg:col-span-2",
                imageAspect: "aspect-[16/10]",
              };
              const isSpotlight = project.id === spotlight.id;
              const isCompact = compactHighlightIds.has(project.id);
              return (
                <motion.article
                  key={project.id}
                  className={clsx(
                    cardBase,
                    isCompact ? "h-auto p-3" : "h-auto p-4",
                    layout.cardClass,
                    isSpotlight &&
                      "rounded-3xl border-sky-300/30 bg-gradient-to-br from-[#111c32] via-[#121d38] to-[#0d1934]",
                  )}
                  variants={fadeUpItem}
                >
                  <ImageFrame
                    src={project.image}
                    alt={project.title}
                    aspectClass={layout.imageAspect}
                    loading={isSpotlight ? "eager" : "lazy"}
                  />
                  <div className="mt-4 flex flex-1 flex-col">
                    {isSpotlight && (
                      <span className="w-fit rounded-full border border-sky-300/40 bg-sky-300/15 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-sky-100/90 uppercase">
                        Spotlight
                      </span>
                    )}
                    <h3
                      className={clsx(
                        "mt-2 font-semibold text-white",
                        isSpotlight
                          ? "text-2xl sm:text-3xl"
                          : "text-lg sm:text-xl",
                        isCompact && "text-base sm:text-lg",
                      )}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={clsx(
                        "mt-2 text-sm text-slate-300",
                        isSpotlight
                          ? "line-clamp-2 sm:text-base"
                          : "line-clamp-2",
                        isCompact && "text-xs sm:text-sm",
                      )}
                    >
                      {project.summary}
                    </p>
                    {isSpotlight && project.outcome && (
                      <p className="mt-3 rounded-xl border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-sm text-sky-100/90">
                        {project.outcome}
                      </p>
                    )}
                    <TagList
                      tags={project.tags}
                      max={isSpotlight ? 4 : 3}
                      size={isCompact ? "compact" : "default"}
                    />
                    <div
                      className={clsx(
                        "flex flex-wrap gap-3",
                        isSpotlight ? "mt-4" : "mt-auto",
                        isCompact ? "pt-3" : "pt-4",
                      )}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={clsx(
                            secondaryCta,
                            isCompact && "px-3 py-1.5 text-xs",
                          )}
                        >
                          Live
                        </a>
                      )}
                      <Link
                        to={project.path}
                        className={clsx(
                          primaryCta,
                          isCompact && "px-3 py-1.5 text-xs",
                        )}
                      >
                        {isSpotlight ? "Case Study" : "Details"}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                More projects
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                A horizontal gallery for the rest of the portfolio.
              </p>
            </div>
          </div>

          <div
            className="mt-8 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overflow-y-visible pr-2 pb-8"
            aria-label="More projects"
          >
            {more.map((project) => (
              <motion.article
                key={project.id}
                className={clsx(
                  cardBase,
                  "min-h-[360px] min-w-[240px] snap-start self-stretch p-4 sm:min-h-[400px] sm:min-w-[300px] lg:min-h-[420px] lg:min-w-[340px]",
                )}
                variants={fadeUpItem}
              >
                <ImageFrame
                  src={project.image}
                  alt={project.title}
                  aspectClass="aspect-[16/9]"
                />
                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-1 text-sm text-slate-300">
                    {project.summary}
                  </p>
                  <TagList tags={project.tags} max={3} />
                  <div className="mt-auto pt-4">
                    <Link to={project.path} className={primaryCta}>
                      Details
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
