import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { Icons } from "../components/Icons";
import { ArticleItem } from "../articles";
import type React from "react";
import { isValidElement, useEffect } from "react";
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

export const Article: React.FC<ArticleItem> = (article) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const itemMotionProps = {
    variants: fadeUpItem,
    initial: "hidden",
    whileInView: "visible",
    viewport: viewportOnce,
  } as const;

  const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <motion.h1
        className="mt-6 text-4xl font-bold"
        {...itemMotionProps}
        {...props}
      />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <motion.h2
        className="mt-6 text-3xl font-bold"
        {...itemMotionProps}
        {...props}
      />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <motion.h3
        className="mt-5 text-2xl font-semibold"
        {...itemMotionProps}
        {...props}
      />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <motion.p
        className="mt-4 text-gray-700"
        {...itemMotionProps}
        {...props}
      />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <motion.ul
        className="mt-4 list-outside list-['-'] pl-5 text-gray-700"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        {...props}
      />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <motion.ol
        className="mt-4 list-outside list-decimal pl-5 text-gray-700"
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        {...props}
      />
    ),
    li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
      <motion.li className="pl-2" variants={fadeUpItem} {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className="text-blue-600 hover:underline" {...props} />
    ),
    img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <motion.figure
        className="mt-4"
        variants={scaleInItem}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <img {...props} alt={alt ?? ""} className="mx-auto" />
        {alt ? (
          <figcaption className="text-sm text-gray-500 italic">
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
          className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-slate-100"
          {...itemMotionProps}
        >
          {language ? (
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/40 px-4 py-2 text-xs tracking-wide text-slate-400 uppercase">
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
          className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.85em] text-slate-700"
          {...props}
        />
      );
    },
  } as const;

  return (
    <motion.div
      className="relative w-full text-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Icons dark />
      <motion.div
        className="fixed top-5 left-5 hidden items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-black shadow-lg ring-1 ring-black/5 backdrop-blur lg:flex"
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
        className="mx-auto lg:px-0"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            className="order-2 mx-auto flex w-full max-w-[700px] flex-col justify-center px-6 lg:order-1"
            variants={staggerFast}
          >
            <motion.p className="text-gray-600" variants={fadeUpItem}>
              {article.period}
            </motion.p>
            <motion.h1
              className="mt-2 text-4xl font-bold"
              variants={fadeUpItem}
            >
              {article.header}
            </motion.h1>
            <motion.p className="mt-4 text-gray-700" variants={fadeUpItem}>
              {article.description}
            </motion.p>
            {article.headerLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-600 hover:underline"
                variants={fadeUpItem}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
              >
                <IconArrowLeft className="mr-2 inline" />
                {link.display}
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            className="order-1 h-[50vh] w-full bg-cover bg-center lg:order-2"
            style={{
              backgroundImage: `url(${article.image})`,
            }}
            variants={scaleInItem}
          />
        </div>
      </motion.div>
      <div className="mx-auto mt-10 w-full max-w-[700px] px-6 sm:mt-20">
        <MDXProvider components={mdxComponents}>
          <article.Content />
        </MDXProvider>
      </div>
      <motion.div
        className="mt-12 mb-30 text-center hover:underline"
        variants={fadeUpItem}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <Link to="/?scrollTo=projects" className="text-blue-600">
          <IconArrowLeft className="mr-2 inline" /> Back to home page
        </Link>
      </motion.div>
    </motion.div>
  );
};
