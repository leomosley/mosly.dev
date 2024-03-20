import React from 'react';
import Markdown from 'react-markdown';
import { getBlogByLocation, getBlogContent } from '@/blogs';

export default function Blog({ params } : { params: { name: string}}) {
  const blog = getBlogByLocation(params.name);
  const content = blog && getBlogContent(blog?.filename);
  return (
    <main className="prose prose-invert mx-auto p-8 md:max-w-2xl">
      <article className="prose prose-invert">
        {blog? (
          <Markdown>{content}</Markdown>
        ) : (
          <p>Content couldn't be loaded</p>
        )}
      </article>
    </main>

  )
}
