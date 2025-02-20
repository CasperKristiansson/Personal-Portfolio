import { Link } from "react-router";

export const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#18253F] p-10">
      <div className="text-center text-[60px] leading-none font-extrabold text-blue-300 sm:text-[120px]">
        404
      </div>
      <h1 className="text-center text-4xl font-extrabold text-white sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-6 mb-8 max-w-xl text-center text-lg text-blue-200">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to={"/"} className="btn btn-primary">
        Go back home
      </Link>
    </div>
  );
};
