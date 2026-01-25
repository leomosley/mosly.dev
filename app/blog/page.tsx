import React from "react";
import { BlogItem } from "@/components/blog-item";
import { Metadata } from "next";
import { getBlogs } from "@/lib/blog";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `${env.DOMAIN} | blog`,
  metadataBase: new URL(`https://${env.DOMAIN}/blog`),
  description: "Software Engineering Students blog",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: `https://${env.DOMAIN}/blog`,
    title: `blog • ${env.GITHUB_USERNAME}`,
    description: "Software Engineering Students blog",
    siteName: "{env.DOMAIN}",
    images: [
      {
        url: `https://${env.DOMAIN}/api/og/blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: env.DOMAIN,
    description: "A blog page.",
    creator: "@leomosly",
    images: [
      {
        url: `https://${env.DOMAIN}/api/og/blog`,
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
