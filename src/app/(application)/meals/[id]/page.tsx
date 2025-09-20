import { getMeal } from '@/lib/meal/meal-DAL'
import MealForm from '@/lib/meal/MealForm'
import { getTags } from '@/lib/tags/tag-DAL'
import { Meal, Tag } from '@/types'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { cache } from 'react'

const getItem = cache(async (id: string) => {
  return await getMeal(id)
})

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const t = await getTranslations('General')
  const { id } = await params
  let meal: Meal = await getItem(id)

  return {
    title: `${t('meal')} ${meal?.name}`,
  }
}

export default async function MealPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; edit?: boolean }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params
  const { edit } = await searchParams
  const isEditable = edit !== undefined
  let meal: Meal = await getMeal(id)
  let tags: Tag[] = await getTags()

  if (!meal) {
    notFound()
  }

  return <MealForm meal={meal} editable={isEditable} tags={tags} />
}
