import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Blog } from '@/blogs';

interface Props {
  blog: Blog;
  description?: boolean;
}

export default function BlogItem({ 
  blog,
  description 
} : Props) {
  return (
    <div className="flex">
      <div className="flex flex-col space-y-1">
        <Link
          className={clsx(
            "underline-offset-4 underline decoration-neutral-500",
            "transition hover:decoration-inherit"
          )}
          href={`/blog/${blog.location}`}  
        >{blog.name}
        </Link>
        {description && <p className="text-neutral-300">{blog.description}</p>}
      </div>
      <p className="ml-auto">{blog.date}</p>
    </div>
  );
}
