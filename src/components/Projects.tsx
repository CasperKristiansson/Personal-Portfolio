import React, { useEffect, useMemo, useState } from "react";
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

const filterOrder = [
  "All",
  "Product",
  "Web",
  "Open Source",
  "DevOps",
  "AI/ML",
  "Cloud",
  "Sustainability",
];

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

const TagList: React.FC<{ tags: string[]; max?: number }> = ({
  tags,
  max = 3,
}) => {
  const visible = tags.slice(0, max);
  const remaining = tags.length - visible.length;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {visible.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200/80 whitespace-nowrap"
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200/60 whitespace-nowrap">
          +{remaining}
        </span>
      )}
    </div>
  );
};

export const Projects: React.FC = () => {
  const locationRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");

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

  const filters = useMemo(() => {
    const categories = new Set<string>();
    projects
      .filter((project) => project.tier !== "featured")
      .forEach((project) =>
        project.categories.forEach((category) => categories.add(category)),
      );

    const ordered = filterOrder.filter(
      (category) => category === "All" || categories.has(category),
    );
    const extras = Array.from(categories)
      .filter((category) => !filterOrder.includes(category))
      .sort((a, b) => a.localeCompare(b));

    return [...ordered, ...extras];
  }, []);

  const combinedHighlights = useMemo(
    () => [...featured, ...notable],
    [featured, notable],
  );

  const highlightFiltered = useMemo(
    () =>
      combinedHighlights.filter(
        (project) =>
          activeFilter === "All" || project.categories.includes(activeFilter),
      ),
    [combinedHighlights, activeFilter],
  );

  const moreFiltered = useMemo(
    () =>
      more.filter(
        (project) =>
          activeFilter === "All" || project.categories.includes(activeFilter),
      ),
    [more, activeFilter],
  );

  const mosaicLayout = [
    {
      cardClass: "lg:col-span-4 lg:row-span-2",
      imageAspect: "aspect-[16/9]",
    },
    {
      cardClass: "lg:col-span-2 lg:row-span-2",
      imageAspect: "aspect-[16/10]",
    },
    {
      cardClass: "lg:col-span-3 lg:row-span-1",
      imageAspect: "aspect-[16/9]",
    },
    {
      cardClass: "lg:col-span-3 lg:row-span-1",
      imageAspect: "aspect-[16/9]",
    },
    {
      cardClass: "lg:col-span-2 lg:row-span-1",
      imageAspect: "aspect-[16/10]",
    },
    {
      cardClass: "lg:col-span-4 lg:row-span-1",
      imageAspect: "aspect-[16/9]",
    },
  ];

  if (!spotlight) {
    return null;
  }

  return (
    <motion.section
      className="relative z-10 bg-[#18253F] pb-28 pt-28"
      ref={locationRef}
      variants={staggerContainer}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 px-4 sm:px-6 lg:px-10">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          variants={staggerFast}
        >
          <div>
            <motion.h1
              className="text-4xl font-bold text-white sm:text-5xl"
              variants={fadeUpItem}
            >
              Projects
            </motion.h1>
            <motion.p
              className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-200/80"
              variants={fadeUpItem}
            >
              Selected work
            </motion.p>
          </div>
          <motion.div
            className="flex flex-col items-start gap-3 md:items-end"
            variants={fadeUpItem}
          >
            <div
              className="hidden flex-wrap items-center justify-end gap-2 md:flex"
              role="group"
              aria-label="Project filters"
            >
              {filters.map((filter) => {
                const isActive = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={clsx(
                      "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 motion-reduce:transition-none",
                      isActive
                        ? "border-sky-300/50 bg-sky-300/15 text-white"
                        : "border-white/10 bg-white/5 text-slate-200/70 hover:border-sky-300/40 hover:text-white",
                    )}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
            <label className="w-full md:hidden">
              <span className="sr-only">Filter projects</span>
              <select
                value={activeFilter}
                onChange={(event) => setActiveFilter(event.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white focus:border-sky-300/50 focus:outline-none focus:ring-2 focus:ring-sky-300/40"
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter} className="bg-[#111c32]">
                    {filter}
                  </option>
                ))}
              </select>
            </label>
          </motion.div>
        </motion.div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Featured
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                One flagship build with the clearest impact line.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <motion.article
              className={clsx(
                cardBase,
                "rounded-3xl border-white/15 bg-gradient-to-br from-[#111c32] via-[#101a32] to-[#0c162f] p-6",
              )}
              variants={fadeUpItem}
            >
              <ImageFrame
                src={spotlight.image}
                alt={spotlight.title}
                aspectClass="aspect-[16/8]"
                loading="eager"
              />
              <div className="mt-6 flex flex-1 flex-col">
                <span className="w-fit rounded-full border border-sky-300/40 bg-sky-300/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-100/90">
                  Spotlight
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  {spotlight.title}
                </h3>
                <p className="mt-3 text-sm text-slate-200/90 line-clamp-2 sm:text-base">
                  {spotlight.summary}
                </p>
                {spotlight.outcome && (
                  <p className="mt-4 rounded-xl border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-sm text-sky-100/90">
                    {spotlight.outcome}
                  </p>
                )}
                <TagList tags={spotlight.tags} max={4} />
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  {spotlight.liveUrl && (
                    <a
                      href={spotlight.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={secondaryCta}
                    >
                      Live
                    </a>
                  )}
                  <Link to={spotlight.path} className={primaryCta}>
                    Case Study
                  </Link>
                </div>
              </div>
            </motion.article>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Highlights
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Selected and notable builds arranged in a dynamic grid.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 lg:grid-flow-dense lg:auto-rows-[200px]">
            {highlightFiltered.map((project, index) => {
              const layout = mosaicLayout[index % mosaicLayout.length];
              return (
                <motion.article
                  key={project.id}
                  className={clsx(cardBase, "p-4", layout.cardClass)}
                  variants={fadeUpItem}
                >
                  <ImageFrame
                    src={project.image}
                    alt={project.title}
                    aspectClass={layout.imageAspect}
                  />
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 line-clamp-2">
                      {project.summary}
                    </p>
                    <TagList tags={project.tags} max={3} />
                    <div className="mt-auto flex flex-wrap gap-3 pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={secondaryCta}
                        >
                          Live
                        </a>
                      )}
                      <Link to={project.path} className={primaryCta}>
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
          {highlightFiltered.length === 0 && (
            <p className="mt-6 text-sm text-slate-300">
              No projects match this filter yet.
            </p>
          )}
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
            className="mt-8 flex gap-4 overflow-x-auto pb-4 pr-2 snap-x snap-mandatory"
            aria-label="More projects"
          >
            {moreFiltered.map((project) => (
              <motion.article
                key={project.id}
                className={clsx(
                  cardBase,
                  "min-w-[240px] snap-start p-4 sm:min-w-[300px] lg:min-w-[340px]",
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
                  <p className="mt-2 text-sm text-slate-300 line-clamp-1">
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

          {moreFiltered.length === 0 && (
            <p className="mt-6 text-sm text-slate-300">
              No projects match this filter yet.
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
};
