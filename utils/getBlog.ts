import getBlogs from './getBlogs';

export default function getBlog(filename: string) {
  console.log(filename);
  const blogs = getBlogs();
  const content = blogs.find(blog => blog.data.filename === filename);
  return content;
}