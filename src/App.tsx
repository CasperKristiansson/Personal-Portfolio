import { Route, Routes } from "react-router";
import { About } from "./components/About";
import { Certificates } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { ExternalLinks } from "./components/ExternalLinks";
import { Hero } from "./components/Hero";
import { Icons } from "./components/Icons";
import { Projects } from "./components/Projects";
import { Rewards } from "./components/Rewards";
import { Skills } from "./components/Skills";
import { NotFound } from "./components/NotFound";
import { Article } from "./shared/article";
import { Articles } from "./articles";

export const App: React.FC = () => {
  const homePage = (
    <>
      <Icons />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Certificates />
      <Rewards />
      <ExternalLinks />
    </>
  );

  return (
    <Routes>
      <Route path="/" element={homePage} />
      {/* <Route path="/article" element={<Article />} /> */}
      {Articles.map((article, index) => (
        <Route
          key={index}
          path={article.path}
          element={<Article {...article} />}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
