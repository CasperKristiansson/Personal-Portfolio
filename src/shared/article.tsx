import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { Icons } from "../components/Icons";

export const article: ArticleItem = {
  period: "20 Jan 2020 - 31 Jan 2020",
  header: "Article Title",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus eius neque maiores recusandae.",
  headerLinks: [
    {
      link: "https://pktraffic.com/",
      display: "PKTraffic.com",
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

      <div className="x-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="order-2 mx-auto flex flex-col justify-center px-4 sm:px-20 lg:order-1">
            <p className="text-gray-600">{article.period}</p>
            <h1 className="text-4xl font-bold">{article.header}</h1>
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
            className="order-1 h-[600px] w-full bg-cover bg-center lg:order-2"
            style={{
              backgroundImage: "url('../images/pktrafficOverview.png')",
            }}
          ></div>
        </div>

        <div className="mt-12 text-gray-700">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            cumque nemo dolorum in incidunt aut maxime...
          </p>
          <hr className="my-6" />

          <h2 className="text-3xl font-bold">Technologies Used</h2>
          <ul className="mt-4 list-disc pl-6">
            <li>
              <strong>React</strong> for frontend
            </li>
            <li>
              <strong>Firebase</strong> for authentication
            </li>
            <li>
              <strong>MySQL</strong> for data management
            </li>
            <li>
              <strong>Python</strong> with PyQt for visualization
            </li>
            <li>
              <strong>Selenium</strong> for data collection
            </li>
          </ul>

          <img
            src="../images/TvShowNetwork Website Overview.jpg"
            alt="Project Preview"
            className="mt-6"
          />
          <span className="block text-gray-600 italic">
            This image represents...
          </span>

          <h2 className="mt-8 text-3xl font-bold">Features</h2>
          <p className="mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem dolorum nihil magni voluptatum debitis...
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link to="/" className="text-blue-600">
          <IconArrowLeft className="mr-2 inline" /> Back to home page
        </Link>
      </div>
    </div>
  );
};
