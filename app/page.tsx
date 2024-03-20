import React from 'react';

import Projects from '@/components/Projects';
import Blogs from '@/components/Blogs';

export default async function Home() {
  return (
    <main className="flex flex-col justify-center p-6 mx-auto max-w-2xl">
      <header id="header" className="">
      </header>
      <section id="introduction" className="">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>
      <Projects />
      <Blogs />
    </main>
  );
}