import getBlogs from "@/utils/getBlogs";

export default function Sitemap() {
  const blogs = getBlogs();
  const url = "https://leomosley.com";
  const blogPath = "/blog/";
  
  const blogMap = blogs.map((blog) => ({
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