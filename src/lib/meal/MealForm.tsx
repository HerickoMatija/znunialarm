'use client'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { ErrorMessage, Field } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Link } from '@/components/catalyst/link'
import { Heading, Subheading, TextSecondary } from '@/components/catalyst/text'
import { Textarea } from '@/components/catalyst/textarea'
import TagAutocomplete from '@/components/yum-components/autocomplete/YumAutocomplete'
import { ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { Meal, Tag } from '@/types'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addMealServerAction, updateMealServerAction } from './ServerActions'

interface MealFormProps {
  tags: Tag[]
  meal?: Meal
  editable?: boolean
}

type MealFormData = {
  id: string
  name: string
  description: string
  tags: Tag[]
}

interface ValidationErrors {
  id?: string
  name?: string
  tags?: string
}

export default function MealForm({ meal, editable = true, tags }: MealFormProps) {
  const t = useTranslations('MealPage')

  const [editMode, setEditMode] = useState(editable)
  const [formData, setFormData] = useState<MealFormData>({
    id: meal?.id || '',
    name: meal?.name || '',
    description: meal?.description || '',
    tags: meal?.tags || [],
  })
  const [response, formAction, pending] = useActionState(meal ? updateMealServerAction : addMealServerAction, null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (meal) {
      setFormData({
        id: meal.id,
        name: meal.name,
        description: meal.description,
        tags: meal.tags,
      })
    }
  }, [meal])

  useEffect(() => {
    if (response?.result === ACTION_VALIDATION_ERROR) {
      setValidationErrors(response.validationErrors || {})
    } else if (response?.result === ACTION_OK) {
      if (response?.data?.toastSuccessKey) {
        toast.success(t(response?.data?.toastSuccessKey))
      }
      router.replace('/meals')
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

  return (
    <form action={formAction} className="mx-auto">
      <div className="max-lg:hidden">
        <TextSecondary>
          <Link href="/meals" className="inline-flex items-center gap-2">
            <ChevronLeftIcon className="dark:fill-zßinc-500 size-4 fill-zinc-400" />
            {t('meals')}
          </Link>
        </TextSecondary>
      </div>
      <div className="flex justify-center">
        <Heading>{meal ? (editMode ? t('editTitle') : t('viewTitle')) : t('createTitle')}</Heading>
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
              aria-label="Meal name"
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

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
        <div className="space-y-1">
          <Subheading>{t('description')}</Subheading>
          <TextSecondary>{t('descriptionInfo')}</TextSecondary>
        </div>

        <Textarea
          aria-label="Meal description"
          name="description"
          placeholder={t('descriptionPlaceholder')}
          value={formData.description}
          onChange={handleChange}
          rows={6}
          disabled={!editMode || pending}
          className="col-span-2"
        />
      </section>

      <Divider className="my-6 sm:my-10" soft />

      <TagAutocomplete
        headingText={t('tags')}
        descriptionText={t('tagsInfo')}
        setTagsFunction={(tags) => setFormData({ ...formData, tags })}
        editMode={editMode}
        validationError={validationErrors.tags || ''}
        currentTags={formData.tags}
        allTags={tags}
        pending={pending}
        placeholder={t('tagPlaceholder')}
        createNewTagText={t('createNewTag')}
      />

      <input type="hidden" name="tags" value={JSON.stringify(formData.tags)} />

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
                // form is used in view/edit meal
                if (formData.id) {
                  router.replace(pathname)
                } else {
                  // form is used in create meal
                  router.replace('/meals')
                }
                setEditMode(false)
              }}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={pending}>
              {meal ? (pending ? t('updating') : t('update')) : pending ? t('creating') : t('create')}
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
