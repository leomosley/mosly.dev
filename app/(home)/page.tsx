import { Projects } from "@/components/projects";
import { Blogs } from "@/components/blogs";
import { Intro } from "@/components/intro";
import { Work } from "@/components/work";

export default async function Home() {
  return (
    <>
      <Intro />
      <Work />
      <Projects />
      <Blogs />
    </>
  );
}
