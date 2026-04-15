import { IntroLink } from "@/components/intro";
import { env } from "./env";

// Social Links
export const GITHUB_LINK = `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`;
export const LINKEDIN_LINK = `https://www.linkedin.com/in/${env.NEXT_PUBLIC_LINKEDIN_USERNAME}/`;
export const TWITTER_LINK = `https://twitter.com/${env.NEXT_PUBLIC_TWITTER_HANDLE}`;

// AI Model
export const MODEL = "gemma-2-2b-it-q4f16_1-MLC";

// Work Experience
export const WORK = [
  {
    company: "Elanco",
    link: "https://www.elanco.com/",
    position: "Software Engineer",
    duration: "2025 - Present",
    description:
      "Contributed to the development of a internal AI chatbot that leverages LLMs, from multiple model providers, to help employees streamline workflows, content generation, and retrieve complex information. Was a key contributor to a dynamic application for mapping and visualizing product team structures and hierarchies, improving visibility and resource allocation.",
  },
] as const;

export const INTRO = (
  <>
    Hi there, I&apos;m <b>{env.NEXT_PUBLIC_FIRST_NAME}</b>. I&apos;m a Software
    Engineer {"@ "}
    <IntroLink href="https://www.port.ac.uk/">
      <b>UoP</b>
    </IntroLink>{" "}
    currently on placement {"@ "}
    <IntroLink href="https://www.elanco.com/">
      <b>Elanco</b>
    </IntroLink>
    . I&apos;m passionate about <b>coding</b> and <b>building things</b>. I
    enjoy <b>full-stack web development</b>, developing <b>CLI tools</b>, and
    everything else <b>code</b>.
  </>
);
