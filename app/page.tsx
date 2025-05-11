import { Projects } from '@/components/projects';
import { Blogs } from '@/components/blogs';
import React
  from 'react';

export default async function Home() {
  return (
    <>
      <section id='intro' className='mt-8'>
        <p>
          Hi there, I&apos;m <b>Leo</b>.
          I&apos;m a Software Engineering student {"@"} <a target='_blank' href='https://www.port.ac.uk/'><b>UoP</b></a>{" "}
          who&apos;s passionate about <b>coding</b> and <b>building cool things</b>.
          I enjoy <b>full-stack web development</b>, developing <b>CLI tools</b>, and everything else <b>code</b>.
        </p>
      </section>
      <Projects />
      <Blogs />
    </>
  );
}