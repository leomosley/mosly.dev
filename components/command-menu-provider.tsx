"use client";

import { CommandMenu } from "@/components/command-menu";
import { SerializableBlog } from "@/lib/blog";

interface CommandMenuProviderProps {
  blogs: SerializableBlog[];
}

export function CommandMenuProvider({ blogs }: CommandMenuProviderProps) {
  return <CommandMenu blogs={blogs} />;
}
