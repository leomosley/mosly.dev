import { env } from "./env";

export const GITHUB_LINK = `https://github.com/${env.GITHUB_USERNAME}`
export const ELANCO_LINK = "https://www.elanco.com";
export const UOP_LINK = "https://www.port.ac.uk/";
export const LINKEDIN_LINK =
  "https://www.linkedin.com/in/leo-mosley-22b7b229b/";
export const TWITTER_LINK = "https://twitter.com/leomosly";

export const WORK = [
  {
    company: "Elanco",
    link: ELANCO_LINK,
    position: "Software Engineer",
    duration: "2025 - Present",
    description:
      "Contributed to the development of a internal AI chatbot that leverages LLMs, from multiple model providers, to help employees streamline workflows, content generation, and retrieve complex information. Was a key contributor to a dynamic application for mapping and visualizing product team structures and hierarchies, improving visibility and resource allocation.",
  },
] as const;
