import matter from "gray-matter";

export interface Data {
  title: string;
  filename: string;
  date: string;
  description: string;
}

export interface Blog {
  data: Data;
  content: string;
  excrept?: string;
  orig: Buffer;
  language: string;
  matter: string;
  stringify(lang: string): string;
}

export const blogs = [matter.read('./blog/hello-world.md') as Blog];

export function getBlog(path: string) {
  try {
    const blog = blogs.find(blog => blog.data.filename.slice(0, -3) === path);
    return blog;  
  } catch (error) {
    console.log(error);
  }
}