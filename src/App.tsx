import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";

import { Articles } from "./articles";
import { About } from "./components/About";
import { Certificates } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { NotFound } from "./components/NotFound";
import { Papers } from "./components/Papers";
import { Projects } from "./components/Projects";
import { Rewards } from "./components/Rewards";
import { Skills } from "./components/Skills";
import { StickyNav } from "./components/StickyNav";
import { Article } from "./shared/Article";
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
