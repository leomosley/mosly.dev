import fs from "fs";
import matter from "gray-matter";
import { cacheTag } from "next/cache";

export type SerializableBlog = {
  data: {
    title: string;
    filename: string;
    date: string;
    description: string;
  };
  content: string;
};

export async function getBlogs(): Promise<SerializableBlog[]> {
  "use cache";
  cacheTag("blogs");
  try {
    const files = fs.readdirSync(process.cwd() + "/blog");
    const markdownPosts = files.filter((file) => file.endsWith(".md"));

    const blogs = markdownPosts.map((filename) => {
      const fileContents = fs.readFileSync(`blog/${filename}`, "utf8");
      const parsed = matter(fileContents);
      return {
        data: parsed.data as SerializableBlog["data"],
        content: parsed.content,
      };
    });
    return blogs;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBlog(
  filename: string,
): Promise<SerializableBlog | undefined> {
  "use cache";
  cacheTag(`blog-${filename}`);
  try {
    const blogs = await getBlogs();
    const content = blogs.find((blog) => blog.data.filename === filename);
    return content;
  } catch (error) {
    console.log(error);
  }
}
