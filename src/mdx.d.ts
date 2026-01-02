declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType<{
    components?: Record<string, ComponentType<Record<string, unknown>>>;
  }>;

  export const meta: {
    path: string;
    period: string;
    header: string;
    description: string;
    headerLinks: { link: string; display: string }[];
    image: string;
  };

  export default MDXComponent;
}
