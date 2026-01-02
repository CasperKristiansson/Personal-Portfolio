import pktrafficPreview from "./assets/projects/pktraffic/pktrafficWebsite.png";
import pktrafficOverview from "./assets/projects/pktraffic/pktrafficOverview.png";
import movieboxdbOverview from "./assets/projects/movieboxdb/movieboxdbOverview.png";
import movieboxdbPreview from "./assets/projects/movieboxdb/movieboxdbPreview.jpg";
import weatherbrainPreview from "./assets/projects/weatherbrain/weatherbrainWebsite.png";
import weatherbrainOverview from "./assets/projects/weatherbrain/weatherbrainOverview.png";
import ecoloopOverview from "./assets/projects/ecoloop/ecoloopOverview.png";
import imageEditorOverview from "./assets/projects/imageEditor/imageEditorOverview.png";
import imageEditorPreview from "./assets/projects/imageEditor/imageEditorPreview.png";
import tvShowNetworkPreview from "./assets/projects/tvshownetwork/tvShowNetworkPreview.jpg";
import tvShowNetworkOverview from "./assets/projects/tvshownetwork/tvShowNetworkOverview.png";
import cloudComputingOverview from "./assets/other/cloudComputing.png";
import kitgridHero from "./assets/projects/kitgrid/kitgridHero.jpg";

const financeTrackerHero =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/hero.png";
const financeTrackerDashboard =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/dashboard.png";
const financeTrackerReports =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/reports.png";
const financeTrackerTransactions =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/transactions.png";
const financeTrackerCategories =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/categories.png";
const financeTrackerTaxes =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/taxes.png";
const financeTrackerInvestments =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/investments.png";
const financeTrackerGoals =
  "https://raw.githubusercontent.com/CasperKristiansson/Finance-Tracker/master/docs/images/goals.png";

const podcastTrackerHero =
  "https://raw.githubusercontent.com/CasperKristiansson/Podcast-Tracker/main/docs/assets/podcast-tracker-preview.jpg";
const podcastTrackerDashboard =
  "https://raw.githubusercontent.com/CasperKristiansson/Podcast-Tracker/main/docs/assets/app-dashboard-search.png";
const podcastTrackerLibrary =
  "https://raw.githubusercontent.com/CasperKristiansson/Podcast-Tracker/main/docs/assets/app-library-show.png";

const reactWhiteboardStudioHero =
  "https://raw.githubusercontent.com/CasperKristiansson/React-Whiteboard-Studio/main/docs/images/primary.jpg";
const reactWhiteboardStudioIllustration =
  "https://raw.githubusercontent.com/CasperKristiansson/React-Whiteboard-Studio/main/docs/images/illustration.jpg";

const pydanticFixturegenHero =
  "https://opengraph.githubassets.com/1/CasperKristiansson/pydantic-fixturegen";
