'use server';
export interface File {
  filename: string; 
  content: string; 
  extension: string
}

export interface Files {
  [key: string]: File[];
};

export interface Repo {
  id?: number;
  node_id?: string;
  name?: string;
  full_name?: string;
  private?: boolean;
  owner?: {
    login?: string;
    id?: number;
    node_id?: string;
    avatar_url?: string;
    gravatar_id?: string;
    url?: string;
    html_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type?: string;
    site_admin?: boolean;
  };
  html_url?: string;
  description?: string | null;
  fork?: boolean;
  url?: string;
  forks_url?: string;
  keys_url?: string;
  collaborators_url?: string;
  teams_url?: string;
  hooks_url?: string;
  issue_events_url?: string;
  events_url?: string;
  assignees_url?: string;
  branches_url?: string;
  tags_url?: string;
  blobs_url?: string;
  git_tags_url?: string;
  git_refs_url?: string;
  trees_url?: string;
  statuses_url?: string;
  languages_url?: string;
  stargazers_url?: string;
  contributors_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  commits_url?: string;
  git_commits_url?: string;
  comments_url?: string;
  issue_comment_url?: string;
  contents_url?: string;
  compare_url?: string;
  merges_url?: string;
  archive_url?: string;
  downloads_url?: string;
  issues_url?: string;
  pulls_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  labels_url?: string;
  releases_url?: string;
  deployments_url?: string;
  created_at?: string;
  updated_at?: string;
  pushed_at?: string;
  git_url?: string;
  ssh_url?: string;
  clone_url?: string;
  svn_url?: string;
  homepage?: string;
  size?: number;
  stargazers_count?: number;
  watchers_count?: number;
  language?: string;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  has_discussions?: boolean;
  forks_count?: number;
  mirror_url?: null;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: {
    key?: string;
    name?: string;
    spdx_id?: string;
    url?: string;
    node_id?: string;
  };
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
  topics?: string[];
  visibility?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  default_branch?: string;
}

export async function getRepos() {
  const res = await fetch('https://api.github.com/users/leomosley/repos', { cache: 'no-store'});
  const data = await res.json() as Repo[];
  return data;
}

export async function getShowcaseRepos() {
  const repos = await getRepos();
  const filtered = repos.filter(repo => repo.topics?.includes('showcase'));
  return filtered;
}

export async function getRepoReadme(repo: Repo) {
  const owner = repo.owner?.login;
  const name = repo.name;
  const branch = repo.default_branch;

  const res = await fetch(`https://raw.githubusercontent.com/${owner}/${name}/${branch}/README.md`);
  const raw = res.text();
  return raw;
}

export async function getFiles() {
  const files: Files = {
    "~": [],
    "/about": [],
    "/projects": [],
    "/contact": [],
  }

  const showcases = await getShowcaseRepos();
  for (const showcase of showcases) {
    let extension = ".md";
    let filename = showcase.name + extension;
    let content = await getRepoReadme(showcase);

    files["/projects"].push({
      filename: filename,
      content: content ?? "No content",
      extension: extension
    })
  }
  return files;
};