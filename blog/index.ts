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

export function getFiles() {
  try {
    const files = fs.readdirSync('./blog');
    const index = files.findIndex((x) => x === 'index.ts');
    files.splice(index, 1);
    return files;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function getBlogs() {
  const files = getFiles();
  const blogs = files.map((file) => matter.read(`./blog/${file}`) as Blog);
  return blogs;
};