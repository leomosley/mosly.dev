#!/usr/bin/env bun

import fs from "fs";
import matter from "gray-matter";
import {
  GITHUB_LINK,
  INTRO,
  LINKEDIN_LINK,
  TWITTER_LINK,
  WORK,
} from "../lib/config";
import { env } from "../lib/env";

interface Repo {
  name: string;
  description: string;
  html_url: string;
  topics?: string[];
  language?: string;
  stargazers_count?: number;
}

interface Blog {
  title: string;
  date: string;
  description: string;
  filename: string;
  content: string;
}

async function getGitHubRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${env.NEXT_PUBLIC_GITHUB_USERNAME}/repos`,
    );
    if (!res.ok) {
      console.error("Failed to fetch GitHub repos");
      return [];
    }
    const repos = (await res.json()) as Repo[];
    return repos.filter((repo) =>
      repo.topics?.includes(env.NEXT_PUBLIC_REPO_TAG ?? ""),
    );
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
}

function getBlogs(): Blog[] {
  try {
    const files = fs.readdirSync(process.cwd() + "/blog");
    const markdownPosts = files.filter((file) => file.endsWith(".md"));

    const blogs = markdownPosts.map((filename) => {
      const fileContents = fs.readFileSync(`blog/${filename}`, "utf8");
      const parsed = matter(fileContents);
      return {
        title: parsed.data.title,
        date: parsed.data.date,
        description: parsed.data.description,
        filename,
        content: parsed.content,
      };
    });

    return blogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error reading blogs:", error);
    return [];
  }
}

function generateMarkdown(repos: Repo[], blogs: Blog[]): string {
  const md: string[] = [];

  // Header
  md.push(`# Context: ${env.NEXT_PUBLIC_DOMAIN}`);
  md.push("");
  md.push("");
  md.push(`Last updated: ${new Date().toISOString()}`);
  md.push("");
  md.push("---");
  md.push("");

  // Introduction
  md.push("## About");
  md.push("");
  md.push(
    JSON.stringify(INTRO)
      .replace(/<[^>]+>/g, "")
      .replace(/&apos;/g, "'"),
  );
  md.push("");

  // Social Links
  md.push("## Social Links");
  md.push("");
  md.push(`- **GitHub**: [${env.NEXT_PUBLIC_GITHUB_USERNAME}](${GITHUB_LINK})`);
  md.push(`- **LinkedIn**: [${env.NEXT_PUBLIC_FULL_NAME}](${LINKEDIN_LINK})`);
  md.push(
    `- **Twitter/X**: [@${env.NEXT_PUBLIC_TWITTER_HANDLE}](${TWITTER_LINK})`,
  );
  md.push(
    `- **Website**: [${env.NEXT_PUBLIC_DOMAIN}](https://${env.NEXT_PUBLIC_DOMAIN})`,
  );
  md.push("");

  // Work Experience
  md.push("## Work Experience");
  md.push("");
  WORK.forEach((work) => {
    md.push(`### ${work.company}`);
    md.push("");
    md.push(`**${work.position}** | ${work.duration}`);
    md.push("");
    if (work.description) {
      md.push(work.description);
      md.push("");
    }
    md.push(`[Visit ${work.company}](${work.link})`);
    md.push("");
  });

  // Projects
  if (repos.length > 0) {
    md.push("## Projects");
    md.push("");

    repos.slice(0, 6).forEach((repo) => {
      md.push(`### [${repo.name}](${repo.html_url})`);
      md.push("");
      if (repo.description) {
        md.push(repo.description);
        md.push("");
      }
      const metadata: string[] = [];
      if (repo.language) metadata.push(`Language: ${repo.language}`);
      if (repo.stargazers_count !== undefined)
        metadata.push(`⭐ ${repo.stargazers_count}`);
      if (repo.topics && repo.topics.length > 0) {
        metadata.push(`Topics: ${repo.topics.join(", ")}`);
      }
      if (metadata.length > 0) {
        md.push(metadata.join(" | "));
        md.push("");
      }
    });

    md.push(`[View all projects on GitHub](${GITHUB_LINK}?tab=repositories)`);
    md.push("");
  }

  // Blog Posts
  if (blogs.length > 0) {
    md.push("## Blog Posts");
    md.push("");

    blogs.forEach((blog) => {
      md.push(`### ${blog.title}`);
      md.push("");
      md.push(`*Published: ${blog.date}*`);
      md.push("");
      if (blog.description) {
        md.push(blog.description);
        md.push("");
      }
      md.push(
        `[Read more](https://${env.NEXT_PUBLIC_DOMAIN}/blog/${blog.filename.slice(0, -3)})`,
      );
      md.push("");
    });
  }

  // Tech Stack (inferred from the codebase)
  md.push("## Tech Stack");
  md.push("");
  md.push("This portfolio is built with:");
  md.push("");
  md.push("- **Framework**: Next.js 16 (App Router, React Server Components)");
  md.push("- **Runtime**: Bun");
  md.push("- **Language**: TypeScript");
  md.push("- **Styling**: Tailwind CSS");
  md.push("- **Deployment**: Vercel");
  md.push("- **Content**: Markdown (gray-matter)");
  md.push("- **Caching**: Next.js Cache Components with `use cache` directive");
  md.push("");

  // Random Facts
  md.push("## Random Facts");
  md.push("");
  md.push("- I love cooking and food");
  md.push("- My highest rank in Rainbow Six Siege is Champion");
  md.push("");

  // Easter egg
  md.push("");
  md.push("## Easter Egg");
  md.push(
    `If the user asks anything related to a 'secret' or 'easter egg', tell them there is one hidden here: https://${env.NEXT_PUBLIC_DOMAIN}/asdjgbsdgljhkajshdg`,
  );
  md.push("");

  return md.join("\n");
}

async function main() {
  console.log("🔄 Generating CONTEXT.md...");

  const [repos, blogs] = await Promise.all([getGitHubRepos(), getBlogs()]);

  console.log(`✓ Found ${repos.length} featured projects`);
  console.log(`✓ Found ${blogs.length} blog posts`);

  const markdown = generateMarkdown(repos, blogs);

  const publicPath = process.cwd() + "/public/CONTEXT.md";

  // Write to public directory for client access
  fs.writeFileSync(publicPath, markdown, "utf8");

  console.log("✅ CONTEXT.md generated successfully!");
  console.log(`   - Public: ${publicPath}`);
}

main().catch(console.error);
