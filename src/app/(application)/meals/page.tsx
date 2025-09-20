import ListComponent from '@/components/yum-components/list/ListComponent'
import { getMeals } from '@/lib/meal/meal-DAL'
import { deleteMealServerAction } from '@/lib/meal/ServerActions'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

const getMessages = cache(async () => {
  return await getTranslations('MealsListPage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function Meals() {
  let t = await getMessages()
  let meals = await getMeals()

  return <ListComponent items={meals} title={t('title')} deleteFunction={deleteMealServerAction} listType="Meals" />
}
