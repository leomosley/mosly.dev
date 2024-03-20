import React from 'react';
import Markdown from 'react-markdown';
import { getBlogByLocation } from '@/blogs';
import Header from '@/components/Header';

async function getRaw(filename: string) {
  const res = await fetch(`https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/blogs/main/${filename}`);
  const raw = res.text();
  return raw;
}

export default async function Blog({ params } : { params: { name: string}}) {
  const blog = await getBlogByLocation(params.name);
  const content = await getRaw(params.name + ".md");

  return (
    <article className="prose prose-sm prose-invert mt-8">
      {content? (
        <Markdown>{content}</Markdown>
      ) : (
        <p>Content couldnt be loaded.</p>
      )}
    </article>
  );
}
