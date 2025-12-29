import React, { useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import pktrafficOverview from "../assets/projects/pktraffic/pktrafficOverview.png";
import movieboxdbOverview from "../assets/projects/movieboxdb/movieboxdbOverview.png";
import weatherbrainOverview from "../assets/projects/weatherbrain/weatherbrainOverview.png";
import ecoloopOverview from "../assets/projects/ecoloop/ecoloopOverview.png";
import imageEditorOverview from "../assets/projects/imageEditor/imageEditorOverview.png";
import tvShowNetWorkOverview from "../assets/projects/tvShowNetwork/tvShowNetworkOverview.png";
import clsx from "clsx";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  fadeUpItem,
  slideLeftItem,
  staggerContainer,
  viewportOnce,
} from "../shared/motion";

type Card = {
  title: string;
  badge: string;
  description: string;
  image: string;
  tags: string[];
  fillHeight?: boolean;
  path: string;
};

const financeTrackerHero =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/hero.png";
const reactWhiteboardStudioHero =
  "https://raw.githubusercontent.com/CasperKristiansson/React-Whiteboard-Studio/main/docs/images/primary.jpg";
const podcastTrackerHero =
  "https://raw.githubusercontent.com/CasperKristiansson/Podcast-Tracker/main/docs/assets/podcast-tracker-preview.jpg";
const pydanticFixturegenHero =
  "https://opengraph.githubassets.com/1/CasperKristiansson/pydantic-fixturegen";
const pythonVersionPatchPrHero =
  "https://opengraph.githubassets.com/1/CasperKristiansson/python-version-patch-pr";

const cards: Card[] = [
  {
    title: "Finance Tracker",
    badge: "",
    description:
      "Personal finance intelligence built as an end-to-end product with ingestion, categorization, reporting, and decision-ready insights.",
    image: financeTrackerHero,
    tags: ["Full Stack", "React", "TypeScript", "Python", "AWS", "Terraform"],
    path: "/articles/finance-tracker",
  },
  {
    title: "React Whiteboard Studio",
    badge: "",
    description:
      "A polished whiteboard experience with fluid canvas interactions, local persistence, and a curated design system.",
    image: reactWhiteboardStudioHero,
    tags: ["React", "TypeScript", "Canvas", "Zustand", "IndexedDB"],
    path: "/articles/react-whiteboard-studio",
  },
  {
    title: "Podcast Tracker",
    badge: "",
    description:
      "Track podcast releases by syncing with the Spotify catalog, with show pages, episode details, and personal listening history.",
    image: podcastTrackerHero,
    tags: ["Astro", "GraphQL", "AWS", "Tailwind", "Serverless"],
    path: "/articles/podcast-tracker",
  },
  {
    title: "pydantic-fixturegen",
    badge: "",
    description:
      "Deterministic fixtures, pytest modules, datasets, and JSON for Pydantic v2, dataclasses, and TypedDicts.",
    image: pydanticFixturegenHero,
    tags: ["Python", "CLI", "Pydantic", "Testing", "Open Source"],
    path: "/articles/pydantic-fixturegen",
  },
  {
    title: "CPython Patch PR Action",
    badge: "",
    description:
      "Automated GitHub Action that keeps CPython patch versions current across every reference in a repo.",
    image: pythonVersionPatchPrHero,
    tags: ["GitHub Actions", "DevOps", "Automation", "CI/CD", "Python"],
    path: "/articles/python-version-patch-pr",
  },
  {
    title: "PKTraffic, LLC",
    badge: "POPULAR",
    description:
      "A Project which focuses in collecting and analyzing traffic associated data in Florida, USA. The project includes recording and gathering video data from 1000's of highways cameras to provide insight through post-processing to support safety and justice to traffic accident victims.",
    image: pktrafficOverview,
    tags: [
      "AWS",
      "Website",
      "Database",
      "Front/Backend",
      "Company",
      "Real-time",
      "Government Contract",
    ],
    path: "/articles/pktraffic",
  },
  {
    title: "MovieBoxDB",
    badge: "",
    description:
      "MovieBoxDB is a movie tracking application. It is possible to search for a specific movie and observe information about that specific movie such as actors, release date, genre, score etc.",
    image: movieboxdbOverview,
    tags: ["Frontend", "Database", "API", "React", "Firebase"],
    path: "/articles/movieboxdb",
  },
  {
    title: "WeatherBrain",
    badge: "",
    description:
      "This application can through machine learning predict upcoming weather/weather phenomena. The application receives its data from an IoT-device that can measure certain weather parameters such as temperature, atmospheric pressure, and humidity.",
    image: weatherbrainOverview,
    tags: ["Microsoft Azure", "Front/Backend", "Machine Learning"],
    path: "/articles/weatherbrain",
  },
  {
    title: "Sulfide Soil Classification",
    badge: "",
    description:
      "This project aims to create a website tool for detecting sulfide soil in Northern Sweden and Finland, which can cause environmental damage. Ecoloop, a environmental engineering company, worked with the project team to improve the accessibility and usability of the tool.",
    image: ecoloopOverview,
    tags: ["Sustainability", "Typescript", "Solution"],
    fillHeight: true,
    path: "/articles/ecoloop",
  },
  {
    title: "Image Editor",
    badge: "",
    description:
      "An application that allows its users to quickly make small adjustments to a large number of images. This program was developed for the Personnel Foundation of the Swedish postal service.",
    image: imageEditorOverview,
    tags: ["Application", "Photo Editor", "Front/Backend"],
    path: "/articles/image-editing-application",
  },
  {
    title: "TV Show Network",
    badge: "",
    description:
      "The goal of the application is to allow users to come together and write about the TV industry. Depending on how many views the article gets, the author receives a percentage of the revenue.",
    image: tvShowNetWorkOverview,
    tags: ["Website", "Wordpress", "SEO"],
    fillHeight: true,
    path: "/articles/tvshownetwork",
  },
];

