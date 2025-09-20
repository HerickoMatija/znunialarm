import TagForm from '@/lib/tags/TagForm'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('TagsCreatePage')

  return {
    title: t('title'),
  }
}

export default async function CreateTag() {
  return <TagForm editable={true} />
}
