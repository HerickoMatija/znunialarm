'use client'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Field, Label } from '@/components/catalyst/fieldset'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/catalyst/listbox'
import { ACTION_ERROR, ACTION_OK } from '@/lib/Constants'
import { getRandomMealFromNotificationServerAction } from '@/lib/random/ServerActions'
import { Meal, Notification, Tag } from '@/types'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type MealsByTag = {
  meals: Meal[]
  tag: Tag
}

export default function RandomMealFormNotificaiton({ notifications }: { notifications: Notification[] }) {
  const t = useTranslations('RandomPage')
  const [notificationId, setNotificationId] = useState<string>('')
  const [mealsByTags, setMealsByTags] = useState<MealsByTag[]>([])
  const [noMealsFound, setNoMealsFound] = useState(false)
  const [response, formAction, pending] = useActionState(getRandomMealFromNotificationServerAction, null)

  useEffect(() => {
    if (response?.result === ACTION_OK) {
      if (response.data?.message === 'No meals found') {
        setMealsByTags([])
        setNoMealsFound(true)
      } else {
        // TODO fix this?
        //setMealsByTags(response.data?.meal?.name ?? '')
        setNoMealsFound(false)
      }
    } else if (response?.result === ACTION_ERROR) {
      toast.error(t('error'))
    }
  }, [response])

  return (
    <form className="mx-auto" action={formAction}>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
        <div className="space-y-1 sm:col-span-2">
          <Field>
            <Label>{t('notification')}</Label>
            <Listbox
              value={notificationId}
              onChange={(value) => {
                setNotificationId(value)
              }}
            >
              {notifications?.map((notification) => (
                <ListboxOption key={notification.id} value={notification.id}>
                  <ListboxLabel>{notification.name}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </Field>
          <input type="hidden" name="notificationId" value={notificationId} />
        </div>

        <div className="flex items-center justify-center py-4">
          <Button type="submit" disabled={pending}>
            <span className="p-2 md:p-4 md:text-xl">{pending ? t('buttonPending') : t('button')}</span>
          </Button>
        </div>
      </div>

      <Divider className="my-6 sm:my-10" />

      {!noMealsFound && (
        <div className="flex min-h-[250px] items-center justify-center space-y-3 text-center text-zinc-500 dark:text-zinc-400">
          <p className="rounded-lg border-2 border-teal-500 p-8 shadow-lg">t('noMealsFound')</p>
        </div>
      )}

      {mealsByTags && (
        // TODO adjust this to map over the whole array
        <div className="flex min-h-[250px] items-center justify-center space-y-3 text-center text-zinc-500 dark:text-zinc-400">
          <p className="rounded-lg border-2 border-teal-500 p-8 shadow-lg">something</p>
        </div>
      )}
    </form>
  )
}
