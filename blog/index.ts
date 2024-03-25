import matter from "gray-matter";
import * as fs from 'fs';
import path from "path";

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

export function getBlog(path: string) {
  try {
    const blog = blogs.find(blog => blog.data.filename.slice(0, -3) === path);
    return blog;  
  } catch (error) {
    console.log(error);
  }
}

export function getFiles() {
  try {
    console.log(process.cwd())
    const files = fs.readdirSync(path.resolve(process.cwd(), 'blog'));
    console.log(files);
    const index = files.findIndex((x) => x === 'index.ts');
    files.splice(index, 1);
    return files;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const files = getFiles();
export const blogs = files.map((file) => matter.read(`./blog/${file}`) as Blog);