import React from 'react';
import Markdown from 'react-markdown';
import { getBlogByLocation } from '@/blogs';

async function getRaw(filename: string) {
  const res = await fetch(`https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/blogs/main/${filename}`);
  const raw = res.text();
  return raw;
}

export default async function Blog({ params } : { params: { name: string}}) {
  const blog = await getBlogByLocation(params.name);
  const content = await getRaw(params.name + ".md");

  return (
    <main className="prose prose-invert mx-auto p-8 md:max-w-2xl">
      <article className="prose prose-invert">
        {content? (
          <Markdown>{content}</Markdown>
        ) : (
          <p>Content couldnt be loaded.</p>
        )}
      </article>
    </main>
  );
}
