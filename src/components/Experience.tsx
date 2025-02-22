import { TimeLine, TimelineItem } from "../shared/timeLine";

const timelineItems: TimelineItem[] = [
  {
    period: "Aug 2024 - Current",
    location: "Klimra",
    header: "Co-Founder & CTO",
    description:
      "Klimra revolutionizes how passengers claim compensation for delayed train journeys in Sweden, offering a fully automated and seamless experience. In addition to streamlining claims, we are expanding our services to provide an on-demand free taxi solution for short-distance delays. As Co-Founder & CTO, I built the system from the ground up and led a team of five engineers, including interns with varying experience levels.",
    listItems: [
      "Designed and implemented a serverless backend in Python using Terraform for infrastructure management.",
      "Ensured compliance with Google CASA security requirements, strengthening authentication and data protection.",
      "Built a highly scalable and secure system on AWS, leveraging Lambda, DynamoDB, Route 53, CloudFront, Cognito, and Fargate for scheduled batch jobs.",
      "Developed a Google authentication API, integrating identity federation and extra scopes like email linking.",
      "Built a file analysis pipeline using OpenAI API to extract train ticket details for compensation claims.",
      "Developed the frontend with React, TypeScript, and ESLint, integrating multi-stage environments and CI/CD pipelines for efficient and reliable deployments.",
    ],
    link: "https://klimra.com",
    linkDisplay: "klimra.com",
  },
  {
    period: "Feb 2023 - Current",
    location: "Scatterin",
    header: "FullStack Developer",
    description:
      "At Scatterin, I've developed a fully cloud-based platform for industrial companies to analyze material data from neutron and synchrotron experiments. My key responsibilities include:",
    listItems: [
      "Built and maintained a 10+ service AWS infrastructure using Terraform with S3, DynamoDB, clusters, and Lambda across multiple stages.",
      "Created 100+ AWS Lambda endpoints, ensuring scalability for large-scale data processing.",
      "Designed a custom frontend for managing large datasets, enabling users to interact with 100s gigabytes of data.",
      "Built a system for real-time analysis of neutron and synchrotron experiments, enabling users to set parameters and perform analyses as data was collected during the experiments.",
      "Collaborated with data scientists to deploy their algorithms efficiently in the cloud, improving data interaction and export workflows.",
      "Solved infrastructure challenges and optimized platform performance with AWS support.",
    ],
    link: "https://scatterin.com",
    linkDisplay: "scatterin.com",
  },
  {
    period: "Dec 2020 - Sep 2024",
    location: "PKTraffic, LLC",
    header: "Co-Founder & CTO",
    description:
      "PK Traffic specializes in comprehensive public record searches of traffic-related data and events, providing expert analysis and support for enhanced roadway safety and incident management. I was responsible for the end-to-end development of the company's flagship product, focusing on cost-effective, scalable solutions for traffic data collection and analysis:",
    listItems: [
      "Developed an innovative hybrid system for the integration and capture of surveillance footage across 3,000 highway cameras.",
      "Designed and implemented a scalable video storage solution that handled 10s of terabytes of traffic footage, leveraging AWS S3 Deep Glacier Archive to minimize long-term storage costs.",
      "Successfully recorded video data from approximately 45,000 traffic incidents, contributing to robust analytics.",
      "Delivered comprehensive data that enhanced quality control measures and helped police investigations.",
    ],
    link: "https://pktraffic.com",
    linkDisplay: "pktraffic.com",
  },
  {
    period: "Jan 2023 - Jun 2023",
    location: "Amaceit",
    header: "Bachelor Thesis",
    description:
      'I completed a thesis titled "Cloud Computing Pricing and Deployment Efforts" investigating the landscape of public and private cloud computing services. The thesis aimed to compare the pricing and implementation efforts of various cloud providers, with a specific focus on Google GCP, Microsoft Azure, and Amazon AWS.',
    link: "https://amaceit.se",
    linkDisplay: "amaceit.se",
  },
  {
    period: "Jun 2022 - Aug 2022",
    location: "Northvolt",
    header: "Backend Software Engineer",
    description:
      "Built an advanced task management system for maintenance of factory machines at Northvolt.",
    listItems: [
      "Developed GraphQL endpoints using Go",
      "Worked on data modeling in DynamoDB",
      "Implemented Infrastructure as Code (IaC) using Terraform",
      "Developed serverless computing solutions using AWS Lambda",
    ],
    link: "https://northvolt.com",
    linkDisplay: "northvolt.com",
  },
  {
    period: "Jul 2021 - Aug 2021",
    location: "Personalstiftelsen PostNord Plus",
    header: "Full Stack Developer",
    description:
      "I worked as a software developer on a contract basis where I was responsible for developing two applications - an image editor and a mass email sender. The primary goal of these applications was to save time for the employees by automating repetitive tasks.",
    listItems: [
      "Achieved a 75% reduction in time required for image editing and email sending",
      "Used Python, PyQt, and QT Designer for development",
      "Collaborated with the team to meet business requirements",
      "Provided ongoing support and maintenance",
    ],
    link: "https://postnordplus.com",
    linkDisplay: "postnordplus.com",
  },
  {
    period: "2017 - 2020",
    location: "Personalstiftelsen PostNord Plus",
    header: "Administrative Assistant",
    description:
      "Performed administrative tasks such as handling email lists, labeling packages, and organizing events.",
    listItems: ["Developed two IT programs for the personnel foundation"],
    link: "https://postnordplus.com",
    linkDisplay: "postnordplus.com",
  },
  {
    period: "2017 - 2018",
    location: "Modis Restauranger AB",
    header: "Waiter",
    description:
      "Worked as a waiter at events and handled dishwashing and serving at Restaurang Modis in Solna, Stockholm.",
    link: "https://resturangmodis.se",
    linkDisplay: "resturangmodis.se",
    hide: true,
  },
  {
    period: "Jun 2017 - Jul 2017",
    location: "Stockholm Stad",
    header: "Caretaker",
    description:
      "Worked at a daycare center for seniors, responsible for organizing small events and café activities.",
    listItems: [
      "Assisted seniors with technology, including mobile phone support",
    ],
    link: "https://jobba.stockholm",
    linkDisplay: "jobba.stockholm",
    hide: true,
  },
  {
    period: "Jun 2016 - Jul 2016",
    location: "Citroën",
    header: "Administrative Assistant",
    description:
      "Worked with administrative assignments at Citroën’s head office, including document management and office relocation.",
    link: "https://hedinbil.se",
    linkDisplay: "hedinbil.se",
    hide: true,
  },
];

export const Experience: React.FC = () => {
  return <TimeLine timelineItems={timelineItems} title="Experience" />;
};
