import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_DOMAIN: z.string(),
    NEXT_PUBLIC_GITHUB_USERNAME: z.string(),
    NEXT_PUBLIC_REPO_TAG: z.string(),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_FULL_NAME: z.string(),
    NEXT_PUBLIC_FIRST_NAME: z.string(),
    NEXT_PUBLIC_LINKEDIN_USERNAME: z.string(),
    NEXT_PUBLIC_TWITTER_HANDLE: z.string(),
    NEXT_PUBLIC_SITE_DESCRIPTION: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_REPO_TAG: process.env.NEXT_PUBLIC_REPO_TAG,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_FULL_NAME: process.env.NEXT_PUBLIC_FULL_NAME,
    NEXT_PUBLIC_FIRST_NAME: process.env.NEXT_PUBLIC_FIRST_NAME,
    NEXT_PUBLIC_LINKEDIN_USERNAME: process.env.NEXT_PUBLIC_LINKEDIN_USERNAME,
    NEXT_PUBLIC_TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  },
});
