import { env } from "@/lib/env";
import clsx from "clsx";

interface Repo {
  [key: string]: string;
}

async function getRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${env.GITHUB_USERNAME}/repos`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch repos");
    }
    return (await res.json()) as Repo[];
  } catch (error) {
    console.error(error);
  }
}

async function getProjectRepos() {
  "use cache";
  const repos = await getRepos();
  if (repos) {
    const filtered = repos.filter((repo) =>
      repo.topics?.includes(env.REPO_TAG ?? ""),
    );
    return filtered;
  }
}

export function ProjectLink({ repo }: { repo?: Repo }) {
  if (!repo) {
    return (
      <a
        className="link"
        target="_blank"
        href={`https://github.com/${env.GITHUB_USERNAME}`}
      >
        All projects →
      </a>
    );
  }

  return (
    <a className="link" target="_blank" href={repo.html_url}>
      {repo.name}
    </a>
  );
}

export async function Projects() {
  const repos = await getProjectRepos();

  return (
    <section id="projects" className="w-full">
      <h2 className="mb-2 mt-8 text-xl font-bold">Projects</h2>
      <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-3">
        {repos?.slice(0, 6).map((repo, index) => (
          <div key={index} className="flex flex-1 flex-col space-y-2">
            <ProjectLink repo={repo} />
            <p className="text-neutral-300">{repo.description}</p>
          </div>
        ))}
      </div>
      <ProjectLink />
    </section>
  );
}
