import pktrafficPreview from "./assets/projects/pktraffic/pktrafficWebsite.png";
import pktrafficOverview from "./assets/projects/pktraffic/pktrafficOverview.png";
import movieboxdbOverview from "./assets/projects/movieboxdb/movieboxdbOverview.png";
import movieboxdbPreview from "./assets/projects/movieboxdb/movieboxdbPreview.jpg";

export type ArticleItem = {
  path: string;
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

const pktraffic: ArticleItem = {
  path: "/articles/pktraffic",
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
  image: pktrafficOverview,
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
      value: pktrafficPreview,
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

const movieboxdb: ArticleItem = {
  path: "/articles/movieboxdb",
  period: "Nov 2021 - Jan 2022",
  header: "MovieBoxDB",
  description:
    "MovieBoxDB is a comprehensive movie discovery platform that simplifies film exploration and management by offering detailed film information and personalized curation features.",
  headerLinks: [
    {
      link: "https://github.com/CasperKristiansson/MovieBoxDB",
      display: "Github",
    },
    {
      link: "https://movieboxdb.web.app/",
      display: "movieboxdb.web.app",
    },
  ],
  image: movieboxdbOverview,
  content: [
    {
      type: "text",
      value:
        "MovieBoxDB is designed to simplify film exploration and management. With its user-friendly interface, users can search for movies and access comprehensive details including cast, release dates, genres, and ratings.",
    },
    {
      type: "text",
      value:
        "The platform was meticulously crafted with a focus on user experience. Its intuitive search and dynamic sorting options allow users to effortlessly uncover popular titles and filter films based on various criteria.",
    },
    {
      type: "text",
      value:
        "By creating an account, users gain access to personalized features such as updating their profile, managing watchlists, and marking favorites. Additionally, the innovative MovieMatcher—a swipe-based game inspired by dating apps—offers an engaging way to decide whether to save or skip a movie.",
    },
    {
      type: "heading",
      value: "Technologies Used",
    },
    {
      type: "list",
      value: [
        "Firebase Hosting",
        "Firebase Firestore Database",
        "Firebase Authentication",
        "Figma",
      ],
    },
    {
      type: "image",
      value: movieboxdbPreview,
      description: "MovieBoxDB Preview",
    },
    {
      type: "heading",
      value: "Features",
    },
    {
      type: "text",
      value:
        "A strong emphasis on design ensures a visually appealing and seamless user experience. The one-page layout provides comprehensive movie details—trailers, cast, storyline, and ratings—in an integrated view.",
    },
    {
      type: "text",
      value:
        "The discover page is tailored for efficient browsing, offering multiple sorting options such as popularity, release year, and ratings. This makes it simple for users to find films that match their interests.",
    },
    {
      type: "text",
      value:
        "The profile section not only supports movie curation through watchlists and favorites but also integrates the engaging MovieMatcher. This swipe-based feature lets users make instant decisions on movie selection, adding an interactive element to the discovery process.",
    },
  ],
};

export const Articles: ArticleItem[] = [pktraffic, movieboxdb];
