import Link from "next/link";

import { BlogItem } from "./blog-item";
import { getBlogs } from "@/lib/blog";

export function AllPostsLink() {
  return (
    <Link className="link" href="/blog" prefetch={true}>
      All posts →
    </Link>
  );
}

export async function Blogs() {
  const blogs = await getBlogs();
  return (
    <section id="blog" className="w-full space-y-5">
      <h2 className="mb-5 mt-8 text-xl font-bold">Blog</h2>
      <div className="flex flex-col space-y-4">
        {blogs?.slice(0, 4).map((blog, index) => (
          <BlogItem key={index} blog={blog} />
        ))}
        <div className="flex">
          <AllPostsLink />
        </div>
      </div>
    </section>
  );
}
