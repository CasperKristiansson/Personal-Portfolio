import {
  IconBrandAmazon,
  IconCode,
  IconGitPullRequest,
} from "@tabler/icons-react";

const programmingLanguages = [
  { name: "Python", color: "FFD43B", logo: "python", logoColor: "blue" },
  { name: "C", color: "00599C", logo: "c", logoColor: "white" },
  { name: "Java", color: "ED8B00", logo: "java", logoColor: "white" },
  {
    name: "JavaScript",
    color: "F7DF1E",
    logo: "javascript",
    logoColor: "323330",
  },
  {
    name: "TypeScript",
    color: "007ACC",
    logo: "typescript",
    logoColor: "white",
  },
  { name: "Go", color: "00ADD8", logo: "go", logoColor: "white" },
  { name: "Elixir", color: "4B275F", logo: "elixir", logoColor: "white" },
  { name: "Clojure", color: "5881D8", logo: "clojure", logoColor: "white" },
  { name: "Rust", color: "000000", logo: "rust", logoColor: "white" },
  { name: "PHP", color: "777BB4", logo: "php", logoColor: "white" },
];

const toolsFrameworks = [
  { name: "GitHub", color: "181717", logo: "github", logoColor: "white" },
  { name: "React", color: "61DAFB", logo: "react", logoColor: "black" },
  { name: "Redux", color: "764ABC", logo: "redux", logoColor: "white" },
  { name: "GraphQL", color: "E10098", logo: "graphql", logoColor: "white" },
  { name: "Docker", color: "2496ED", logo: "docker", logoColor: "white" },
  { name: "Terraform", color: "623CE4", logo: "terraform", logoColor: "white" },
  { name: "SQL", color: "4479A1", logo: "mysql", logoColor: "white" },
  { name: "NoSQL", color: "003545", logo: "nosql", logoColor: "white" },
  {
    name: "PostgreSQL",
    color: "336791",
    logo: "postgresql",
    logoColor: "white",
  },
  { name: "MySQL", color: "005C84", logo: "mysql", logoColor: "white" },
  {
    name: "Tailwind CSS",
    color: "06B6D4",
    logo: "tailwindcss",
    logoColor: "white",
  },
  { name: "ESLint", color: "4B32C3", logo: "eslint", logoColor: "white" },
  {
    name: "Serverless Framework",
    color: "FD5750",
    logo: "serverless",
    logoColor: "white",
  },

  { name: "CI/CD", color: "BDBDBD", logo: "githubactions", logoColor: "black" },
  { name: "Git", color: "F05032", logo: "git", logoColor: "white" },
  {
    name: "Microservices",
    color: "A833B9",
    logo: "microservices",
    logoColor: "white",
  },
  {
    name: "Infrastructure as Code",
    color: "1F74B5",
    logo: "iac",
    logoColor: "white",
  },
  {
    name: "Redux Saga",
    color: "999999",
    logo: "redux-saga",
    logoColor: "white",
  },
  {
    name: "Pydantic",
    color: "E92063",
    logo: "pydantic",
    logoColor: "white",
  },
];

const awsServices = [
  {
    name: "AWS Lambda",
    color: "3B25C1",
    logo: "awslambda",
    logoColor: "white",
  },
  {
    name: "DynamoDB",
    color: "3B25C1",
    logo: "Amazon%20DynamoDB",
    logoColor: "white",
  },
  { name: "Amazon S3", color: "3B25C1", logo: "amazon-s3", logoColor: "white" },
  {
    name: "AWS CloudFormation",
    color: "3B25C1",
    logo: "aws-cloudformation",
    logoColor: "white",
  },
  {
    name: "Amazon API Gateway",
    color: "3B25C1",
    logo: "amazonapigateway",
    logoColor: "white",
  },
  {
    name: "Amazon EC2",
    color: "3B25C1",
    logo: "amazon-ec2",
    logoColor: "white",
  },
  {
    name: "Amazon ECS",
    color: "3B25C1",
    logo: "amazon-ecs",
    logoColor: "white",
  },
  {
    name: "Amazon SNS",
    color: "3B25C1",
    logo: "amazon-sns",
    logoColor: "white",
  },
  {
    name: "Amazon RDS",
    color: "3B25C1",
    logo: "amazon-rds",
    logoColor: "white",
  },
  {
    name: "Amazon Route 53",
    color: "3B25C1",
    logo: "amazon-route-53",
    logoColor: "white",
  },
  {
    name: "Amazon CloudFront",
    color: "3B25C1",
    logo: "amazon-cloudfront",
    logoColor: "white",
  },
  {
    name: "Amazon CloudWatch",
    color: "3B25C1",
    logo: "amazon-cloudwatch",
    logoColor: "white",
  },
  {
    name: "Amazon Cognito",
    color: "3B25C1",
    logo: "amazon-cognito",
    logoColor: "white",
  },
  {
    name: "AWS Fargate",
    color: "3B25C1",
    logo: "awsfargate",
    logoColor: "white",
  },
];

export const Skills: React.FC = () => {
  return (
    <div className="relative z-10 bg-[#18253F] pt-36">
      <h1 className="mx-auto mb-14 max-w-[2000px] text-center text-6xl font-bold text-white sm:pl-10 sm:text-left lg:pl-40">
        Skills
      </h1>
      <div className="w-full px-4 text-white sm:px-10 2xl:mx-auto 2xl:max-w-[1400px]">
        <div className="mt-6 flex flex-row">
          <IconBrandAmazon size={32} />
          <h2 className="ml-2 text-2xl font-bold">AWS Services</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {awsServices.map((service, index) => (
            <div
              key={index}
              className="flex h-7 items-center justify-center sm:h-8"
            >
              <img
                src={`https://img.shields.io/badge/${service.name}-${service.color}?logo=${service.logo}&logoColor=${service.logoColor}`}
                className="h-full"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-row">
          <IconCode size={32} />
          <h2 className="ml-2 text-2xl font-bold">Programming Languages</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-1">
          {programmingLanguages.map((language, index) => (
            <div
              key={index}
              className="flex h-7 items-center justify-center sm:h-8"
            >
              <img
                src={`https://img.shields.io/badge/${language.name}-${language.color}?logo=${language.logo}&logoColor=${language.logoColor}`}
                className="h-full"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-row">
          <IconGitPullRequest size={32} />
          <h2 className="ml-2 text-2xl font-bold">Tools & Frameworks</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {toolsFrameworks.map((tool, index) => (
            <div
              key={index}
              className="flex h-7 items-center justify-center sm:h-8"
            >
              <img
                src={`https://img.shields.io/badge/${tool.name}-${tool.color}?logo=${tool.logo}&logoColor=${tool.logoColor}`}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
