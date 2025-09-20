import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Input } from '@/components/catalyst/input'
import { Link } from '@/components/catalyst/link'
import { Heading, Subheading, TextSecondary } from '@/components/catalyst/text'
import EmailForm from '@/lib/settings/EmailForm'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

const getMessages = cache(async () => {
  return await getTranslations('SettingsPage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function Settings() {
  const t = await getMessages()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex justify-center">
        <Heading>{t('title')}</Heading>
      </div>

      <Divider className="my-6 sm:my-10" />

      <EmailForm editable={false} />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t('password')}</Subheading>
          <TextSecondary>{t('passwordInfo')}</TextSecondary>
        </div>
        <div className="space-y-1">
          <Input aria-label="Password" name="password" value="********" disabled />
        </div>
      </section>

      <Divider className="my-6 sm:my-10" soft />

      <div className="flex justify-end gap-4">
        <Link href="/settings/update-email">
          <Button>{t('updateEmail')}</Button>
        </Link>
        <Link href="/settings/update-password">
          <Button>{t('updatePassword')}</Button>
        </Link>
      </div>
    </div>
  )
}
