import EmailForm from '@/lib/settings/EmailForm'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('SettingsPage')

  return {
    title: t('updateEmail'),
  }
}

export default async function UpdateEmail() {
  return <EmailForm editable={true} />
}
