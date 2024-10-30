import Markdown from 'react-markdown';
import { getBlog } from '@/lib/utils';
import type { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;

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

export default async function Blog(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const blog = getBlog(params.slug + '.md');

  if (!blog) redirect('/404');

  return (
    <article className='prose prose-h1:text-3xl prose-invert mt-8'>
      <Markdown>{blog.content}</Markdown>
    </article>
  );
}