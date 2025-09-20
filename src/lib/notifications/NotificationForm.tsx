'use client'

import { Button } from '@/components/catalyst/button'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox'
import { Divider } from '@/components/catalyst/divider'
import { ErrorMessage, Field, Label } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Link } from '@/components/catalyst/link'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/catalyst/listbox'
import { Heading, Subheading, TextSecondary } from '@/components/catalyst/text'
import { ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { Notification, Tag } from '@/types'
import { ChevronLeftIcon, MinusIcon, PlusIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addNotificationServerAction, updateNotificationServerAction } from './ServerActions'

interface NotificationFormProps {
  notification?: Notification
  editable?: boolean
  selectableTags?: Tag[]
}

type NotificationFormData = {
  id: string
  name: string
  mealNumber: number
  tags: {
    tagId: string
    tagName: string
    number: number
  }[]
  sendMonday: boolean
  sendTuesday: boolean
  sendWednesday: boolean
  sendThursday: boolean
  sendFriday: boolean
  sendSaturday: boolean
  sendSunday: boolean
}

interface ValidationErrors {
  id?: string
  name?: string
  sendOn?: string
  mealNumber?: string
  tagMealNumber?: string
  tags?: string
}

export default function NotificationForm({ notification, editable = true, selectableTags }: NotificationFormProps) {
  const t = useTranslations('NotificationPage')

  const [editMode, setEditMode] = useState(editable)
  const [formData, setFormData] = useState<NotificationFormData>({
    id: notification?.id || '',
    name: notification?.name || '',
    mealNumber: notification?.mealNumber || 1,
    tags: notification?.tags || [],
    sendMonday: notification?.sendMonday || false,
    sendTuesday: notification?.sendTuesday || false,
    sendWednesday: notification?.sendWednesday || false,
    sendThursday: notification?.sendThursday || false,
    sendFriday: notification?.sendFriday || false,
    sendSaturday: notification?.sendSaturday || false,
    sendSunday: notification?.sendSunday || false,
  })
  const [response, formAction, pending] = useActionState(
    notification ? updateNotificationServerAction : addNotificationServerAction,
    null
  )
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (notification) {
      setFormData({
        id: notification.id,
        name: notification.name,
        mealNumber: notification.mealNumber,
        tags: notification.tags,
        sendMonday: notification.sendMonday,
        sendTuesday: notification.sendTuesday,
        sendWednesday: notification.sendWednesday,
        sendThursday: notification.sendThursday,
        sendFriday: notification.sendFriday,
        sendSaturday: notification.sendSaturday,
        sendSunday: notification.sendSunday,
      })
    }
  }, [notification])

  useEffect(() => {
    if (response?.result === ACTION_VALIDATION_ERROR) {
      setValidationErrors(response.validationErrors || {})
    } else if (response?.result === ACTION_OK) {
      if (response?.data?.toastSuccessKey) {
        toast.success(t(response?.data?.toastSuccessKey))
      }
      router.replace('/notifications')
    } else {
      if (response?.data?.toastErrorKey) {
        toast.error(t(response?.data?.toastErrorKey))
      }
    }
  }, [response])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const shouldShowNameError = () => {
    if (!validationErrors.name) {
      return false
    }
    return formData.name === ''
  }

  const shouldShowSendOnError = () => {
    if (!validationErrors.sendOn) {
      return false
    }
    return (
      !formData.sendMonday &&
      !formData.sendTuesday &&
      !formData.sendWednesday &&
      !formData.sendThursday &&
      !formData.sendFriday &&
      !formData.sendSaturday &&
      !formData.sendSunday
    )
  }

  const shouldShowMealNumberError = () => {
    if (!validationErrors.mealNumber) {
      return false
    }
    return formData.mealNumber < 1 || formData.mealNumber > 100
  }

  const shouldShowTagError = (tagId: string) => {
    if (!validationErrors.tags) {
      return false
    }
    return tagId === ''
  }

  const shouldShowTagMealNumberError = (tagNumber: number) => {
    if (!validationErrors.tagMealNumber) {
      return false
    }
    return tagNumber < 1 || tagNumber > 100
  }

  return (
    <form action={formAction} className="mx-auto">
      <div className="max-lg:hidden">
        <TextSecondary>
          <Link href="/notifications" className="inline-flex items-center gap-2">
            <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
            {t('notifications')}
          </Link>
        </TextSecondary>
      </div>
      <div className="flex justify-center">
        <Heading>{notification ? (editMode ? t('editTitle') : t('viewTitle')) : t('createTitle')}</Heading>
      </div>
      <Divider className="my-6 sm:my-10" />

      <input type="hidden" name="id" value={formData.id} required />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
        <div className="space-y-1">
          <Subheading>{t('name')}</Subheading>
          <TextSecondary>{t('nameInfo')}</TextSecondary>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Field>
            <Input
              aria-label="Notification name"
              name="name"
              placeholder={t('namePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              required
              disabled={!editMode || pending}
              invalid={shouldShowNameError()}
            />
            {shouldShowNameError() && <ErrorMessage>{t(validationErrors.name)}</ErrorMessage>}
            {validationErrors.id && <ErrorMessage>{validationErrors.id}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-6 sm:my-10" soft />

      {formData.tags.length === 0 && (
        <>
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
            <div className="space-y-1">
              <Subheading>{t('mealNumber')}</Subheading>
              <TextSecondary>{t('mealNumberInfo')}</TextSecondary>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Field>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  aria-label="Notification meal number"
                  name="mealNumber"
                  value={formData.mealNumber}
                  onChange={handleChange}
                  required
                  disabled={!editMode || pending}
                  invalid={shouldShowMealNumberError()}
                />
                {shouldShowMealNumberError() && <ErrorMessage>{t(validationErrors.mealNumber)}</ErrorMessage>}
              </Field>
            </div>
          </section>

          <Divider className="my-6 sm:my-10" soft />
        </>
      )}

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
        <div className="space-y-1">
          <Subheading>{t('sendOn')}</Subheading>
          <TextSecondary>{t('sendOnInfo')}</TextSecondary>
          {shouldShowSendOnError() && (
            <p className="text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500">
              {t(validationErrors.sendOn)}
            </p>
          )}
        </div>

        <CheckboxGroup className="grid items-center justify-center sm:col-span-2">
          <CheckboxField>
            <Checkbox
              name="sendMonday"
              checked={formData.sendMonday}
              onChange={(checked) => setFormData({ ...formData, sendMonday: checked })}
            />
            <Label>{t('monday')}</Label>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              name="sendTuesday"
              checked={formData.sendTuesday}
              onChange={(checked) => setFormData({ ...formData, sendTuesday: checked })}
            />
            <Label>{t('tuesday')}</Label>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              name="sendWednesday"
              checked={formData.sendWednesday}
              onChange={(checked) => setFormData({ ...formData, sendWednesday: checked })}
            />
            <Label>{t('wednesday')}</Label>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              name="sendThursday"
              checked={formData.sendThursday}
              onChange={(checked) => setFormData({ ...formData, sendThursday: checked })}
            />
            <Label>{t('thursday')}</Label>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              name="sendFriday"
              checked={formData.sendFriday}
              onChange={(checked) => setFormData({ ...formData, sendFriday: checked })}
            />
            <Label>{t('friday')}</Label>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              name="sendSaturday"
              checked={formData.sendSaturday}
              onChange={(checked) => setFormData({ ...formData, sendSaturday: checked })}
            />
            <Label>{t('saturday')}</Label>
          </CheckboxField>
          <CheckboxField>
            <Checkbox
              name="sendSunday"
              checked={formData.sendSunday}
              onChange={(checked) => setFormData({ ...formData, sendSunday: checked })}
            />
            <Label>{t('sunday')}</Label>
          </CheckboxField>
        </CheckboxGroup>
      </section>

      <Divider className="my-6 sm:my-10" soft />

      <section className="flex flex-col gap-y-6">
        <div className="space-y-1">
          <Subheading>{t('tags')}</Subheading>
          <TextSecondary>{t('tagsInfo')}</TextSecondary>
        </div>

        <input type="hidden" name="tags" value={JSON.stringify(formData.tags)} />

        {formData.tags.map((tag, index) => (
          <div key={index} className="flex gap-x-8">
            <Field className="grow">
              <Label>{t('tag')}</Label>
              <Listbox
                value={{ id: tag.tagId, name: tag.tagName }}
                onChange={(value) => {
                  tag.tagId = value.id
                  tag.tagName = value.name
                  setFormData({ ...formData })
                }}
                invalid={validationErrors.tags ? tag.tagId === '' : false}
              >
                {selectableTags?.map((tag) => (
                  <ListboxOption key={tag.id} value={tag}>
                    <ListboxLabel>{tag.name}</ListboxLabel>
                  </ListboxOption>
                ))}
              </Listbox>
              {shouldShowTagError(tag.tagId) && <ErrorMessage>{t(validationErrors.tags)}</ErrorMessage>}
            </Field>

            <Field className="grow-0">
              <Label>{t('mealNumber')}</Label>
              <Input
                required
                type="number"
                min="1"
                max="100"
                value={tag.number}
                onChange={(e) => {
                  const newTags = [...formData.tags]
                  newTags[index] = { ...newTags[index], number: Number(e.target.value) }
                  setFormData({ ...formData, tags: newTags })
                }}
                invalid={shouldShowTagMealNumberError(tag.number)}
              />
              {shouldShowTagMealNumberError(tag.number) && (
                <ErrorMessage>{t(validationErrors.tagMealNumber)}</ErrorMessage>
              )}
            </Field>

            <div className="flex grow-0 items-end justify-end">
              <Button
                plain
                onClick={() => {
                  const newTags = formData.tags.filter((_, i) => i !== index)
                  setFormData({ ...formData, tags: newTags })
                }}
              >
                <MinusIcon className="stroke-red-500" />
              </Button>
            </div>
          </div>
        ))}

        <div className="col-span-3 flex items-center justify-center py-4">
          <Button
            plain
            onClick={() => {
              setFormData({
                ...formData,
                tags: [...formData.tags, { tagId: '', tagName: '', number: 1 }],
              })
            }}
          >
            <PlusIcon className="stroke-teal-500" />
            <span className="ml-2">{t('addTag')}</span>
          </Button>
        </div>
      </section>

      <Divider className="my-6 sm:my-10" soft />

      <div className="flex justify-end gap-4">
        {!editMode && (
          <Button
            onClick={() => {
              router.replace(pathname + '?edit')
              setEditMode(true)
            }}
          >
            {t('edit')}
          </Button>
        )}
        {editMode && (
          <>
            <Button
              plain
              disabled={pending}
              onClick={() => {
                // form is used in view/edit notification
                if (formData.id) {
                  router.replace(pathname)
                } else {
                  // form is used in create notification
                  router.replace('/notifications')
                }
                setEditMode(false)
              }}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={pending}>
              {notification ? (pending ? t('updating') : t('update')) : pending ? t('creating') : t('create')}
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
