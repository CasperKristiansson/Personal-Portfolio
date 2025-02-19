import cisco from "../assets/other/cisco.webp";
import eoa from "../assets/other/eoa.jpg";
import eoab from "../assets/other/eoab.png";

const certifications = [
  {
    image: eoab,
    description: "Elements of AI - Building AI",
    relation: "University of Helsinki",
    link: "https://certificates.mooc.fi/validate/pgcyqu3vdma",
  },
  {
    image: eoa,
    description: "Elements of AI - Introduction to AI",
    relation: "University of Helsinki",
    link: "https://certificates.mooc.fi/validate/c6d987p5jlk",
  },
  {
    image: cisco,
    description: "CCNA: Enterprise Networking, Security, and Automation",
    relation: "Cisco",
    link: "https://www.credly.com/badges/e2da5183-4b4a-45dc-ad20-d6fbc4ad3524?source=linked_in_profile",
  },
  {
    image: cisco,
    description: "CCNA: Switching, Routing, and Wireless Essentials",
    relation: "Cisco",
    link: "https://www.credly.com/badges/ef60012e-e90f-4d59-af73-1c3eeab48e9d?source=linked_in_profile",
  },
];

export const Certificates: React.FC = () => {
  return (
    <div className="relative z-10 bg-[#18253F] pt-36">
      <h1 className="mx-auto mb-14 max-w-[2000px] text-center text-5xl font-bold text-white sm:pl-10 sm:text-left sm:text-6xl lg:pl-40">
        Certifications
      </h1>
      <div className="w-full px-4 sm:px-10 2xl:mx-auto 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((certification, index) => (
            <div key={index} className="card card-side bg-[#111c32] shadow-xl">
              <figure className="h-60 w-60 bg-[#111c32]">
                <img
                  src={certification.image}
                  alt={certification.description}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body h-60 w-60 p-4 text-white">
                <h2 className="card-title">{certification.relation}</h2>
                <p>{certification.description}</p>
                <div className="card-actions">
                  <button
                    className="btn w-44 btn-primary"
                    onClick={() => window.open(certification.link, "_blank")}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