const pythonVersionPatchPrHero =
  "https://opengraph.githubassets.com/1/CasperKristiansson/python-version-patch-pr";

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
    | {
        type: "link";
        value: string;
        display: string;
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

const weatherbrain: ArticleItem = {
  path: "/articles/weatherbrain",
  period: "Mar 2022 - Jun 2022",
  header: "WeatherBrain",
  description:
    "WeatherBrain is an innovative application that leverages machine learning and IoT technology to deliver precise, real-time weather data and forecasts for specific locations.",
  headerLinks: [
    {
      link: "https://github.com/CasperKristiansson/Weather-Predictor",
      display: "Github",
    },
    {
      link: "https://weatherbrainproject.web.app/",
      display: "weatherbrainproject.web.app",
    },
  ],
  image: weatherbrainPreview,
  content: [
    {
      type: "text",
      value:
        "WeatherBrain offers two core functionalities: real-time weather monitoring using an IoT device and predictive forecasting through advanced machine learning. The platform also provides comparative statistics against major weather services, giving users reliable and contextual insights.",
    },
    {
      type: "text",
      value:
        "By harnessing data from a BME680 sensor connected to a Raspberry Pi, WeatherBrain delivers hyper-localized weather reports. This targeted approach allows users to monitor and predict conditions at a specific site, surpassing the typical city-wide forecasts.",
    },
    {
      type: "heading",
      value: "Technologies Used",
    },
    {
      type: "list",
      value: [
        "Microsoft Azure Virtual Machine (Ubuntu)",
        "Microsoft Azure SQL Database and Server",
        "Microsoft Azure App Service for website hosting",
        "Microsoft Azure IoT Hub",
        "Microsoft Azure Storage Account",
        "TensorFlow for machine learning predictions",
        "Github workflow integration",
        "Figma for design",
        "REST API",
        "IoT device (BME680) and Raspberry Pi",
        "Firebase hosting",
      ],
    },
    {
      type: "heading",
      value: "Features",
    },
    {
      type: "text",
      value:
        "Developed as part of the Project and Project Methods (II1302) course, I led the machine learning aspect of WeatherBrain. My role encompassed data collection, model development, and server configuration to ensure seamless daily predictions.",
    },
    {
      type: "text",
      value:
        "Data Collection & Preparation: Historical weather data was sourced from SMHI, combining readings from multiple stations to secure consistent hourly records. This comprehensive dataset, covering temperature, atmospheric pressure, and humidity, laid the groundwork for reliable forecasts.",
    },
    {
      type: "image",
      value: weatherbrainOverview,
      description: "WeatherBrain Preview",
    },
    {
      type: "text",
      value:
        "Data Analysis & Cleaning: I ensured data integrity by identifying and correcting anomalies. Utilizing visualizations such as graphs and heat maps, I normalized the data to prepare it for accurate model training.",
    },
    {
      type: "text",
      value:
        "Model Development: I experimented with over six TensorFlow models to determine the best fit for time-series weather predictions. Leveraging GPU acceleration reduced training time dramatically—from 30 hours on a CPU to just 2 hours—while careful parameter tuning maximized model performance.",
    },
    {
      type: "text",
      value:
        "Data Integration & Server Setup: I managed the continuous flow of fresh IoT data into the Azure SQL database, ensuring the prediction model always had the latest inputs. Additionally, I configured the server to run daily predictions and support REST API operations.",
    },
    {
      type: "text",
      value:
        "Webpage Redesign: After the course concluded and our Microsoft Azure student credits expired, I redesigned the website and implemented placeholder data. The new design reflects a modern, intuitive user interface intended to enhance the overall user experience.",
    },
  ],
};

const financeTracker: ArticleItem = {
  path: "/articles/finance-tracker",
  period: "2024 - Present",
  header: "Finance Tracker",
  description:
    "Personal finance intelligence built as an end-to-end product: ingestion, categorization, reporting, and decision-ready insights.",
  headerLinks: [
    {
      link: "https://finance-tracker.casperkristiansson.com/",
      display: "Live",
    },
    {
      link: "https://github.com/CasperKristiansson/Finance-Tracker",
      display: "Github",
    },
  ],
  image: financeTrackerHero,
  content: [
    {
      type: "text",
      value:
        "Finance Tracker is a portfolio-grade personal finance workspace that trades spreadsheets for a product-style experience. It focuses on clarity across transactions, accounts, budgets, and long-term insights.",
    },
    {
      type: "text",
      value:
        "The project is an end-to-end showcase: ingestion, categorization, reporting, and decision-ready insights wrapped in a UX-first interface with data-dense views and a clean service architecture.",
    },
    {
      type: "heading",
      value: "Product Snapshot",
    },
    {
      type: "list",
      value: [
        "Unified view of transactions, accounts, budgets, goals, loans, investments, and taxes.",
        "Rich reporting with net-worth, cash-flow, and category analytics.",
        "Spreadsheet import workflows with preview, mapping, and reconciliation.",
        "UX-first interface with motion, progressive loading states, and data-dense layouts.",
      ],
    },
    {
      type: "heading",
      value: "Screenshots",
    },
    {
      type: "image",
      value: financeTrackerDashboard,
      description: "Dashboard overview",
    },
    {
      type: "text",
      value:
        "The command center view focuses on what moved and what matters next with quick access to accounts, goals, and high-signal KPIs.",
    },
    {
      type: "image",
      value: financeTrackerReports,
      description: "Reports and analytics",
    },
    {
      type: "text",
      value:
        "Reporting is built for long-range clarity: net-worth trends, cash-flow volatility, and category mix that make tradeoffs visible.",
    },
    {
      type: "image",
      value: financeTrackerTransactions,
      description: "Transaction management",
    },
    {
      type: "text",
      value:
        "Imports and transactions emphasize speed with bulk ingest, smart mapping, and fast filters for audit-ready edits.",
    },
    {
      type: "heading",
      value: "Feature Grid",
    },
    {
      type: "text",
      value:
        "The feature set goes wide without feeling fragmented. Each surface is scoped, data-dense, and tuned for daily use.",
    },
    {
      type: "image",
      value: financeTrackerCategories,
      description: "Categories",
    },
    {
      type: "image",
      value: financeTrackerTaxes,
      description: "Taxes",
    },
    {
      type: "image",
      value: financeTrackerInvestments,
      description: "Investments",
    },
    {
      type: "image",
      value: financeTrackerGoals,
      description: "Goals",
    },
    {
      type: "heading",
      value: "Why This Project",
    },
    {
      type: "text",
      value:
        "I wanted a personal finance workspace that felt like a modern product instead of a spreadsheet. The goal is clarity: see where money goes, how it compounds, and what to do next.",
    },
    {
      type: "text",
      value:
        "It is built as a portfolio-grade app, not a tutorial. Every screen is meant to be opinionated, fast, and practical for day-to-day tracking while still surfacing long-term trends.",
    },
    {
      type: "heading",
      value: "Highlights",
    },
    {
      type: "list",
      value: [
        "Data-rich reporting across yearly and total views, net worth trajectory, and category mix.",
        "Full CRUD flows across accounts, budgets, loans, investments, subscriptions, and taxes.",
        "Authenticated experience with AWS Amplify and Cognito-ready configuration.",
        "Async data orchestration via Redux Toolkit and redux-saga.",
        "Import pipelines powered by pandas and openpyxl for real-world bank data.",
      ],
    },
    {
      type: "heading",
      value: "Tech Stack",
    },
    {
      type: "list",
      value: [
        "Frontend: React 19 + Vite 6 + TypeScript, Tailwind CSS 4, Radix UI primitives, shadcn-style components, lucide icons.",
        "State & forms: Redux Toolkit + redux-saga, react-router, React Hook Form + Zod.",
        "Visualization: Recharts for analytics and Framer Motion for transitions.",
        "Backend: Python 3.13, SQLModel + SQLAlchemy, Pydantic schemas, Alembic migrations.",
        "Infrastructure: Serverless AWS Lambda handlers with Cognito via Amplify, provisioned by Terraform.",
      ],
    },
    {
      type: "heading",
      value: "Feature Deep Dive",
    },
    {
      type: "list",
      value: [
        "Transactions & imports: Multi-leg transfers, bulk ingest, preview mapping, and reconciliation with running balances.",
        "Categories & rules: Income vs expense types, icon and color metadata, merges, archival, and lifetime trend sparklines.",
        "Accounts & reconciliation: Balance tracking with debt metadata and explicit adjustment entries for audit-ready ledgers.",
        "Budgets & subscriptions: Period budgets with spent vs remaining progress, plus recurring matching rules.",
        "Debt & loans: Principal, interest, minimum payment modeling, amortization schedules, and transaction-driven events.",
        "Investments: Holdings, cashflows, and performance metrics including realized/unrealized gains, TWR, and IRR.",
        "Goals: Target amounts and dates linked to accounts or categories with progress computed from live balances.",
        "Taxes: Payment and refund tracking with authority metadata plus monthly and yearly summaries.",
        "Reporting & analytics: Net worth trajectory, cash-flow volatility, and exports for projections and forecasts.",
        "Security & session handling: Amplify/Cognito-backed auth with session-aware loading and demo-safe flows.",
      ],
    },
    {
      type: "heading",
      value: "Repo Layout",
    },
    {
      type: "list",
      value: [
        "apps/web - Vite + React frontend.",
        "apps/api - Python API handlers, services, repositories, and schemas.",
        "infra/terraform - Infrastructure definitions.",
        "docs - Supporting documentation and assets.",
      ],
    },
  ],
};

const reactWhiteboardStudio: ArticleItem = {
  path: "/articles/react-whiteboard-studio",
  period: "2025",
  header: "React Whiteboard Studio",
  description:
    "A polished whiteboard experience with fluid canvas interactions, local persistence, and a curated design system.",
  headerLinks: [
    {
      link: "https://github.com/CasperKristiansson/React-Whiteboard-Studio",
      display: "Github",
    },
    {
      link: "https://draw.casperkristiansson.com/",
      display: "Live",
    },
  ],
  image: reactWhiteboardStudioHero,
  content: [
    {
      type: "text",
      value:
        "React Whiteboard Studio blends high-touch canvas interactions with a thoughtful state architecture. It supports precise drawing, rapid navigation, and export-ready assets without breaking the flow.",
    },
    {
      type: "heading",
      value: "Highlights",
    },
    {
      type: "list",
      value: [
        "Fluid canvas UX with pan, zoom, snapping, and transforms.",
        "Rich shape toolkit with inline text editing and styling controls.",
        "Asset pipeline with IndexedDB persistence and exportable bundles.",
        "Project workspace with autosave, duplication, and lifecycle actions.",
        "Debug overlay and feature flags for safe experimentation.",
      ],
    },
    {
      type: "image",
      value: reactWhiteboardStudioIllustration,
      description: "Whiteboard tooling illustration",
    },
    {
      type: "heading",
      value: "Tech Stack",
    },
    {
      type: "list",
      value: [
        "React 19 + TypeScript",
        "Zustand with Immer for global state and undo/redo",
        "Dexie (IndexedDB) for offline persistence",
        "Vite + Tailwind CSS",
        "Custom canvas controllers for snapping, guides, and measurement",
      ],
    },
  ],
};

const podcastTracker: ArticleItem = {
  path: "/articles/podcast-tracker",
  period: "2024",
  header: "Podcast Tracker",
  description:
    "A podcast companion that syncs with the Spotify catalog so new releases surface automatically, with show pages and listening history.",
  headerLinks: [
    {
      link: "https://podcast.casperkristiansson.com/",
      display: "Live",
    },
    {
      link: "https://github.com/CasperKristiansson/Podcast-Tracker",
      display: "Github",
    },
  ],
  image: podcastTrackerHero,
  content: [
    {
      type: "text",
      value:
        "Podcast Tracker keeps tabs on every show you follow by syncing with the Spotify catalog. A dedicated episode view highlights the latest drops, and each show has a rich detail page.",
    },
    {
      type: "text",
      value:
        "Your profile page stores listening history so you can resume quickly while still discovering new episodes.",
    },
    {
      type: "heading",
      value: "Technologies Used",
    },
    {
      type: "list",
      value: [
        "Astro + TypeScript with Tailwind CSS",
        "GraphQL API with Apollo Client and GraphQL Code Generator",
        "AWS Lambda + DynamoDB for serverless data services",
        "AWS CDK for repeatable infrastructure",
        "Vitest, ESLint, and Prettier for quality",
      ],
    },
    {
      type: "image",
      value: podcastTrackerDashboard,
      description: "Profile dashboard and podcast search",
    },
    {
      type: "image",
      value: podcastTrackerLibrary,
      description: "Library overview and show detail",
    },
    {
      type: "heading",
      value: "Experience Highlights",
    },
    {
      type: "list",
      value: [
        "Spotify catalog sync keeps new releases fresh.",
        "Show pages provide rich metadata and quick context before play.",
        "Personal history makes it easy to pick up where you left off.",
      ],
    },
  ],
};

const pydanticFixturegen: ArticleItem = {
  path: "/articles/pydantic-fixturegen",
  period: "2025",
  header: "pydantic-fixturegen",
  description:
    "Deterministic fixtures, pytest modules, datasets, and JSON from Pydantic v2 models, dataclasses, and TypedDicts.",
  headerLinks: [
    {
      link: "https://github.com/CasperKristiansson/pydantic-fixturegen",
      display: "Github",
    },
    {
      link: "https://pydantic-fixturegen.kitgrid.dev/",
      display: "Docs",
    },
    {
      link: "https://pypi.org/project/pydantic-fixturegen/",
      display: "PyPI",
    },
  ],
  image: pydanticFixturegenHero,
  content: [
    {
      type: "text",
      value:
        "pydantic-fixturegen is a sandboxed CLI that generates deterministic structured data for modern testing workflows. It speaks Pydantic v2 natively and also understands stdlib dataclasses and TypedDicts.",
    },
    {
      type: "heading",
      value: "Core Capabilities",
    },
    {
      type: "list",
      value: [
        "Deterministic seeds across random, Faker, and optional NumPy.",
        "Safe-import sandboxing with network and filesystem guards.",
        "JSON, pytest fixtures, datasets, schema, and diff outputs.",
        "Pluggy providers and presets for extensibility.",
        "Works with Pydantic v2, dataclasses, and TypedDicts.",
      ],
    },
    {
      type: "heading",
      value: "Workflow",
    },
    {
      type: "list",
      value: [
        "Discover models with `pfg list`.",
        "Generate samples or fixtures with deterministic seeds.",
        "Lock and verify outputs to keep tests reproducible.",
      ],
    },
  ],
};

const pythonVersionPatchPr: ArticleItem = {
  path: "/articles/python-version-patch-pr",
  period: "2025",
  header: "CPython Patch PR Action",
  description:
    "Automates CPython patch updates across every Python version reference in a repo and opens evergreen pull requests.",
  headerLinks: [
    {
      link: "https://github.com/CasperKristiansson/python-version-patch-pr",
      display: "Github",
    },
    {
      link: "https://python-version-patch-pr.kitgrid.dev/",
      display: "Docs",
    },
  ],
  image: pythonVersionPatchPrHero,
  content: [
    {
      type: "text",
      value:
        "This GitHub Action scans workflows, Dockerfiles, and runtime files to keep CPython patch versions current. It creates or updates a PR with minimal diff noise.",
    },
    {
      type: "heading",
      value: "Feature Overview",
    },
    {
      type: "list",
      value: [
        "Cross-file detection for Dockerfiles, workflows, runtime files, and tool configs.",
        "Resolves the latest stable patch with pre-release guards and python.org fallback.",
        "Predictable branch and PR automation with Octokit support.",
        "Dry-run previews, security keyword gates, and offline snapshots.",
        "Outputs change matrices for targeted CI fan-out.",
      ],
    },
    {
      type: "heading",
      value: "How It Works",
    },
    {
      type: "list",
      value: [
        "Scan the repo for pinned CPython patch versions.",
        "Resolve the latest patch for the configured track.",
        "Open or update a `chore/bump-python-<track>` pull request.",
      ],
    },
  ],
};

const ecoloop: ArticleItem = {
  path: "/articles/ecoloop",
  period: "Jan 2023 - Mar 2023",
  header: "Ecoloop Classification Tool",
  description:
    "A web-based tool for detecting sulfide soils in Northern Sweden and Finland, developed in collaboration with Ecoloop to enhance environmental monitoring.",
  headerLinks: [
    {
      link: "https://github.com/CasperKristiansson/Ecoloop-Classification-Tool",
      display: "Github",
    },
  ],
  image: ecoloopOverview,
  content: [
    {
      type: "text",
      value:
        "The project tackles the challenge of sulfide soils—commonly found in Northern Sweden and Finland around the Gulf of Bothnia—that can lead to significant environmental damage. By leveraging imputed soil data, the tool provides a precise and accessible method for detection.",
    },
    {
      type: "text",
      value:
        "Developed in close collaboration with Ecoloop, a boutique environmental engineering firm operating in Sweden and Norway, the project combined technical expertise with iterative user feedback. This collaboration ensured that the final tool was both user-friendly and effective in meeting real-world detection needs.",
    },
    {
      type: "heading",
      value: "Technologies Used",
    },
    {
      type: "list",
      value: [
        "React with TypeScript",
        "Firebase hosting & additional hosting providers",
        "Pipelines (GitHub Actions)",
        "Basic API endpoints",
      ],
    },
    {
      type: "heading",
      value: "Features",
    },
    {
      type: "text",
      value:
        "The tool was designed to be smart, easy, and effective, significantly reducing the time and cost involved in sulfide soil detection. While the project met two out of three technical requirements specified by the customer, there is room for further enhancement—such as incorporating multi-input document uploads or a map functionality.",
    },
    {
      type: "text",
      value:
        "The accompanying report also provides an in-depth background on the environmental risks of sulfide soils, along with insights into the mission of Ecoloop. It emphasizes the uniqueness of the tool in a market where no similar solution currently exists.",
    },
    {
      type: "text",
      value:
        "In summary, the Ecoloop Classification Tool is a pioneering solution aimed at advancing environmental monitoring and resource management in civil engineering, with significant potential for future refinements.",
    },
  ],
};

const imageEditingApplication: ArticleItem = {
  path: "/articles/image-editing-application",
  period: "Jun 2021 - Aug 2021",
  header: "Image Editing Application",
  description:
    "An application that enables rapid adjustments to large batches of images, developed for the Personnel Foundation of the Swedish postal service.",
  headerLinks: [],
  image: imageEditorPreview,
  content: [
    {
      type: "text",
      value:
        "I developed a mass image editing program for the Personnel Foundation of the Swedish postal service (postnordplus.com). The objective was to efficiently adjust image parameters such as width, height, brightness, sharpness, vignette, and vibrance across large batches of images.",
    },
    {
      type: "text",
      value:
        "The application features two distinct modes: mass editing and individual editing. The mass mode applies uniform adjustments to all images simultaneously, while the individual mode allows for customized settings on a per-image basis, including specific cropping options. This flexibility significantly reduces the time required for preparing images for web uploads.",
    },
    {
      type: "text",
      value:
        "I was responsible for developing both the frontend and backend components of the program, ensuring robust image processing functionality. Additionally, I provided training and ongoing support to staff to facilitate smooth adoption of the tool.",
    },
    {
      type: "heading",
      value: "Technologies Used",
    },
    {
      type: "list",
      value: ["Python with PyQt", "QT Designer", "OpenCV"],
    },
    {
      type: "image",
      value: imageEditorOverview,
      description: "Image Editing Application Preview",
    },
  ],
};

const tvShowNetwork: ArticleItem = {
  path: "/articles/tvshownetwork",
  period: "Dec 2018 - Dec 2020",
  header: "TvShowNetwork",
  description:
    "A collaborative blogging platform for the TV and film industry that rewards writers based on their article views.",
  headerLinks: [],
  image: tvShowNetworkOverview,
  content: [
    {
      type: "text",
      value:
        "TvShowNetwork is a unique website where users can sign up and share their insights on film and the TV industry. The platform was designed to help independent writers compete with larger blogs by joining forces, thereby improving their visibility on search engines and attracting a wider audience.",
    },
    {
      type: "text",
      value:
        "A standout feature of TvShowNetwork is its revenue-sharing model: authors earn a percentage of Google AdSense revenue based on the number of views their articles receive. In its first year, the site attracted around 80,000 visitors, underscoring its potential impact.",
    },
    {
      type: "text",
      value:
        "I developed the entire business model, website, and backend system. This included tracking visitor metrics per article and optimizing the site for SEO. Built on WordPress, the platform was enhanced with custom HTML, CSS, and JavaScript to deliver a seamless user experience.",
    },
    {
      type: "image",
      value: tvShowNetworkPreview,
      description: "TvShowNetwork Preview",
    },
  ],
};

const kitgrid: ArticleItem = {
  path: "/articles/kitgrid",
  period: "2025",
  header: "Kitgrid",
  description:
    "Personal docs network that aggregates raw Markdown across repos into a shared documentation hub.",
  headerLinks: [
    {
      link: "https://kitgrid.dev/",
      display: "Live",
    },
    {
      link: "https://github.com/CasperKristiansson/kitgrid",
      display: "Github",
    },
  ],
  image: kitgridHero,
  content: [
    {
      type: "text",
      value:
        "Kitgrid pulls documentation from multiple projects and normalizes metadata so every repo with a docs folder shows up in one cohesive hub.",
    },
    {
      type: "heading",
      value: "Highlights",
    },
    {
      type: "list",
      value: [
        "Aggregates raw Markdown across repos with a scripted fetch pipeline.",
        "Builds a shared documentation hub plus per-project microsites.",
        "Keeps metadata normalized for consistent navigation and search.",
      ],
    },
    {
      type: "heading",
      value: "Tech Stack",
    },
    {
      type: "list",
      value: ["Astro", "TypeScript", "Markdown", "PNPM"],
    },
  ],
};

const cloudComputing: ArticleItem = {
  path: "/papers/cloud-computing",
  period: "Jan 2023 - Jun 2023",
  header: "Cloud Computing Pricing and Deployment Efforts",
  description:
    "Navigating Cloud Computing Pricing and Deployment Efforts: Exploring the Public-Private Landscape",
  headerLinks: [
    {
      link: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1770639&dswid=5537",
      display: "diva-portal.org",
    },
  ],
  image: cloudComputingOverview,
  content: [
    {
      type: "heading",
      value: "Abstract",
    },
    {
      type: "text",
      value:
        "The expanding adoption of cloud computing services by businesses has transformed IT infrastructure and data management in the computing space. Cloud computing offers advantages such as availability, scalability, and cost-effectiveness, making it a favored choice for businesses of all sizes. The aim of this thesis is to compare private and public cloud computing services in terms of pricing and implementation effort as well as comparing the cloud providers to each other. The top three cloud providers that will be examined are Google GCP, Microsoft Azure, and Amazon AWS. The study examines different pricing models and evaluates their effectiveness in different business scenarios. In addition, the thesis also discusses the challenges associated with building and maintaining private infrastructure and the deployment of applications to cloud computing service are examined.",
    },
    {
      type: "text",
      value:
        "The research methodology involves data collection, analysis, and a case study of developing and deploying a ticketing system application on different cloud platforms. The ticket system helps to provide a realistic example and investigation of the cloud providers. The findings will help companies make informed decisions regarding the selection of the most appropriate cloud computing service based on pricing models and implementation efforts. The thesis provides valuable information on private and public cloud computing and recommends appropriate pricing models for different scenarios. This study adds to existing knowledge by analyzing current pricing models and deployment concepts in cloud computing. The thesis does not propose new solutions but follows a structured format compiling information on private, and public cloud computing and a comprehensive review of cloud computing pricing models and marketing efforts.",
    },
  ],
};

export const Articles: ArticleItem[] = [
  financeTracker,
  reactWhiteboardStudio,
  podcastTracker,
  pydanticFixturegen,
  pythonVersionPatchPr,
  pktraffic,
  movieboxdb,
  weatherbrain,
  ecoloop,
  imageEditingApplication,
  tvShowNetwork,
  kitgrid,
  cloudComputing,
];
