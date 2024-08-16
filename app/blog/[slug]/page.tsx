import React from 'react';
import Markdown from 'react-markdown';
import getBlog from '@/utils/getBlog';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const blog = getBlog(params.slug + '.md');

  return {
    title: `blog • ${process.env.GITHUB_USERNAME}`,
    metadataBase: new URL(`https://mosly.dev/blog/${params.slug}`),
    description: blog ? blog.data.description : "Not found.",
    icons: {
      icon: '/icon.png'
    },
    openGraph: {
      type: 'website',
      url: `https://mosly.dev/blog/${params.slug}`,
      title: blog ? blog.data.title : "404",
      description: blog ? blog.data.description : "Not found.",
      siteName: 'mosly.dev',
      images: [{
        url: `https://mosly.dev/api/og/blog/${params.slug}`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog ? blog.data.title : "404",
      description: blog ? blog.data.description : "Not found.",
      creator: "@leomosly",
      images: [
        {
          url: `https://mosly.dev/api/og/blog/${params.slug}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export const metadata: Metadata = {
  title: `portfolio • ${process.env.GITHUB_USERNAME}`,
  metadataBase: new URL('https://mosly.dev'),
  description: 'Software Engineering Student portfolio',
  icons: {
    icon: '/icon.png'
  },
  openGraph: {
    type: 'website',
    url: 'https://mosly.dev',
    title: `portfolio • ${process.env.GITHUB_USERNAME}`,
    description: 'Software Engineering Student portfolio',
    siteName: 'mosly.dev',
    images: [{
      url: 'https://mosly.dev/api/og',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "mosly.dev",
    description: "Portfolio site",
    creator: "@leomosly",
    images: [
      {
        url: "https://mosly.dev/api/og",
        width: 1200,
        height: 630,
      },
    ],
  },
}


export default async function Blog({ params }: { params: { slug: string } }) {
  const blog = getBlog(params.slug + '.md');
  return (
    <article className='prose prose-h1:text-3xl prose-invert mt-8'>
      {blog ? (
        <Markdown>{blog.content}</Markdown>
      ) : (
        <p>Content couldnt be loaded.</p>
      )}
    </article>
  );
}
