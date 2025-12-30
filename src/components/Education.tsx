import { TimeLine, TimelineItem } from "../shared/timeLine";

const timelineItems: TimelineItem[] = [
  {
    period: "2023 - 2025",
    location: "KTH Royal Institute of Technology",
    header: "Master's Degree, Computer Science",
    description:
      "The master's programme in Computer Science provides a broad education in computer science. Students acquire a solid foundation in advanced algorithms, computer security, artificial intelligence and internet protocols, and gain expertise through specialization tracks. Graduates pursue careers at the forefront of software-based technologies, for example, as software engineers, game developers, IT project managers, or go on to PhD studies to pursue careers in research labs or academia.",
    link: "https://www.kth.se/en/studies/master/computer-science/msc-computer-science-1.419974",
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
    period: "2020 - 2023",
    location: "KTH Royal Institute of Technology",
    header: "Bachelor's Degree, Computer Engineering",
    description:
      "The education is focused on technology that applies the opportunities the internet and the mobile phone network of the future, 5G offers. The program provides knowledge in the areas of processors, programming, computer networks, databases, and security. The education includes the basics for the development of cloud services and connected gadgets. During year three, the program is focused on app development or on the Internet of Things.",
    link: "https://www.kth.se",
    linkDisplay: "kth.se",
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
    <TimeLine timelineItems={timelineItems} title="Education" id="education" />
  );
};
