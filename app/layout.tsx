import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Leo Mosley | Portfolio',
  description: 'Software Engineering Students Web Development Porfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-full">{children}</body>
    </html>
  )
}
