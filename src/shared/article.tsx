import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { Icons } from "../components/Icons";
import { ArticleItem } from "../articles";

export const Article: React.FC<ArticleItem> = (article) => {
  return (
    <div className="relative w-full text-black">
      <Icons dark />
      <div className="fixed top-5 left-5 hidden items-center gap-2 text-black lg:flex">
        <Link to="/">
          <div className="flex flex-row hover:underline">
            <IconArrowLeft size={24} />
            <p>Go Back</p>
          </div>
        </Link>
      </div>
      <div className="mx-auto lg:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="order-2 mx-auto flex w-full max-w-[700px] flex-col justify-center px-6 lg:order-1">
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
              backgroundImage: `url(${article.image})`,
            }}
          ></div>
        </div>
      </div>
      <div className="mx-auto mt-10 w-full max-w-[700px] px-6 sm:mt-20">
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
