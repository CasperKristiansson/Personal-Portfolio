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

export const App: React.FC = () => {
  return (
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
};
