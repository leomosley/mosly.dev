import getBlogs from '@/utils/getBlogs';

export default function Sitemap() {
  const blogs = getBlogs();
  const url = process.env.VERCEL_BRANCH_URL
    ? process.env.PROD_URL
    : 'http://localhost:3000'
  ;

  const blogMap = blogs.map((blog) => ({
    url: '/blog/' + blog.data.filename.slice(0, -3),
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