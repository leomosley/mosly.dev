import fs from "fs";
import path from "path";
import EasterEggClient from "./client";
import { cacheLife } from "next/cache";

async function getFrames(): Promise<string[][]> {
  const dir = path.join(
    process.cwd(),
    "app",
    "(easter-egg)",
    "asdjgbsdgljhkajshdg",
    "_frames.json",
  );
  const data = await fs.promises.readFile(dir, "utf-8");
  const rawFrames: string[][] = JSON.parse(data);

  const trimmedFrames = rawFrames.map((frame) => {
    const firstNonEmptyIndex = frame.findIndex(
      (line) => line.trim().length > 0,
    );
    return firstNonEmptyIndex >= 0 ? frame.slice(firstNonEmptyIndex) : frame;
  });

  const maxHeight = Math.max(...trimmedFrames.map((frame) => frame.length));

  const normalizedFrames = trimmedFrames.map((frame) => {
    const paddingNeeded = maxHeight - frame.length;
    if (paddingNeeded > 0) {
      return [...Array(paddingNeeded).fill(""), ...frame];
    }
    return frame;
  });

  return normalizedFrames;
}

export default async function EasterEgg() {
  "use cache";
  cacheLife("max");
  const frames = await getFrames();

  return <EasterEggClient frames={frames} />;
}
