import PasswordForm from '@/lib/settings/PasswordForm'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('SettingsPage')

  return {
    title: t('updatePassword'),
  }
}

export default async function UpdatePassword() {
  return <PasswordForm />
}
