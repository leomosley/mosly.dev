import React from 'react';
import Markdown from 'react-markdown';
import { getBlog } from '@/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog • Leo Mosley'
}

export default async function Blog({ params } : { params: { path: string}}) {
  const blog = getBlog(params.path);

  return (
    <article className="prose prose-h1:text-3xl prose-invert mt-8">
      {blog? (
        <Markdown>{blog.content}</Markdown>
      ) : (
        <p>Content couldnt be loaded.</p>
      )}
    </article>
  );
}
