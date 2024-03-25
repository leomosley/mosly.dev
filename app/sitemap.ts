import { getBlogs } from "@/blog";

export default async function Sitemap() {
  const url = "https://leomosley.com";
  const blogPath = "/blog/";
  
  const blogMap = getBlogs().map((blog) => ({
    url: blogPath + blog.data.filename.slice(0, -3),
    lastModified: blog.data.date
  }));

  return [
    {
      url: url,
      lastModified: new Date(),
    },
    ...blogMap
  ];
}