import type { ComponentType } from "react";

import FinanceTracker, {
  meta as financeTrackerMeta,
} from "./content/finance-tracker.mdx";
import ReactWhiteboardStudio, {
  meta as reactWhiteboardStudioMeta,
} from "./content/react-whiteboard-studio.mdx";
import PodcastTracker, {
  meta as podcastTrackerMeta,
} from "./content/podcast-tracker.mdx";
import PydanticFixturegen, {
  meta as pydanticFixturegenMeta,
} from "./content/pydantic-fixturegen.mdx";
import PythonVersionPatchPr, {
  meta as pythonVersionPatchPrMeta,
} from "./content/python-version-patch-pr.mdx";
import PKTraffic, { meta as pktrafficMeta } from "./content/pktraffic.mdx";
import MovieBoxDB, { meta as movieboxdbMeta } from "./content/movieboxdb.mdx";
import WeatherBrain, {
  meta as weatherbrainMeta,
} from "./content/weatherbrain.mdx";
import Ecoloop, { meta as ecoloopMeta } from "./content/ecoloop.mdx";
import ImageEditingApplication, {
  meta as imageEditingApplicationMeta,
} from "./content/image-editing-application.mdx";
import TvShowNetwork, {
  meta as tvShowNetworkMeta,
} from "./content/tvshownetwork.mdx";
import Kitgrid, { meta as kitgridMeta } from "./content/kitgrid.mdx";
import CloudComputing, {
  meta as cloudComputingMeta,
} from "./content/cloud-computing.mdx";

export type ArticleMeta = {
  path: string;
  period: string;
  header: string;
  description: string;
  headerLinks: { link: string; display: string }[];
  image: string;
};

type MDXComponentsMap = Record<string, ComponentType<Record<string, unknown>>>;
export type ArticleItem = ArticleMeta & {
  Content: ComponentType<{ components?: MDXComponentsMap }>;
};

const financeTracker: ArticleItem = {
  ...financeTrackerMeta,
  Content: FinanceTracker,
};

const reactWhiteboardStudio: ArticleItem = {
  ...reactWhiteboardStudioMeta,
  Content: ReactWhiteboardStudio,
};

const podcastTracker: ArticleItem = {
  ...podcastTrackerMeta,
  Content: PodcastTracker,
};

const pydanticFixturegen: ArticleItem = {
  ...pydanticFixturegenMeta,
  Content: PydanticFixturegen,
};

const pythonVersionPatchPr: ArticleItem = {
  ...pythonVersionPatchPrMeta,
  Content: PythonVersionPatchPr,
};

const pktraffic: ArticleItem = {
  ...pktrafficMeta,
  Content: PKTraffic,
};

const movieboxdb: ArticleItem = {
  ...movieboxdbMeta,
  Content: MovieBoxDB,
};

const weatherbrain: ArticleItem = {
  ...weatherbrainMeta,
  Content: WeatherBrain,
};

const ecoloop: ArticleItem = {
  ...ecoloopMeta,
  Content: Ecoloop,
};

const imageEditingApplication: ArticleItem = {
  ...imageEditingApplicationMeta,
  Content: ImageEditingApplication,
};

const tvShowNetwork: ArticleItem = {
  ...tvShowNetworkMeta,
  Content: TvShowNetwork,
};

const kitgrid: ArticleItem = {
  ...kitgridMeta,
  Content: Kitgrid,
};

const cloudComputing: ArticleItem = {
  ...cloudComputingMeta,
  Content: CloudComputing,
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
