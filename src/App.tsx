import { About } from "./components/About";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";

export const App: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
    </>
  );
};
