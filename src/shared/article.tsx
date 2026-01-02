import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { Icons } from "../components/Icons";
import { ArticleItem } from "../articles";
import { projects } from "../data/projects";
import type React from "react";
import { isValidElement, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MDXProvider } from "@mdx-js/react";
import {
  fadeUpItem,
  pageVariants,
  scaleInItem,
  slideLeftItem,
  staggerContainer,
  staggerFast,
  viewportOnce,
} from "./motion";

type BadgeConfig = {
  label?: string;
  color: string;
  logo?: string;
  logoColor?: string;
};

const badgeMap: Record<string, BadgeConfig> = {
  React: { color: "61DAFB", logo: "react", logoColor: "0B1224" },
  TypeScript: { color: "3178C6", logo: "typescript", logoColor: "white" },
  "Tailwind CSS": { color: "06B6D4", logo: "tailwindcss", logoColor: "white" },
  Redux: { color: "764ABC", logo: "redux", logoColor: "white" },
  Python: { color: "3776AB", logo: "python", logoColor: "white" },
  AWS: { color: "232F3E", logo: "amazonaws", logoColor: "white" },
  Terraform: { color: "844FBA", logo: "terraform", logoColor: "white" },
  Firebase: { color: "FFCA28", logo: "firebase", logoColor: "0B1224" },
  "Firebase Auth": {
    color: "FFCA28",
    logo: "firebase",
    logoColor: "0B1224",
  },
  Firestore: { color: "FFCA28", logo: "firebase", logoColor: "0B1224" },
  MySQL: { color: "4479A1", logo: "mysql", logoColor: "white" },
  FFmpeg: { color: "007808", logo: "ffmpeg", logoColor: "white" },
  Selenium: { color: "43B02A", logo: "selenium", logoColor: "white" },
  PyQt: { color: "41CD52", logo: "qt", logoColor: "white" },
  OpenCV: { color: "5C3EE8", logo: "opencv", logoColor: "white" },
  Pydantic: { color: "E92063", logo: "pydantic", logoColor: "white" },
  CLI: { color: "334155" },
  PyPI: { color: "3775A9", logo: "pypi", logoColor: "white" },
  Testing: { color: "0EA5E9" },
  "Open Source": {
    color: "3DA639",
    logo: "opensourceinitiative",
    logoColor: "white",
  },
  Astro: { color: "FF5D01", logo: "astro", logoColor: "white" },
  GraphQL: { color: "E10098", logo: "graphql", logoColor: "white" },
  DynamoDB: {
    color: "4053D6",
    logo: "amazondynamodb",
    logoColor: "white",
  },
  Canvas: { color: "E34F26", logo: "html5", logoColor: "white" },
  Zustand: { color: "334155" },
  IndexedDB: { color: "475569" },
  "Node.js": { color: "339933", logo: "node.js", logoColor: "white" },
  "GitHub Actions": {
    color: "2088FF",
    logo: "githubactions",
    logoColor: "white",
  },
  "CI/CD": { color: "1E40AF" },
  Figma: { color: "F24E1E", logo: "figma", logoColor: "white" },
  Markdown: { color: "000000", logo: "markdown", logoColor: "white" },
  PNPM: { color: "F69220", logo: "pnpm", logoColor: "white" },
  Desktop: { color: "1E293B" },
  Azure: { color: "0078D4", logo: "microsoftazure", logoColor: "white" },
  TensorFlow: { color: "FF6F00", logo: "tensorflow", logoColor: "white" },
  IoT: { color: "0F172A" },
  "Raspberry Pi": {
    color: "A22846",
    logo: "raspberrypi",
    logoColor: "white",
  },
  "REST API": { color: "1D4ED8" },
  API: { color: "1D4ED8" },
  WordPress: { color: "21759B", logo: "wordpress", logoColor: "white" },
  SEO: { color: "0F766E" },
  AdSense: { color: "4285F4", logo: "googleadsense", logoColor: "white" },
  JavaScript: { color: "F7DF1E", logo: "javascript", logoColor: "0B1224" },
};

const buildBadgeUrl = (tag: string) => {
  const config = badgeMap[tag] ?? { color: "334155" };
  const label = encodeURIComponent(config.label ?? tag);
  const color = encodeURIComponent(config.color);
  const params = new URLSearchParams({ style: "flat" });
  if (config.logo) {
    params.set("logo", config.logo);
  }
  if (config.logoColor) {
    params.set("logoColor", config.logoColor);
  }
  return `https://img.shields.io/badge/${label}-${color}?${params.toString()}`;
};

const BadgeList: React.FC<{ tags: string[]; max?: number }> = ({
  tags,
  max = 6,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!tags.length) {
    return null;
  }

  const visible = isExpanded ? tags : tags.slice(0, max);
  const remaining = tags.length - visible.length;

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {visible.map((tag) => (
        <img
          key={tag}
          src={buildBadgeUrl(tag)}
          alt={tag}
          title={tag}
          loading="lazy"
          className="h-6 w-auto"
        />
      ))}
      {remaining > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-200/70 uppercase transition hover:border-sky-300/50 hover:text-slate-100"
          aria-label={`Show ${remaining} more tags`}
        >
          +{remaining}
        </button>
      )}
    </div>
  );
};

