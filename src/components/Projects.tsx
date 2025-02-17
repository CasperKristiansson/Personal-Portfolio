import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import pktrafficOverview from "../assets/projects/pktraffic/pktrafficOverview.png";
import movieboxdbOverview from "../assets/projects/movieboxdb/movieboxdbOverview.png";
import weatherbrainOverview from "../assets/projects/weatherbrain/weatherbrainOverview.png";

type Card = {
  title: string;
  badge: string;
  description: string;
  image: string;
  tags: string[];
};

const cards: Card[] = [
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
  },
  {
    title: "MovieBoxDB",
    badge: "",
    description:
      "MovieBoxDB is a movie tracking application. It is possible to search for a specific movie and observe information about that specific movie such as actors, release date, genre, score etc.",
    image: movieboxdbOverview,
    tags: ["Frontend", "Database", "API", "React", "Firebase"],
  },
  {
    title: "WeatherBrain",
    badge: "",
    description:
      "This application can through machine learning predict upcoming weather/weather phenomena. The application receives its data from an IoT-device that can measure certain weather parameters such as temperature, atmospheric pressure, and humidity.",
    image: weatherbrainOverview,
    tags: [
      "Microsoft Azure",
      "Front/Backend",
      "Machine Learning",
      "IoT Device",
    ],
  },
];

export const Projects: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 600;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative z-10 bg-[#18253F] pt-36">
      <h1 className="mb-10 text-center text-6xl font-bold text-white sm:pl-10 sm:text-left lg:pl-40">
        Projects
      </h1>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto rounded-lg pb-4 pl-5 text-white shadow-lg sm:space-x-4 sm:pl-10 lg:space-x-6 lg:pl-40"
        >
          {cards.map((project, index) => (
            <div
              key={index}
              className="card w-[90%] flex-shrink-0 bg-base-100 shadow-sm sm:w-96 lg:w-[500px]"
            >
              <figure>
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-[300px] w-full object-cover sm:h-[500px]"
                />
              </figure>
              <div className="card-body h-full min-h-[400px] bg-[#111c32] p-4 pt-6 text-base sm:p-8">
                <h2 className="card-title text-2xl">
                  {project.title}
                  {project.badge && (
                    <div className="badge badge-accent">{project.badge}</div>
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
                  <button className="btn btn-block btn-primary">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2 shadow-lg md:flex"
          onClick={() => scroll("left")}
        >
          <IconChevronLeft size={48} />
        </button>
        <button
          className="absolute top-1/2 right-2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-2 shadow-lg md:flex"
          onClick={() => scroll("right")}
        >
          <IconChevronRight size={48} />
        </button>
      </div>
    </div>
  );
};
