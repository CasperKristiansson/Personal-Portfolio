import { IconLink } from "@tabler/icons-react";

type TimeLineItem = {
  period: string;
  location: string;
  header: string;
  description: string;
  link: string;
  linkDisplay: string;
};

const timelineItems: TimeLineItem[] = [
  {
    period: "2023 - 2025",
    location: "KTH Royal Institute of Technology",
    header: "Master's Degree, Computer Science",
    description:
      "The master's programme in Computer Science provides a broad education in computer science. Students acquire a solid foundation in advanced algorithms, computer security, artificial intelligence and internet protocols, and gain expertise through specialisation tracks. Graduates pursue careers at the forefront of software-based technologies, for example, as software engineers, game developers, IT project managers, or go on to PhD studies to pursue careers in research labs or academia.",
    link: "https://www.kth.se/en/studies/master/computer-science/msc-computer-science-1.419974",
    linkDisplay: "kth.se",
  },
  {
    period: "2020 - 2023",
    location: "KTH Royal Institute of Technology",
    header: "Bachelor's Degree, Computer Engineering",
    description:
      "The education is focused on technology that applies the opportunities the internet and the mobile phone network of the future, 5G offers. The program provides knowledge in the areas of processors, programming, computer networks, databases, and security. The education includes the basics for the development of cloud services and connected gadgets. During year three, the program is focused on app development or on the Internet of Things.",
    link: "https://www.kth.se",
    linkDisplay: "kth.se",
  },
  {
    period: "Mar 2024 - Aug 2024",
    location: "Kyushu University",
    header: "Exchange Semester",
    description:
      "Kyushu University is one of Japan's leading research-oriented institutes of higher education, consistently ranking as one of the top ten Japanese universities in the Times Higher Education World University Rankings and the QS World Rankings.",
    link: "https://www.kyushu-u.ac.jp",
    linkDisplay: "kyushu-u.ac.jp",
  },
  {
    period: "Aug 2022 - Jan 2023",
    location: "Hong Kong University of Science and Technology",
    header: "Exchange Semester",
    description:
      "The Hong Kong University of Science and Technology (HKUST) is a world-className international research university excelling in science, technology, and business as well as humanities and social science.",
    link: "https://www.hkust.edu.hk",
    linkDisplay: "hkust.edu.hk",
  },
  {
    period: "2017 - 2020",
    location: "Thorildsplans Gymnasium",
    header: "Information and Media Technology",
    description:
      "Completed high school at Thorildsplans Gymnasium in Stockholm, Sweden, graduating with a degree in information- and media technology. The degree included basics of networking, web development, and programming. Received a scholarship (Sten Vigrens Stipendiefond) for good grades and efforts during these three years.",
    link: "https://thorildsplansgymnasium.stockholm",
    linkDisplay: "thorildsplansgymnasium.stockholm",
  },
];

export const Education: React.FC = () => {
  return (
    <div className="relative z-10 bg-[#18253F] pt-36">
      <div className="mx-auto w-4/5 max-w-[1400px]">
        <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
          {timelineItems.map((item, index) => (
            <li
              key={index}
              style={{ gridTemplateColumns: "1fr auto 2fr" }}
              className="mt-[-10px]"
            >
              <div className="timeline-start mr-6 h-full">
                <h1 className="text-end text-xl font-bold text-white">
                  {item.location}
                </h1>
                <p className="mt-2 text-end text-[#90a6bb]">{item.period}</p>
              </div>
              <div className="timeline-middle">
                <div className="h-6 w-6 cursor-pointer rounded-full bg-[#90A6BB] transition-all duration-300 hover:bg-[#0f0] hover:shadow-2xl hover:shadow-green-500" />
              </div>
              <div className="timeline-end ml-6 h-full">
                <div className="text-2xl font-bold text-white">
                  {item.header}
                </div>
                <p className="mt-2 text-[#90a6bb]">{item.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:underline"
                  >
                    <IconLink className="mr-1" />
                    {item.linkDisplay}
                  </a>
                </div>
                <div className="mb-20" />
              </div>
              <hr className="bg-[#094a68]" style={{ width: "2px" }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