export const Article: React.FC<ArticleItem> = (article) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projectTags =
    projects.find((project) => project.path === article.path)?.tags ?? [];

  const itemMotionProps = {
    variants: fadeUpItem,
    initial: "hidden",
    whileInView: "visible",
    viewport: viewportOnce,
  } as const;

  const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <motion.h1
        className="mt-8 text-4xl font-bold text-white sm:text-5xl"
        {...itemMotionProps}
        {...props}
      />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <motion.h2
        className="mt-8 text-3xl font-bold text-white"
        {...itemMotionProps}
        {...props}
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <motion.h3
        className="mt-6 text-2xl font-semibold text-white"
        {...itemMotionProps}
        {...props}
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <motion.p
        className="mt-4 text-base leading-relaxed text-slate-200/90"
        {...itemMotionProps}
        {...props}
      />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <motion.ul
        className="mt-4 list-outside list-disc space-y-2 pl-5 text-slate-200/90 marker:text-sky-300"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        {...props}
      />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <motion.ol
        className="mt-4 list-outside list-decimal space-y-2 pl-5 text-slate-200/90 marker:text-sky-300"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        {...props}
      />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
      <motion.li className="pl-1" variants={fadeUpItem} {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className="text-sky-300 underline decoration-sky-500/30 underline-offset-4 transition hover:text-sky-200"
        {...props}
      />
    ),
    img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <motion.figure
        className="mt-6"
        variants={scaleInItem}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <img
          {...props}
          alt={alt ?? ""}
          className="mx-auto rounded-2xl border border-white/10 shadow-xl"
        />
        {alt ? (
          <figcaption className="mt-2 text-sm text-slate-400 italic">
            {alt}
          </figcaption>
        ) : null}
      </motion.figure>
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
      const { children } = props;
      const codeChild = isValidElement(children) ? children : null;
      const className = codeChild?.props?.className ?? "";
      const language = className.startsWith("language-")
        ? className.replace("language-", "")
        : "";

      return (
        <motion.div
          className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 text-slate-100 shadow-xl"
          {...itemMotionProps}
        >
          {language ? (
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/40 px-4 py-2 text-xs tracking-wide text-slate-400 uppercase">
              <span>Snippet</span>
              <span>{language}</span>
            </div>
          ) : null}
          <pre className="overflow-x-auto px-5 py-4 text-sm leading-relaxed">
            {children}
          </pre>
        </motion.div>
      );
    },
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
      if (className) {
        return <code className={className} {...props} />;
      }
      return (
        <code
          className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-slate-100"
          {...props}
        />
      );
    },
  } as const;

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden bg-[#0b1224] text-slate-100"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Icons dark />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.25),_transparent_70%)] blur-3xl" />
        <div className="absolute -right-28 top-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
      </div>
      <motion.div
        className="fixed top-5 left-5 hidden items-center gap-2 rounded-full border border-white/10 bg-[#0b1224]/80 px-3 py-2 text-slate-100 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.9)] backdrop-blur lg:flex"
        variants={slideLeftItem}
        initial="hidden"
        animate="visible"
      >
        <Link to="/?scrollTo=projects">
          <div className="flex flex-row items-center gap-1 hover:underline">
            <IconArrowLeft size={24} />
            <p>Go Back</p>
          </div>
        </Link>
      </motion.div>
      <motion.div
        className="relative mx-auto w-full max-w-[1200px] px-6 pt-20 pb-14 lg:px-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <motion.div
            className="order-2 mx-auto flex w-full max-w-[620px] flex-col justify-center lg:order-1"
            variants={staggerFast}
          >
            <Link
              to="/?scrollTo=projects"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-slate-200/80 uppercase transition hover:border-sky-300/50 hover:bg-white/10 lg:hidden"
            >
              <IconArrowLeft size={14} />
              Projects
            </Link>
            <motion.span
              className="mt-6 w-fit rounded-full border border-sky-300/30 bg-sky-500/10 px-4 py-1 text-[11px] font-semibold tracking-[0.35em] text-sky-100/90 uppercase"
              variants={fadeUpItem}
            >
              Case Study
            </motion.span>
            <motion.p className="mt-4 text-sm text-slate-400" variants={fadeUpItem}>
              {article.period}
            </motion.p>
            <motion.h1
              className="mt-3 text-4xl font-bold text-white sm:text-5xl"
              variants={fadeUpItem}
            >
              {article.header}
            </motion.h1>
            <motion.p
              className="mt-4 text-lg leading-relaxed text-slate-200/90"
              variants={fadeUpItem}
            >
              {article.description}
            </motion.p>
            <motion.div variants={fadeUpItem}>
              <BadgeList tags={projectTags} />
            </motion.div>
            <div className="mt-6 flex flex-wrap gap-3">
              {article.headerLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    index === 0
                      ? "inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(14,165,233,0.8)] transition hover:bg-sky-400"
                      : "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-100/90 transition hover:border-sky-300/60 hover:text-white"
                  }
                  variants={fadeUpItem}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconArrowLeft className="rotate-180" size={18} />
                  {link.display}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="order-1 flex items-center lg:order-2"
            variants={scaleInItem}
          >
            <div className="relative w-full lg:w-[108%] lg:translate-x-3">
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-sky-500/25 via-blue-500/10 to-transparent blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1428] shadow-[0_40px_100px_-60px_rgba(14,165,233,0.7)]">
                <img
                  src={article.image}
                  alt={`${article.header} cover`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1224]/70 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="relative mx-auto w-full max-w-[820px] px-6 pb-20 lg:px-0">
        <MDXProvider components={mdxComponents}>
          <article.Content />
        </MDXProvider>
      </div>
      <motion.div
        className="pb-16 text-center"
        variants={fadeUpItem}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <Link
          to="/?scrollTo=projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-100/80 transition hover:border-sky-300/60 hover:text-white"
        >
          <IconArrowLeft size={18} />
          Back to home page
        </Link>
      </motion.div>
    </motion.div>
  );
};
