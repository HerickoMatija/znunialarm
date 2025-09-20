import MealForm from '@/lib/meal/MealForm'
import { getTags } from '@/lib/tags/tag-DAL'
import { Tag } from '@/types'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('MealsCreatePage')

  return {
    title: t('title'),
  }
}

export default async function CreateMeal() {
  let tags: Tag[] = await getTags()

  return <MealForm editable={true} tags={tags} />
}
