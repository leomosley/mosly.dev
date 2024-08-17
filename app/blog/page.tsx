import React from 'react';
import { BlogItem } from '@/components/blog-item';
import { Metadata } from 'next';
import { getBlogs } from '@/lib/utils';

export const metadata: Metadata = {
  title: `blog • ${process.env.GITHUB_USERNAME}`,
  metadataBase: new URL('https://mosly.dev/blog'),
  description: 'Software Engineering Students blog',
  icons: {
    icon: '/icon.png'
  },
  openGraph: {
    type: 'website',
    url: 'https://mosly.dev/blog',
    title: `blog • ${process.env.GITHUB_USERNAME}`,
    description: 'Software Engineering Students blog',
    siteName: 'mosly.dev',
    images: [{
      url: 'https://mosly.dev/api/og/blog',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "mosly.dev",
    description: "A blog page.",
    creator: "@leomosly",
    images: [
      {
        url: "https://mosly.dev/api/og/blog",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function BlogHome() {
  const blogs = getBlogs();
  return (
    <section className='flex flex-col space-y-5 mt-8'>
      <h1 className='text-4xl font-bold'>Blog</h1>
      {blogs.map((blog, index) => (
        <BlogItem
          key={index}
          blog={blog}
          description={true}
          date={false}
        />
      ))}
    </section>
  )
}
