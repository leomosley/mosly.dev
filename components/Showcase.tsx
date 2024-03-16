import React from 'react'
import { Repo } from '@/files';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  repo:Repo;
}

export default async function Showcase({
  repo,
}: Props) {
  const url = "https://github-language-color.shuttleapp.rs/" + repo.language;
  const res = await fetch(url);
  const languageColor = await res.json();
  const date = repo.updated_at?.slice(0, 10);

  return (
    <Link 
      className={clsx(
        "flex flex-1 flex-col h-40 min-w-fit p-4 overflow-clip",
        "border border-neutral-800 hover:border-gray-200 rounded-lg",
        "bg-neutral-900/40 cursor-pointer font-mono transition",
      )}
      href={`/projects/${repo.name}`}
    >
      <div className="flex flex-col">
        <h1 className="text-lg glow font-bold">{repo.name}</h1>
        <a 
          className="text-gray-400 hover:underline"
          target="_blank"
          href={repo.homepage}  
        >{repo.homepage?.slice(8)}
        </a>
      </div>
      
      <p className="max-w-sm my-2">{repo.description}</p>
      
      <div className="flex w-full mt-auto">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4">
            <circle cx="8" cy="8" r="7" fill={await languageColor} />
          </svg>
          <p className="align-middle">{repo.language}</p>
        </div>
        
        <p className="ml-auto">Last updated {date}</p>
      </div>
    </Link>
  );
}
