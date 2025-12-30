import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { About } from "./components/About";
import { Certificates } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { ExternalLinks } from "./components/ExternalLinks";
import { Hero } from "./components/Hero";
import { StickyNav } from "./components/StickyNav";
import { Projects } from "./components/Projects";
import { Rewards } from "./components/Rewards";
import { Skills } from "./components/Skills";
import { NotFound } from "./components/NotFound";
import { Article } from "./shared/article";
import { Articles } from "./articles";
import { Papers } from "./components/Papers";
import { pageVariants } from "./shared/motion";

export const App: React.FC = () => {
  const location = useLocation();
  const homePage = (
    <motion.div
      className="bg-[#18253F]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero />
      <StickyNav />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Certificates />
      <Papers />
      <Rewards />
      <ExternalLinks />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={homePage} />
        {Articles.map((article, index) => (
          <Route
            key={index}
            path={article.path}
            element={<Article {...article} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
