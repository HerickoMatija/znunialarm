import '@/tailwind.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import type React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | Znunialarm',
    default: 'Znunialarm',
  },
  description: 'Znunialarm is a mobile app to help parents plan morning snacks for their kids',
}

const jsonLd = {
  '@context': 'https://schema.org/',
  '@type': 'Organization',
  name: 'Znunialarm',
  url: 'https://www.znunialarm.com/',
  description: 'Znunialarm is a mobile app to help parents plan morning snacks for their kids',
  email: 'support@znunialarm.com',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className="text-black antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
      </body>
      {process.env.NODE_ENV == 'production' ? <GoogleAnalytics gaId="G-LV2YJ6HQ0E" /> : <></>}
    </html>
  )
}
