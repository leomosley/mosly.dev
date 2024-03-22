export interface Blog {
  name: string;
  filename: string;
  location: string;
  date: string;
  description: string;
}

export const blogs = [
  { name: "Hello World", filename: "hello-world.md", location: "hello-world", date: "Mar 22, 2024", description: "My blog debut! In this I breakdown how I made the website your using now."},
] as Blog[];

export function getBlogByLocation(location: string) {
  try {
    const blog = blogs.find(blog => blog.location === location);
    return blog;
  } catch (error) {
    console.log(error);
  }
}