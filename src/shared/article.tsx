import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { Icons } from "../components/Icons";
import pktrafficOverview from "../assets/projects/pktraffic/pktrafficWebsite.png";

const article: ArticleItem = {
  period: "Jan 2021 - Sept 2024",
  header: "PKTraffic, LLC",
  description:
    "A project dedicated to collecting and analyzing traffic data in Florida, USA. It involves recording and processing footage from thousands of highway cameras to generate insights that support road safety and aid traffic accident investigations.",
  headerLinks: [
    {
      link: "https://pktraffic.com/",
      display: "PKTraffic.com",
    },
  ],
  image: "../images/pktrafficOverview.png",
  content: [
    {
      type: "text",
      value:
        "PKTraffic specializes in in-depth public record searches of traffic-related incidents, providing expert analysis for improved road safety. The platform utilizes an intelligent application to explore, evaluate, and visualize traffic event data efficiently.",
    },
    {
      type: "text",
      value:
        "As Co-owner and CTO, I led the development of both frontend and backend IT solutions that drive the business. The frontend includes a data visualization tool for sorting and analyzing traffic incidents, along with the PKTraffic.com website. The backend involves managing a high-performance server that records and processes vast amounts of video data. My core responsibility is ensuring reliable IT infrastructure and secure data storage.",
    },
    {
      type: "heading",
      value: "Technologies Used",
    },
    {
      type: "list",
      value: [
        "React for website and admin panel, with Firebase authentication",
        "YouTube DL and FFmpeg for managing and downloading camera streams",
        "MySQL database for structured data management",
        "Lucidchart and Astha for system design",
        "Custom API for website-database communication",
        "PyQt and QT Designer for a desktop application to visualize and filter traffic footage",
        "Server management, task scheduling, and Git workflow",
        "Plex media server for data access",
        "Data collection via direct requests and Selenium automation",
      ],
    },
    {
      type: "image",
      value: pktrafficOverview,
      description: "PKTraffic Website Overview",
    },
    {
      type: "heading",
      value: "Features",
    },
    {
      type: "text",
      value:
        "The core system continuously records and collects traffic data from thousands of highway cameras across Florida. Footage is processed to identify traffic incidents, which are then stored for long-term analysis. To improve system reliability, I developed an advanced logging mechanism to track various components, including the video recorder, addressing real-world challenges in debugging third-party software integrations.",
    },
    {
      type: "text",
      value:
        "Additional data sources include government traffic records and Waze reports, which are stored in a MySQL database hosted on Bluehost. The database was meticulously designed to handle complex relationships and ensure efficient data retrieval. Initial designs for the database and system architecture were created using Astha and Lucidchart to streamline development.",
    },
    {
      type: "text",
      value:
        "The PKTraffic website, built with React, serves as a user-friendly interface to showcase our work. To enhance user experience, I developed a searchable, paginated table that allows customers to filter traffic incidents captured by the system. This data is fetched from the database via a secure API, which follows best practices such as prepared statements to prevent security vulnerabilities.",
    },
    {
      type: "text",
      value:
        "The admin panel leverages Firebase authentication to grant controlled access. It provides a real-time system overview, displaying key metrics such as the number of detected crashes, total crashes in Florida, server storage utilization, and CPU performance. A detailed, paginated table further simplifies navigation through recorded footage and related data.",
    },
    {
      type: "text",
      value:
        "I also configured the backend server to handle essential system operations, including Git-based deployment workflows, task scheduling, and Plex media server setup for organized data management.",
    },
  ],
};

export type ArticleItem = {
  period: string;
  header: string;
  description: string;
  headerLinks: {
    link: string;
    display: string;
  }[];
  image: string;
  content: (
    | {
        type: "text";
        value: string;
      }
    | {
        type: "image";
        value: string;
        description: string;
      }
    | {
        type: "list";
        value: string[];
      }
    | {
        type: "heading";
        value: string;
      }
    | {
        type: "code";
        value: string[];
      }
  )[];
};

export const Article: React.FC = () => {
  return (
    <div className="relative w-full text-black">
      <Icons dark />
      <div className="fixed top-5 left-5 flex items-center gap-2 text-black">
        <Link to="/">
          <div className="flex flex-row hover:underline">
            <IconArrowLeft size={24} />
            <p>Go Back</p>
          </div>
        </Link>
      </div>

      <div className="mx-auto lg:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="order-2 mx-auto flex w-full max-w-[800px] flex-col justify-center px-6 sm:px-20 lg:order-1">
            <p className="text-gray-600">{article.period}</p>
            <h1 className="mt-2 text-4xl font-bold">{article.header}</h1>
            <p className="mt-4 text-gray-700">{article.description}</p>
            {article.headerLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-600 hover:underline"
              >
                <IconArrowLeft className="mr-2 inline" />
                {link.display}
              </a>
            ))}
          </div>
          <div
            className="order-1 h-[50vh] w-full bg-cover bg-center lg:order-2"
            style={{
              backgroundImage: `url("${article.image}")`,
            }}
          ></div>
        </div>
      </div>

      <div className="mx-auto mt-20 w-full max-w-[700px] px-6">
        {article.content.map((item, index) => {
          switch (item.type) {
            case "text":
              return (
                <p key={index} className="mt-4 text-gray-700">
                  {item.value}
                </p>
              );
            case "heading":
              return (
                <h2 key={index} className="mt-6 text-3xl font-bold">
                  {item.value}
                </h2>
              );
            case "list":
              return (
                <ul
                  key={index}
                  className="mt-4 list-outside list-['-'] pl-5 text-gray-700"
                >
                  {item.value.map((li, i) => (
                    <li key={i} className="pl-2">
                      {li}
                    </li>
                  ))}
                </ul>
              );
            case "code":
              return (
                <div key={index} className="mockup-code mt-4">
                  <pre data-prefix="$">
                    <code>{item.value}</code>
                  </pre>
                </div>
              );
            case "image":
              return (
                <figure key={index} className="mt-4">
                  <img
                    src={item.value}
                    alt={item.description}
                    className="mx-auto"
                  />
                  <figcaption className="text-sm text-gray-500 italic">
                    {item.description}
                  </figcaption>
                </figure>
              );
            default:
              return null;
          }
        })}
      </div>

      <div className="mt-12 mb-30 text-center">
        <Link to="/" className="text-blue-600">
          <IconArrowLeft className="mr-2 inline" /> Back to home page
        </Link>
      </div>
    </div>
  );
};
