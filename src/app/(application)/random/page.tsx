import { getNotifications } from '@/lib/notifications/notification-DAL'
import { getTags } from '@/lib/tags/tag-DAL'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import RandomMealComponent from './RandomMealComponent'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('RandomPage')

  return {
    title: t('title'),
  }
}

export default async function RandomPage() {
  let tags = await getTags()
  let notifications = await getNotifications()

  return (
    <div className="mx-auto">
      <RandomMealComponent notifications={notifications} tags={tags} />
    </div>
  )
}
