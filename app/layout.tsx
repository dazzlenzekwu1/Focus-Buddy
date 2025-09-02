import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Focus Buddy - ADHD-Friendly Focus Timer',
  description: 'A focus timer app designed specifically for ADHD needs with rewards and visual progress tracking.',
  keywords: ['focus', 'timer', 'productivity', 'ADHD', 'pomodoro'],
  authors: [{ name: 'Focus Buddy Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manjari:wght@400;700&display=swap" rel="stylesheet" />
        <style>
          {`
            @font-face {
              font-family: 'Summer Sun';
              src: url('/assets/SummerSun.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
            }
          `}
        </style>
      </head>
      <body className={`${inter.className} bg-adhd-cream min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
