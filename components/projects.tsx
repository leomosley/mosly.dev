import { GITHUB_LINK } from "@/lib/config";
import { env } from "@/lib/env";

interface Repo {
  [key: string]: string;
}

async function getRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${env.NEXT_PUBLIC_GITHUB_USERNAME}/repos`,
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
      repo.topics?.includes(env.NEXT_PUBLIC_REPO_TAG ?? ""),
    );
    return filtered;
  }
}

export function ProjectLink({ repo }: { repo?: Repo }) {
  if (!repo) {
    return (
      <a className="link" target="_blank" href={GITHUB_LINK}>
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
      <h2 className="mt-8 mb-2 text-xl font-bold">Projects</h2>
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
