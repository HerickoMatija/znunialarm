'use client'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { ErrorMessage, Field, Label } from '@/components/catalyst/fieldset'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/catalyst/listbox'
import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { getRandomMealFromTagServerAction } from '@/lib/random/ServerActions'
import { Tag } from '@/types'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MealsPerGroup } from './RandomMealComponent'

type RandomMealFormTagProps = {
  tags: Tag[]
  setMealsPerGroup: (mealsPerGroup: MealsPerGroup) => void
  setNoResultMessage: (noResultMessage: string) => void
}

export default function RandomMealFormTag({ tags, setMealsPerGroup, setNoResultMessage }: RandomMealFormTagProps) {
  const t = useTranslations('RandomPage')
  const [tagId, setTagId] = useState<string>('')
  const [validationError, setValidationError] = useState('')
  const [response, formAction, pending] = useActionState(getRandomMealFromTagServerAction, null)

  useEffect(() => {
    if (response?.result === ACTION_VALIDATION_ERROR) {
      setValidationError(t('Validation.tag'))
    } else if (response?.result === ACTION_OK) {
      if (response.data?.message === 'No meals found') {
        setNoResultMessage(t('noMealsFound'))
      } else {
        let mealsPerGroup = [
          {
            name: '',
            linkToGroup: '',
            meals: [
              {
                name: response.data?.meal?.name ?? '',
                linkToMeal: `/meals/${response.data?.meal?.id ?? ''}`,
              },
            ],
          },
        ]
        setMealsPerGroup({ mealGroups: mealsPerGroup })
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
            <Label>{t('tag')}</Label>
            <Listbox
              value={tagId}
              onChange={(value) => {
                setTagId(value)
              }}
              invalid={validationError !== ''}
            >
              {tags?.map((tag) => (
                <ListboxOption key={tag.id} value={tag.id}>
                  <ListboxLabel>{tag.name}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </Field>
          {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
          <input type="hidden" name="tagId" value={tagId} />
        </div>

        <div className="flex items-center justify-center">
          <Button type="submit" disabled={pending} color="teal">
            <span className="p-2">{pending ? t('buttonPending') : t('button')}</span>
          </Button>
        </div>
      </div>

      <Divider className="my-6 sm:my-10" />
    </form>
  )
}
