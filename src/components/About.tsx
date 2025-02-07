import React from "react";

export const About: React.FC = () => {
  return (
    <div className="relative z-10 bg-[#18253F] p-10" style={{ height: 2000 }}>
      <h2 className="text-3xl font-bold text-white">About Us</h2>
      <p className="mt-4 text-white">
        This section scrolls over the Hero section, creating a smooth parallax
        effect.
      </p>
    </div>
  );
};
