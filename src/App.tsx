import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";

export const App: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
    </>
  );
};
