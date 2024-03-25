import React from 'react';
import Markdown from 'react-markdown';
import { getBlogs, Blog} from '@/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog • Leo Mosley'
}

export function getBlog(path: string, blogs: Blog[]) {
  try {
    const blog = blogs.find(blog => blog.data.filename.slice(0, -3) === path);
    return blog;  
  } catch (error) {
    console.log(error);
  }
}

export default async function BlogPage({ params } : { params: { path: string}}) {
  const blogs = getBlogs();
  const blog = getBlog(params.path, blogs);

  return (
    <article className="prose prose-h1:text-3xl prose-invert mt-8">
      {blog? (
        <Markdown>{blog.content}</Markdown>
      ) : (
        <p>ERROR: Content couldnt be loaded.</p>
      )}
    </article>
  );
}
