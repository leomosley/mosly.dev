import { env } from "@/lib/env";
import { getBlogs } from "@/lib/blog";

export default async function Sitemap() {
  const blogs = await getBlogs();
  const url = env.NEXT_PUBLIC_VERCEL_URL
    ? "https://" + env.NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";
  const blogMap = blogs.map((blog) => ({
    url: "/blog/" + blog.data.filename.slice(0, -3),
    lastModified: blog.data.date,
  }));

  return [
    {
      url: url,
      lastModified: new Date(),
    },
    ...blogMap,
  ];
}
