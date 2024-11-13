import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `portfolio • ${process.env.GITHUB_USERNAME}`,
  metadataBase: new URL('https://mosly.dev'),
  description: 'Software Engineering Student portfolio',
  icons: {
    icon: '/icon.png'
  },
  openGraph: {
    type: 'website',
    url: 'https://mosly.dev',
    title: `portfolio • ${process.env.GITHUB_USERNAME}`,
    description: 'Software Engineering Student portfolio',
    siteName: 'mosly.dev',
    images: [{
      url: 'https://mosly.dev/api/og',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'mosly.dev',
    description: 'Software Engineering Student portfolio',
    creator: '@leomosly',
    images: [
      {
        url: 'https://mosly.dev/api/og',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex flex-col p-6 mx-auto max-w-2xl'>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </main>
      </body>

    </html>
  );
}
