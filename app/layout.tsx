import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { manrope } from "@/lib/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: env.DOMAIN,
  metadataBase: new URL(`https://${env.DOMAIN}`),
  description: "Software Engineering Student portfolio",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: `https://${env.DOMAIN}`,
    title: env.DOMAIN,
    description: "Software Engineering Student portfolio",
    siteName: env.DOMAIN,
    images: [
      {
        url: `https://${env.DOMAIN}/api/og`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: env.DOMAIN,
    description: "Software Engineering Student portfolio",
    creator: "@leomosly",
    images: [
      {
        url: `https://${env.DOMAIN}/api/og`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <main className="mx-auto flex md:max-w-2xl min-h-screen flex-col p-4 md:p-6 pb-8">
          <Header />
          {children}
          <Analytics />
          <Footer />
        </main>
      </body>
    </html>
  );
}
