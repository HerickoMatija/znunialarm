import { getNotification } from '@/lib/notifications/notification-DAL'
import NotificationForm from '@/lib/notifications/NotificationForm'
import { getTags } from '@/lib/tags/tag-DAL'
import { Notification } from '@/types'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { cache } from 'react'

const getItem = cache(async (id: string) => {
  return await getNotification(id)
})

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const t = await getTranslations('General')
  const { id } = await params
  let notification: Notification = await getItem(id)

  return {
    title: `${t('notification')} ${notification?.name}`,
  }
}

export default async function NotificationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; edit?: boolean }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const { edit } = await searchParams
  const isEditable = edit !== undefined
  let notification: Notification = await getItem(id)
  const tags = await getTags()

  if (!notification) {
    notFound()
  }

  return <NotificationForm notification={notification} editable={isEditable} selectableTags={tags} />
}
