import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DOMAIN: z.string(),
    GITHUB_USERNAME: z.string(),
    REPO_TAG: z.string(),
    VERCEL_URL: z.string().optional(),
  },
  runtimeEnv: {
    DOMAIN: process.env.DOMAIN,
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    REPO_TAG: process.env.REPO_TAG,
    VERCEL_URL: process.env.VERCEL_URL,
  },
});
