import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Portfolio • ${process.env.GITHUB_USERNAME}`,
  description: 'Software Engineering Student portfolio',
  icons: {
    icon: '/icon.png'
  },
  openGraph: {
    type: 'website',
    url: 'https://leomosley.com',
    title: 'Portfolio leomosley',
    description: 'Software Engineering Student portfolio',
    siteName: 'Portfolio leomosley',
    images: [{
      url: 'https://leomosley.com/preview.png',
    }],
  }
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
          <Footer />
        </main>
      </body>
      
    </html>
  );
}
