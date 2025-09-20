import TagForm from '@/lib/tags/TagForm'
import { getTag } from '@/lib/tags/tag-DAL'
import { Tag } from '@/types'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { cache } from 'react'

const getItem = cache(async (id: string) => {
  return await getTag(id)
})

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const t = await getTranslations('General')
  const { id } = await params
  let tag: Tag = await getItem(id)

  return {
    title: `${t('tag')} ${tag?.name}`,
  }
}

export default async function TagPAge({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; edit?: boolean }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const { edit } = await searchParams
  const isEditable = edit !== undefined
  let tag: Tag = await getItem(id)

  if (!tag) {
    notFound()
  }

  return <TagForm tag={tag} editable={isEditable} />
}
