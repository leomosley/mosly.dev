import React from 'react';
import Header from '@/components/Header';
import { getRepo, getRepoReadme } from '@/files';
import { FaGithub } from 'react-icons/fa6';
import Markdown from 'react-markdown';
import clsx from 'clsx';


export default async function Project({ params } : { params: {name: string} }) {
  const repo = await getRepo(params.name);
  const content = repo && await getRepoReadme(repo);
  const url = "https://github-language-color.shuttleapp.rs/" + repo?.language;
  const res = await fetch(url);
  const languageColor = await res.json();
  const date = repo?.updated_at?.slice(0, 10);

  return (
    <>
    <Header />
    <article className={clsx(
      "prose prose-lg prose-neutral prose-invert",
      "glow p-4 md:p-10 mx-auto max-w-5xl",
      "border border-y-0 border-x-neutral-900 bg-neutral-900/10"
    )}>
      <div className="flex h-12 flex-row divide-x-2 divide-neutral-900 mt-10 mb-0">
        <h1 className="mr-2">{params.name}</h1>
        <a
          className="w-10"
          href={repo?.html_url}
          target="_blank"
        >
          <FaGithub className="ml-2 w-full h-full"/>   
        </a>
      </div>
      <hr className="mx-0 my-5"></hr>
      <Markdown>{content}</Markdown>
    </article>
    </>
  );
}
