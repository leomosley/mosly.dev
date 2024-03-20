import React from 'react';
import Markdown from 'react-markdown';
import { getBlogByLocation } from '@/blogs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog • Leo Mosley'
}

async function getRaw(filename: string) {
  const res = await fetch(`https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/blogs/main/${filename}`);
  const raw = res.text();
  return raw;
}

export default async function Blog({ params } : { params: { name: string}}) {
  const blog = await getBlogByLocation(params.name);
  const content = await getRaw(params.name + ".md");

  return (
    <article className="prose prose-h1:text-3xl prose-invert mt-8">
      {content? (
        <Markdown>{content}</Markdown>
      ) : (
        <p>Content couldnt be loaded.</p>
      )}
    </article>
  );
}