import React from 'react';

import Projects from '@/components/Projects';
import Blogs from '@/components/Blogs';

export default async function Home() {
  return (
    <>
      <section id='intro' className='mt-8'>
        <p>
          Hi there, I&apos;m <b>Leo</b>. 
          I&apos;m a 19 y/o Software Engineering student at <a target='_blank' href='https://www.port.ac.uk/'><b>UoP</b></a>.
          I&apos;ve have a love for <b>cooking</b> and <b>building things</b>.
          I enjoy <b>web development</b>, creating fun <b>APIs</b> with <b>Rust</b>, and everything else <b>code</b>. 
        </p>
      </section>
      <Projects />
      <Blogs />
    </>
  );
}