import { env } from "@/lib/env";
import { getBlogs } from "@/lib/blog";
import RSS from "rss";

export async function GET() {
  const blogs = await getBlogs();
  const url = env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + env.NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";
  const feed = new RSS({
    title: "",
    description: "",
    site_url: "",
    feed_url: "",
    copyright: "",
    language: "",
    pubDate: "",
  });

  blogs.map((blog) => {
    feed.item({
      title: blog.data.title,
      url: `${url}${blog.data.filename.slice(0, -3)}`,
      date: blog.data.date,
      description: blog.data.description,
      author: env.NEXT_PUBLIC_GITHUB_USERNAME,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
