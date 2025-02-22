import { Link } from "react-router";
import cloudComputing from "../assets/other/cloudComputing.png";
import thesis from "../assets/other/thesis.png";

export const Papers: React.FC = () => {
  return (
    <div className="relative z-10 bg-[#18253F] pt-36">
      <h1 className="mx-auto mb-14 max-w-[2000px] text-center text-6xl font-bold text-white sm:pl-10 sm:text-left lg:pl-40">
        Papers
      </h1>
      <div className="relative mx-auto h-[600px] w-full max-w-[1320px] overflow-hidden rounded-lg px-2">
        <img
          className="hidden h-[600px] w-full rounded-lg object-cover sm:flex"
          src={cloudComputing}
          alt="Cloud Computing"
        />
        <div className="absolute top-0 left-0 flex h-full w-full items-center px-4 sm:ml-4">
          <div className="card mx-auto w-96 rounded-lg glass shadow-lg sm:mx-0">
            <figure>
              <img
                className="rounded-t-lg"
                src={thesis}
                alt="thesis paper overview"
              />
            </figure>
            <div className="card-body p-4 px-6 text-white sm:text-black">
              <h2 className="card-title">
                Cloud Computing Pricing and Deployment Efforts
              </h2>
              <p>
                Navigating Cloud Computing Pricing and Deployment Efforts:
                Exploring the Public-Private Landscape
              </p>
              <div className="mt-10 card-actions">
                <Link to="/papers/cloud-computing">
                  <button className="btn btn-primary">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
