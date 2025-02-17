import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export const Projects: React.FC = () => {
  const cards = new Array(10).fill(0);

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
          className="flex space-x-2 overflow-x-auto pb-4 pl-5 sm:space-x-4 sm:pl-10 lg:space-x-6 lg:pl-40"
        >
          {cards.map((_, index) => (
            <div
              key={index}
              className="card w-4/5 flex-shrink-0 bg-base-100 shadow-sm sm:w-96 lg:w-[500px]"
            >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body h-[400px]">
                <h2 className="card-title">
                  Card Title
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  <div className="badge-outline badge">Fashion</div>
                  <div className="badge-outline badge">Products</div>
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
