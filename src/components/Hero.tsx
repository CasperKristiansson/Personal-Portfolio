import React, { useEffect } from "react";

export const Hero: React.FC = () => {
  useEffect(() => {
    const width = window.innerWidth;
    const starCount = Math.floor(width * 0.2);

    const starsContainer = document.querySelector(".stars-container");
    if (!starsContainer) return;

    starsContainer.innerHTML = "";

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 4 + 1;
      star.classList.add("star");

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;

      const glow =
        size < 2
          ? "0 0 3px yellow"
          : size < 3
            ? "0 0 5px #f8f8ba"
            : "0 0 10px white";
      star.style.boxShadow = glow;

      const duration = Math.random() * 2 + 1;
      star.style.animation = `twinkle ${duration}s infinite alternate ease-in-out`;

      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="parallax relative flex h-[80vh] items-center justify-center">
      <div className="stars-container pointer-events-none fixed inset-0 h-full w-full"></div>
      <h1 className="relative z-10 text-3xl font-bold text-white sm:text-6xl md:text-7xl">
        <span className="typewriter">Casper Kristiansson.</span>
      </h1>
    </div>
  );
};
