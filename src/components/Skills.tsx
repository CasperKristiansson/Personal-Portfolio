import {
  IconBrandAmazon,
  IconCode,
  IconGitPullRequest,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import amazonApiGatewayIcon from "../assets/aws/amazon-api-gateway.png";
import amazonBedrockIcon from "../assets/aws/amazon-bedrock.png";
import amazonCloudFrontIcon from "../assets/aws/amazon-cloudfront.png";
import amazonCloudWatchIcon from "../assets/aws/amazon-cloudwatch.png";
import amazonCognitoIcon from "../assets/aws/amazon-cognito.png";
import amazonDynamoDbIcon from "../assets/aws/amazon-dynamodb.png";
import amazonEc2Icon from "../assets/aws/amazon-ec2.png";
import amazonEcrIcon from "../assets/aws/amazon-ecr.png";
import amazonEcsIcon from "../assets/aws/amazon-ecs.png";
import amazonRdsIcon from "../assets/aws/amazon-rds.png";
import amazonRoute53Icon from "../assets/aws/amazon-route53.png";
import amazonS3Icon from "../assets/aws/amazon-s3.svg";
import amazonSnsIcon from "../assets/aws/amazon-sns.png";
import amazonSqsIcon from "../assets/aws/amazon-sqs.png";
import amazonVpcIcon from "../assets/aws/amazon-vpc.svg";
import awsAmplifyIcon from "../assets/aws/aws-amplify.png";
import awsAppSyncIcon from "../assets/aws/aws-appsync.png";
import awsCdkIcon from "../assets/aws/aws-cdk.png";
import awsCloudFormationIcon from "../assets/aws/aws-cloudformation.png";
import awsFargateIcon from "../assets/aws/aws-fargate.png";
import awsIamIcon from "../assets/aws/aws-iam.svg";
import awsLambdaIcon from "../assets/aws/aws-lambda.png";
import awsSystemsManagerIcon from "../assets/aws/aws-systems-manager.png";
import {
  fadeInItem,
  fadeUpItem,
  slideLeftItem,
  staggerContainer,
  staggerFast,
  viewportOnce,
} from "../shared/motion";
import openAiLogo from "../assets/openai-logo.png";

type BadgeItem = {
  name: string;
  color?: string;
  logo?: string;
  logoColor?: string;
  image?: string;
  badgeColor?: string;
};

const renderBadge = (
  item: BadgeItem,
  options?: { truncate?: boolean; maxWidthStyle?: string },
) => {
  if (item.image) {
    const truncateClass = options?.truncate ? "min-w-0 overflow-hidden" : "";
    return (
      <div
        className={`inline-flex h-full items-center gap-1.5 rounded-[4px] px-2 text-white sm:gap-2 ${truncateClass}`}
        style={{
          backgroundColor: item.badgeColor ?? "#0b0b0b",
          maxWidth: options?.maxWidthStyle,
        }}
      >
        <img
          src={item.image}
          alt={`${item.name} logo`}
          className="h-6 w-6 object-contain"
        />
        <span
          className={`text-[18px] leading-none text-white ${
            options?.truncate ? "min-w-0 truncate" : ""
          }`}
        >
          {item.name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={`https://img.shields.io/badge/${item.name}-${item.color}?logo=${item.logo}&logoColor=${item.logoColor}`}
      className="h-full"
    />
  );
};

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

const toolsFrameworks: BadgeItem[] = [
  { name: "GitHub", color: "181717", logo: "github", logoColor: "white" },
  { name: "React", color: "61DAFB", logo: "react", logoColor: "black" },
  { name: "Next.js", color: "000000", logo: "nextdotjs", logoColor: "white" },
  { name: "Astro", color: "FF5D01", logo: "astro", logoColor: "white" },
  { name: "Vite", color: "646CFF", logo: "vite", logoColor: "white" },
  {
    name: "Framer Motion",
    color: "0055FF",
    logo: "framer",
    logoColor: "white",
  },
  {
    name: "React Hook Form",
    color: "EC5990",
    logo: "reacthookform",
    logoColor: "white",
  },
  { name: "Zod", color: "3E67B1", logo: "zod", logoColor: "white" },
  { name: "Zustand", color: "000000", logo: "zustand", logoColor: "white" },
  { name: "Redux", color: "764ABC", logo: "redux", logoColor: "white" },
  {
    name: "Redux Toolkit",
    color: "764ABC",
    logo: "redux",
    logoColor: "white",
  },
  { name: "GraphQL", color: "E10098", logo: "graphql", logoColor: "white" },
  { name: "Docker", color: "2496ED", logo: "docker", logoColor: "white" },
  { name: "Terraform", color: "623CE4", logo: "terraform", logoColor: "white" },
  { name: "SQL", color: "4479A1", logo: "mysql", logoColor: "white" },
  { name: "NoSQL", color: "003545", logo: "datadotai", logoColor: "white" },
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
  { name: "Firebase", color: "FFCA28", logo: "firebase", logoColor: "black" },
  {
    name: "WordPress",
    color: "21759B",
    logo: "wordpress",
    logoColor: "white",
  },
  { name: "OpenAI", image: openAiLogo, badgeColor: "#0b0b0b" },
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
    logo: "microstrategy",
    logoColor: "white",
  },
  {
    name: "Infrastructure as Code",
    color: "1F74B5",
    logo: "instructure",
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

const awsServices: BadgeItem[] = [
  {
    name: "AWS Lambda",
    image: awsLambdaIcon,
    badgeColor: "#ed7100",
  },
  {
    name: "Amazon Bedrock",
    image: amazonBedrockIcon,
    badgeColor: "#01a88d",
  },
  {
    name: "AWS Amplify",
    image: awsAmplifyIcon,
    badgeColor: "#dd344c",
  },
  {
    name: "AWS CDK",
    image: awsCdkIcon,
    badgeColor: "#c925d1",
  },
  {
    name: "AWS Identity and Access Management (IAM)",
    image: awsIamIcon,
    badgeColor: "#dd344c",
  },
  {
    name: "Amazon Virtual Private Cloud (Amazon VPC)",
    image: amazonVpcIcon,
    badgeColor: "#8c4fff",
  },
  {
    name: "Amazon DynamoDB",
    image: amazonDynamoDbIcon,
    badgeColor: "#c925d1",
  },
  {
    name: "Amazon S3",
    image: amazonS3Icon,
    badgeColor: "#7aa116",
  },
  {
    name: "AWS CloudFormation",
    image: awsCloudFormationIcon,
    badgeColor: "#e7157b",
  },
  {
    name: "Amazon API Gateway",
    image: amazonApiGatewayIcon,
    badgeColor: "#8c4fff",
  },
  {
    name: "AWS AppSync",
    image: awsAppSyncIcon,
    badgeColor: "#e7157b",
  },
  {
    name: "Amazon SQS",
    image: amazonSqsIcon,
    badgeColor: "#e7157b",
  },
  {
    name: "Amazon Simple Notification Service (Amazon SNS)",
    image: amazonSnsIcon,
    badgeColor: "#e7157b",
  },
  {
    name: "Amazon API Gateway (WebSocket API)",
    image: amazonApiGatewayIcon,
    badgeColor: "#8c4fff",
  },
  {
    name: "Amazon EC2",
    image: amazonEc2Icon,
    badgeColor: "#ed7100",
  },
  {
    name: "Amazon ECS",
    image: amazonEcsIcon,
    badgeColor: "#ed7100",
  },
  {
    name: "Amazon Elastic Container Registry (Amazon ECR)",
    image: amazonEcrIcon,
    badgeColor: "#ed7100",
  },
  {
    name: "Amazon RDS",
    image: amazonRdsIcon,
    badgeColor: "#c925d1",
  },
  {
    name: "Amazon Route 53",
    image: amazonRoute53Icon,
    badgeColor: "#8c4fff",
  },
  {
    name: "Amazon CloudFront",
    image: amazonCloudFrontIcon,
    badgeColor: "#8c4fff",
  },
  {
    name: "Amazon CloudWatch",
    image: amazonCloudWatchIcon,
    badgeColor: "#e7157b",
  },
  {
    name: "AWS Systems Manager (SSM)",
    image: awsSystemsManagerIcon,
    badgeColor: "#e7157b",
  },
  {
    name: "Amazon Cognito",
    image: amazonCognitoIcon,
    badgeColor: "#dd344c",
  },
  {
    name: "AWS Fargate",
    image: awsFargateIcon,
    badgeColor: "#ed7100",
  },
];

export const Skills: React.FC = () => {
  return (
    <motion.section
      id="skills"
      className="relative bg-[#18253F] pt-36"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="pointer-events-none mb-10 md:mb-8 lg:sticky lg:top-0 lg:z-[60] lg:flex lg:h-[var(--sticky-nav-offset)] lg:items-center">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 lg:pl-16">
          <motion.h1
            className="text-center text-5xl leading-none font-bold text-white sm:text-5xl md:-translate-y-2.5 md:text-left"
            variants={slideLeftItem}
          >
            Skills
          </motion.h1>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1000px] px-4 text-white sm:px-10 2xl:max-w-[1400px]">
        <motion.div className="mt-6 flex flex-row" variants={fadeUpItem}>
          <IconBrandAmazon size={32} />
          <h2 className="ml-2 text-2xl font-bold">AWS Services</h2>
        </motion.div>
        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          variants={staggerFast}
        >
          {awsServices.map((service, index) => (
            <motion.div
              key={index}
              className="flex h-7 items-center justify-center sm:h-8"
              variants={fadeInItem}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {renderBadge(service, {
                truncate: true,
                maxWidthStyle: "calc(100vw - 64px)",
              })}
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="mt-10 flex flex-row" variants={fadeUpItem}>
          <IconCode size={32} />
          <h2 className="ml-2 text-2xl font-bold">Programming Languages</h2>
        </motion.div>
        <motion.div
          className="mt-4 flex flex-wrap gap-1"
          variants={staggerFast}
        >
          {programmingLanguages.map((language, index) => (
            <motion.div
              key={index}
              className="flex h-7 items-center justify-center sm:h-8"
              variants={fadeInItem}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={`https://img.shields.io/badge/${language.name}-${language.color}?logo=${language.logo}&logoColor=${language.logoColor}`}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="mt-10 flex flex-row" variants={fadeUpItem}>
          <IconGitPullRequest size={32} />
          <h2 className="ml-2 text-2xl font-bold">Tools & Frameworks</h2>
        </motion.div>
        <motion.div
          className="mt-4 flex flex-wrap gap-2"
          variants={staggerFast}
        >
          {toolsFrameworks.map((tool, index) => (
            <motion.div
              key={index}
              className="flex h-7 items-center justify-center sm:h-8"
              variants={fadeInItem}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {renderBadge(tool)}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