export const Projects: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const locationRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get("scrollTo");
    if (scrollTo === "projects" && locationRef.current) {
      locationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <motion.section
      className="relative z-10 bg-[#18253F] pt-36"
      ref={locationRef}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.h1
        className="mx-auto mb-14 max-w-[2000px] text-center text-6xl font-bold text-white sm:pl-10 sm:text-left lg:pl-40"
        variants={slideLeftItem}
      >
        Projects
      </motion.h1>
      <div className="relative">
        <motion.div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-scroll rounded-lg pr-4 pb-4 pl-5 text-white shadow-lg sm:space-x-4 sm:pr-20 sm:pl-10 md:overflow-x-hidden lg:space-x-6 lg:pl-[max(10rem,calc((100vw-2000px)/2)+10rem)]"
          variants={staggerContainer}
        >
          {cards.map((project, index) => (
            <motion.div
              key={index}
              className="card w-[95%] flex-shrink-0 shadow-sm sm:w-96 lg:w-[500px]"
              variants={fadeUpItem}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <figure>
                <img
                  src={project.image}
                  alt={project.title}
                  className={clsx(
                    "h-[200px] w-full object-cover sm:h-[400px]",
                    project.fillHeight
                      ? "lg:object-cover"
                      : "lg:object-contain",
                  )}
                />
              </figure>
              <div className="card-body h-full min-h-[200px] bg-[#111c32] p-4 pt-6 text-base sm:p-8">
                <h2 className="card-title text-2xl">
                  {project.title}
                  {project.badge && (
                    <div className="badge hidden badge-accent sm:flex">
                      {project.badge}
                    </div>
                  )}
                </h2>
                <p>{project.description}</p>

                <div className="card-actions justify-end">
                  {project.tags.map((tag, index) => (
                    <div key={index} className="badge badge-primary">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to={project.path}>
                    <button className="btn btn-block btn-primary">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          className="absolute top-1/2 left-2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2 shadow-lg md:flex"
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <IconChevronLeft size={48} />
        </motion.button>
        <motion.button
          className="absolute top-1/2 right-2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2 shadow-lg md:flex"
          onClick={() => scroll("right")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <IconChevronRight size={48} />
        </motion.button>
      </div>
    </motion.section>
  );
};
