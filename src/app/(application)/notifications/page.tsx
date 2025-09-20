import ListComponent from '@/components/yum-components/list/ListComponent'
import { getNotifications } from '@/lib/notifications/notification-DAL'
import { deleteNotificationServerAction } from '@/lib/notifications/ServerActions'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

const getMessages = cache(async () => {
  return await getTranslations('NotificationsListPage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function Notifications() {
  let t = await getMessages()
  let notifications = await getNotifications()

  return (
    <ListComponent
      items={notifications}
      title={t('title')}
      deleteFunction={deleteNotificationServerAction}
      listType="Notifications"
    />
  )
}
