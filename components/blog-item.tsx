import Link from "next/link";
import { SerializableBlog } from "@/lib/blog";

interface Props {
  blog: SerializableBlog;
  description?: boolean;
  date?: boolean;
}

export function BlogItem({ blog, description = false, date = true }: Props) {
  return (
    <div className="flex">
      <div className="flex flex-col space-y-1">
        <Link
          className="link"
          href={`/blog/${blog.data.filename.slice(0, -3)}`}
          prefetch={true}
        >
          {blog.data.title}
        </Link>
        {description && (
          <p className="text-neutral-300">{blog.data.description}</p>
        )}
      </div>
      {date && <p className="ml-auto min-w-fit">{blog.data.date}</p>}
    </div>
  );
}
