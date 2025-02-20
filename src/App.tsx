import { About } from "./components/About";
import { Certificates } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Rewards } from "./components/Rewards";
import { Skills } from "./components/Skills";

export const App: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Certificates />
      <Rewards />
    </>
  );
};
