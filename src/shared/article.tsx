import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { Icons } from "../components/Icons";
import { ArticleItem } from "../articles";
import { useEffect } from "react";
import { motion } from "framer-motion";
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
        className="fixed top-5 left-5 hidden items-center gap-2 text-black lg:flex"
        variants={slideLeftItem}
        initial="hidden"
        animate="visible"
      >
        <Link to="/?scrollTo=projects">
          <div className="flex flex-row hover:underline">
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
            <motion.h1 className="mt-2 text-4xl font-bold" variants={fadeUpItem}>
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
        {article.content.map((item, index) => {
          switch (item.type) {
            case "text":
              return (
                <motion.p
                  key={index}
                  className="mt-4 text-gray-700"
                  {...itemMotionProps}
                >
                  {item.value}
                </motion.p>
              );
            case "heading":
              return (
                <motion.h2
                  key={index}
                  className="mt-6 text-3xl font-bold"
                  {...itemMotionProps}
                >
                  {item.value}
                </motion.h2>
              );
            case "list":
              return (
                <motion.ul
                  key={index}
                  className="mt-4 list-outside list-['-'] pl-5 text-gray-700"
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {item.value.map((li, i) => (
                    <motion.li key={i} className="pl-2" variants={fadeUpItem}>
                      {li}
                    </motion.li>
                  ))}
                </motion.ul>
              );
            case "code":
              return (
                <motion.div
                  key={index}
                  className="mockup-code mt-4"
                  {...itemMotionProps}
                >
                  <pre data-prefix="$">
                    <code>{item.value}</code>
                  </pre>
                </motion.div>
              );
            case "image":
              return (
                <motion.figure
                  key={index}
                  className="mt-4"
                  variants={scaleInItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <img
                    src={item.value}
                    alt={item.description}
                    className="mx-auto"
                  />
                  <figcaption className="text-sm text-gray-500 italic">
                    {item.description}
                  </figcaption>
                </motion.figure>
              );
            default:
              return null;
          }
        })}
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
