import ListComponent from '@/components/yum-components/list/ListComponent'
import { deleteTagServerAction } from '@/lib/tags/ServerActions'
import { getTags } from '@/lib/tags/tag-DAL'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

const getMessages = cache(async () => {
  return await getTranslations('TagsListPage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function Tags() {
  let t = await getMessages()
  let tags = await getTags()

  return <ListComponent items={tags} title={t('title')} deleteFunction={deleteTagServerAction} listType="Tags" />
}
