import React from "react";
import { BlogItem } from "@/components/blog-item";
import { Metadata } from "next";
import { getBlogs } from "@/lib/blog";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `${env.NEXT_PUBLIC_DOMAIN} | blog`,
  metadataBase: new URL(`https://${env.NEXT_PUBLIC_DOMAIN}/blog`),
  description: `${env.NEXT_PUBLIC_JOB_TITLE} blog`,
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: `https://${env.NEXT_PUBLIC_DOMAIN}/blog`,
    title: `blog • ${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    description: `${env.NEXT_PUBLIC_JOB_TITLE} blog`,
    siteName: env.NEXT_PUBLIC_DOMAIN,
    images: [
      {
        url: `https://${env.NEXT_PUBLIC_DOMAIN}/api/og/blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: env.NEXT_PUBLIC_DOMAIN,
    description: "A blog page.",
    creator: `@${env.NEXT_PUBLIC_TWITTER_HANDLE}`,
    images: [
      {
        url: `https://${env.NEXT_PUBLIC_DOMAIN}/api/og/blog`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function BlogHome() {
  const blogs = await getBlogs();
  return (
    <section className="flex flex-col space-y-5">
      <h1 className="text-4xl font-bold">Blog</h1>
      {blogs.map((blog, index) => (
        <BlogItem key={index} blog={blog} description={true} date={false} />
      ))}
    </section>
  );
}
