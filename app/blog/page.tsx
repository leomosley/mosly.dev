import React from 'react';
import { getBlogs } from '@/blog';
import BlogItem from '@/components/BlogItem';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog • Leo Mosley'
}

export default function BlogHome() {
  const blogs = getBlogs();
  return (
    <section className="flex flex-col space-y-5 mt-8">
      <h1 className="text-4xl font-bold">Blog</h1>
      {blogs.map((blog, index) => (
        <BlogItem key={index} blog={blog} description={true} /> 
      ))}
    </section>
  )
}
