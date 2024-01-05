import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex h-screen justify-center items-center p-4">
      <section className="flex flex-col w-[250px] xs:w-[350px] bg-foreground shadow p-5 rounded-2xl text-center justify-center">
        <Image 
          className="self-center rounded-full"
          src="https://avatars.githubusercontent.com/u/84247945"
          alt="avatar"
          width={80}
          height={80}
        />
        <h1 className="text-xl text-neutral-300 m-0">Leo Mosley</h1>
        <h2 className="text-lg text-neutral-500 mt-[-8px]">Student</h2>
        <p className="text-base text-neutral-400">First-year Sofware Engineering Student (BSc) at the University of Portsmouth</p>
        <div className="flex gap-2 w-full justify-evenly mt-5">
          <a 
            className="w-1/2 bg bg-neutral-700 p-1 text-lg rounded-lg border-2 border-solid border-neutral-700 text-neutral-400"
            href="https://www.github.com/leomosley" 
            target="_blank"
          >Github
          </a>
          <button
            className="w-1/2 bg bg-foreground p-1 text-lg rounded-lg border-2 border-solid border-neutral-700 text-neutral-400"
          >Contact</button>
        </div>
      </section>
    </main>
  )
}
