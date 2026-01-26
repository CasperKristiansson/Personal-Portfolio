import ecoloopOverview from "../assets/projects/ecoloop/ecoloopOverview.png";
import financeTrackerHero from "../assets/projects/financeTracker/financeTrackerHero.jpg";
import imageEditorOverview from "../assets/projects/imageEditor/imageEditorOverview.png";
import kitgridHero from "../assets/projects/kitgrid/kitgridHero.jpg";
import movieboxdbOverview from "../assets/projects/movieboxdb/movieboxdbOverview.png";
import pktrafficOverview from "../assets/projects/pktraffic/pktrafficOverview.png";
import podcastTrackerHero from "../assets/projects/podcastTracker/podcastTrackerHero.jpg";
import pydanticFixturegenHero from "../assets/projects/pydanticFixturegen/pydanticFixturegenHero.jpg";
import pythonVersionPatchPrHero from "../assets/projects/pythonVersionPatchPr/pythonVersionPatchPrHero.jpg";
import reactWhiteboardStudioHero from "../assets/projects/reactWhiteboardStudio/reactWhiteboardStudioHero.jpg";
import tvShowNetworkOverview from "../assets/projects/tvshownetwork/tvShowNetworkOverview.png";
import weatherbrainOverview from "../assets/projects/weatherbrain/weatherbrainOverview.png";

export type ProjectTier = "featured" | "notable" | "more";

export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | {
      type: "animation";
      id: "pydantic-fixturegen" | "python-version-patch-pr";
    };

export type Project = {
  id: string;
  title: string;
  summary: string;
  outcome?: string;
  tags: string[];
  categories: string[];
  image: string;
  media?: ProjectMedia;
  path: string;
  tier: ProjectTier;
  spotlight?: boolean;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    summary:
      "Personal finance intelligence with ingestion, categorization, reporting, and insights for budgets, goals, and cash flow clarity. Built to replace spreadsheets with a productized workspace that tracks transactions, categories, subscriptions, and net worth trends.",
    outcome:
      "Outcome: unified clarity across cash flow, budgets, and net worth.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "Python",
      "AWS",
      "Terraform",
    ],
    categories: ["Product", "Cloud"],
    image: financeTrackerHero,
    path: "/articles/finance-tracker",
    tier: "featured",
    spotlight: true,
    liveUrl: "https://finance-tracker.casperkristiansson.com/",
  },
  {
    id: "pktraffic",
    title: "PKTraffic, LLC",
    summary:
      "Traffic data collection and analysis platform for Florida highways.",
    tags: [
      "React",
      "Firebase",
      "MySQL",
      "Python",
      "FFmpeg",
      "Selenium",
      "PyQt",
    ],
    categories: ["Product", "Cloud"],
    image: pktrafficOverview,
    path: "/articles/pktraffic",
    tier: "featured",
    liveUrl: "https://pktraffic.com/",
  },
  {
    id: "pydantic-fixturegen",
    title: "pydantic-fixturegen",
    summary:
      "Deterministic fixtures and datasets for Pydantic v2, dataclasses, and TypedDicts.",
    tags: ["Python", "Pydantic", "CLI", "PyPI", "Testing", "Open Source"],
    categories: ["Open Source", "DevOps"],
    image: pydanticFixturegenHero,
    media: { type: "animation", id: "pydantic-fixturegen" },
    path: "/articles/pydantic-fixturegen",
    tier: "featured",
    liveUrl: "https://github.com/CasperKristiansson/pydantic-fixturegen",
  },
  {
    id: "podcast-tracker",
    title: "Podcast Tracker",
    summary:
      "Spotify-synced podcast tracker with show pages and listening history.",
    tags: ["Astro", "TypeScript", "Tailwind CSS", "GraphQL", "AWS", "DynamoDB"],
    categories: ["Product", "Web"],
    image: podcastTrackerHero,
    path: "/articles/podcast-tracker",
    tier: "featured",
    liveUrl: "https://podcast.casperkristiansson.com/",
  },
  {
    id: "react-whiteboard-studio",
    title: "React Whiteboard Studio",
    summary:
      "Polished whiteboard with fluid canvas interactions and persistence.",
    tags: ["React", "TypeScript", "Canvas", "Zustand", "IndexedDB"],
    categories: ["Product", "Web"],
    image: reactWhiteboardStudioHero,
    path: "/articles/react-whiteboard-studio",
    tier: "notable",
    liveUrl: "https://draw.casperkristiansson.com/",
  },
  {
    id: "cpython-patch-pr-action",
    title: "CPython Patch PR Action",
    summary:
      "GitHub Action that keeps CPython patch versions current across repos.",
    tags: ["TypeScript", "Node.js", "GitHub Actions", "CI/CD", "Open Source"],
    categories: ["Open Source", "DevOps"],
    image: pythonVersionPatchPrHero,
    media: { type: "animation", id: "python-version-patch-pr" },
    path: "/articles/python-version-patch-pr",
    tier: "notable",
    liveUrl: "https://github.com/CasperKristiansson/python-version-patch-pr",
  },
  {
    id: "movieboxdb",
    title: "MovieBoxDB",
    summary: "Movie tracking app with search and rich metadata.",
    tags: ["Firebase", "Firestore", "Firebase Auth", "Figma"],
    categories: ["Product", "Web"],
    image: movieboxdbOverview,
    path: "/articles/movieboxdb",
    tier: "notable",
    liveUrl: "https://movieboxdb.web.app/",
  },
  {
    id: "kitgrid",
    title: "Kitgrid",
    summary:
      "Personal docs network that aggregates raw Markdown across repos into a shared documentation hub.",
    tags: ["Astro", "TypeScript", "Markdown", "PNPM"],
    categories: ["Product", "Web"],
    image: kitgridHero,
    path: "/articles/kitgrid",
    tier: "more",
    liveUrl: "https://kitgrid.dev/",
  },
  {
    id: "image-editor",
    title: "Image Editor",
    summary: "Batch image editing app for the Swedish postal service.",
    tags: ["Python", "PyQt", "OpenCV", "Desktop"],
    categories: ["Product"],
    image: imageEditorOverview,
    path: "/articles/image-editing-application",
    tier: "more",
  },
  {
    id: "weatherbrain",
    title: "WeatherBrain",
    summary: "ML-powered weather prediction app using IoT data.",
    tags: ["Azure", "TensorFlow", "IoT", "Raspberry Pi", "REST API"],
    categories: ["AI/ML", "Cloud"],
    image: weatherbrainOverview,
    path: "/articles/weatherbrain",
    tier: "more",
  },
  {
    id: "sulfide-soil-classification",
    title: "Sulfide Soil Classification",
    summary: "Tool for detecting sulfide soil in Northern Sweden and Finland.",
    tags: ["React", "TypeScript", "Firebase", "GitHub Actions", "API"],
    categories: ["Sustainability", "Web"],
    image: ecoloopOverview,
    path: "/articles/ecoloop",
    tier: "more",
  },
  {
    id: "tv-show-network",
    title: "TV Show Network",
    summary:
      "Collaborative TV industry blogging platform with revenue sharing.",
    tags: ["WordPress", "SEO", "AdSense", "JavaScript"],
    categories: ["Web", "Product"],
    image: tvShowNetworkOverview,
    path: "/articles/tvshownetwork",
    tier: "more",
  },
];
