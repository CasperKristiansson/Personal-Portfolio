import React from "react";
import profilePicture from "../assets/profilePicture.jpg";

export const About: React.FC = () => {
  return (
    <div className="relative z-10 flex w-full items-center justify-center bg-[#18253F] p-2 lg:p-6 xl:p-10">
      <div className="mt-12 flex w-full max-w-[1400px] flex-col items-center gap-6 rounded-lg p-4 shadow-lg xl:flex-row xl:items-start">
        <img
          src={profilePicture}
          alt="Casper Kristiansson"
          className="mb-4 h-1/2 w-full rounded-lg object-cover shadow-xl md:mb-0 lg:w-3/5 xl:w-1/2"
        />
        <div className="mt-4 w-full max-w-[750px] text-white lg:mt-6 xl:mt-8 xl:w-full xl:max-w-full">
          <h2 className="text-3xl font-bold">Hey there, I'm Casper</h2>
          <p className="mt-4 font-bold italic">
            Co-Founder Driving Scalable Tech Solutions
          </p>
          <p className="mt-2">
            As the co-founder of two impactful companies, I am passionate about
            building scalable, innovative solutions. Klimra simplifies the
            process of claiming compensation for delayed train journeys in
            Sweden, while my U.S.-based traffic analytics firm focuses on
            advanced traffic data collection and analysis. Both ventures
            showcase my expertise in full-stack and cloud development, as well
            as my ability to lead projects from concept to execution.
          </p>
          <p className="mt-2">
            In addition to my entrepreneurial endeavors, I’ve worked extensively
            at Scatterin, where I developed a cloud-based platform for real-time
            data analysis of neutron and synchrotron experiments, handling
            large-scale datasets through AWS infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
};
