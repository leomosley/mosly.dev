import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { manrope } from "@/lib/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommandMenuProvider } from "@/components/command-menu-provider";
import { getBlogs } from "@/lib/blog";
import { env } from "@/lib/env";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_DOMAIN,
  metadataBase: new URL(`https://${env.NEXT_PUBLIC_DOMAIN}`),
  description: "Software Engineering Student portfolio",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: `https://${env.NEXT_PUBLIC_DOMAIN}`,
    title: env.NEXT_PUBLIC_DOMAIN,
    description: "Software Engineering Student portfolio",
    siteName: env.NEXT_PUBLIC_DOMAIN,
    images: [
      {
        url: `https://${env.NEXT_PUBLIC_DOMAIN}/api/og`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: env.NEXT_PUBLIC_DOMAIN,
    description: "Software Engineering Student portfolio",
    creator: "@leomosly",
    images: [
      {
        url: `https://${env.NEXT_PUBLIC_DOMAIN}/api/og`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogs = await getBlogs();

  return (
    <html lang="en">
      <body className={manrope.variable}>
        <CommandMenuProvider blogs={blogs} />
        <main className="mx-auto flex md:max-w-2xl min-h-screen flex-col p-4 md:p-6 pb-8">
          <Header />
          {children}
          <Analytics />
          <Toaster position="bottom-right" theme="dark" />
          <Footer />
        </main>
      </body>
    </html>
  );
}
