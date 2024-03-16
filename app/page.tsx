import React from 'react';
import { Metadata } from 'next'
import { getShowcaseRepos } from '@/files';

import Header from '@/components/Header'
import Showcase from '@/components/Showcase';

export const metadata: Metadata = {
  title: 'Portfolio | Leo Mosley'
}

export default async function Home() {
  const showcaseRepos = await getShowcaseRepos();

  return (
    <>
    <Header />
    <div className="flex items-center h-screen p-4">
      <div className="flex flex-col p-2">
        <h1 className="">Hi, i'm Leo...</h1>
        <p className=""></p>
      </div>
    </div>
    <div id="projects" className="flex flex-col items-center justify-center h-screen p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex flex-wrap gap-4">
        {showcaseRepos?.map((repo, index) => (
          <Showcase key={index} repo={repo} />
          ))}
      </div>
    </div>
    <div id="skills" className="flex items-center h-screen">
    </div>
    </>
  );
}