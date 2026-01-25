import Markdown from "react-markdown";
import { getBlog, getBlogs } from "@/lib/blog";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.data.filename.slice(0, -3),
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;

  const blog = await getBlog(params.slug + ".md");

  return {
    title: `${env.NEXT_PUBLIC_DOMAIN} | blog`,
    metadataBase: new URL(
      `https://${env.NEXT_PUBLIC_DOMAIN}/blog/${params.slug}`,
    ),
    description: blog ? blog.data.description : "Not found.",
    icons: {
      icon: "/icon.png",
    },
    openGraph: {
      type: "website",
      url: `https://${env.NEXT_PUBLIC_DOMAIN}/blog/${params.slug}`,
      title: blog ? blog.data.title : "404",
      description: blog ? blog.data.description : "Not found.",
      siteName: env.NEXT_PUBLIC_DOMAIN,
      images: [
        {
          url: `https://${env.NEXT_PUBLIC_DOMAIN}/api/og/blog/${params.slug}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog ? blog.data.title : "404",
      description: blog ? blog.data.description : "Not found.",
      creator: "@leomosly",
      images: [
        {
          url: `https://${env.NEXT_PUBLIC_DOMAIN}/api/og/blog/${params.slug}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Blog(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const blog = await getBlog(params.slug + ".md");

  if (!blog) notFound();

  return (
    <>
      <article className="prose text-justify prose-invert prose-h1:text-3xl">
        <Markdown>{blog.content}</Markdown>
      </article>
    </>
  );
}
