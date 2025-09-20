import NotificationForm from '@/lib/notifications/NotificationForm'
import { getTags } from '@/lib/tags/tag-DAL'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NotificationsCreatePage')

  return {
    title: t('title'),
  }
}

export default async function CreateNotification() {
  const tags = await getTags()

  return <NotificationForm editable={true} selectableTags={tags} />
}
