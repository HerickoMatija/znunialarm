import ConfigureAmplifyClientSide from '@/components/yum-components/amplify/ConfigureAmplifyClientSide'
import AuthenticationProviderWrapper from '@/components/yum-components/auth/AuthenticationProviderWrapper'
import UserDataWrapper from '@/components/yum-components/auth/UserDataWrapper'
import '@/tailwind.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import type React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | YumAlarm',
    default: 'YumAlarm',
  },
  description: 'YumAlarm is a website to help you keep track of and select your next meal',
}

const jsonLd = {
  '@context': 'https://schema.org/',
  '@type': 'Organization',
  name: 'YumAlarm',
  url: 'https://www.yumalarm.com/',
  description: 'YumAlarm is a SaaS product that helps people keep track of their meals and decide what to eat next.',
  email: 'support@yumalarm.com',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className="text-black antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ConfigureAmplifyClientSide />
        <NextIntlClientProvider messages={messages}>
          <AuthenticationProviderWrapper>
            <UserDataWrapper>{children}</UserDataWrapper>
          </AuthenticationProviderWrapper>
        </NextIntlClientProvider>
      </body>
      {process.env.NODE_ENV == 'production' ? <GoogleAnalytics gaId="G-LV2YJ6HQ0E" /> : <></>}
    </html>
  )
}
