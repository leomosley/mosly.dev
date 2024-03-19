import React from 'react';
import { Metadata } from 'next'

import Projects from '@/components/Projects';

export default async function Home() {
  return (
    <main className="flex flex-col justify-center p-4 md:p-10 mx-auto max-w-3xl">
      <header id="header" className="">
      </header>
      <section id="introduction" className="">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>
      <Projects  />
    </main>
  );
}