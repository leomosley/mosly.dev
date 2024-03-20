import React from 'react';
import { blogs } from '@/blogs';
import BlogItem from '@/components/BlogItem';
import BackButton from '@/components/BackButton';

export default function BlogHome() {
  return (
    <main className="flex flex-col justify-center p-6 mx-auto max-w-2xl">
      <header className="flex flex-col space-y-4">
        <div className="flex">
          <BackButton />
          <p className="ml-auto">leomosley</p>
        </div>
        <h1 className="text-4xl font-bold">Blogs</h1>
        <p></p>
      </header>
      <section className="flex flex-col space-y-4">
        {blogs.map((blog, index) => (
          <BlogItem key={index} blog={blog} description={true} /> 
        ))}
      </section>
    </main>
  )
}
