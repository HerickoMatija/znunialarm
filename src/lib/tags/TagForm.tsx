'use client'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { ErrorMessage, Field } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Link } from '@/components/catalyst/link'
import { Heading, Subheading, TextSecondary } from '@/components/catalyst/text'
import { ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { addTagServerAction, updateTagServerAction } from '@/lib/tags/ServerActions'
import { Tag } from '@/types'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface TagFormProps {
  tag?: Tag
  editable?: boolean
}

type TagFormData = {
  id: string
  name: string
}

interface ValidationErrors {
  id?: string
  name?: string
}

export default function TagForm({ tag, editable = true }: TagFormProps) {
  const t = useTranslations('TagPage')

  const [editMode, setEditMode] = useState(editable)
  const [formData, setFormData] = useState<TagFormData>({
    id: tag?.id || '',
    name: tag?.name || '',
  })
  const [response, formAction, pending] = useActionState(tag ? updateTagServerAction : addTagServerAction, null)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (tag) {
      setFormData({
        id: tag.id,
        name: tag.name,
      })
    }
  }, [tag])

  useEffect(() => {
    if (response?.result === ACTION_VALIDATION_ERROR) {
      setValidationErrors(response.validationErrors || {})
    } else if (response?.result === ACTION_OK) {
      if (response?.data?.toastSuccessKey) {
        toast.success(t(response?.data?.toastSuccessKey))
      }
      router.replace('/tags')
    } else {
      if (response?.data?.toastErrorKey) {
        toast.error(t(response?.data?.toastErrorKey))
      }
    }
  }, [response])

  const shouldShowNameError = () => {
    if (!validationErrors.name) {
      return false
    }
    return formData.name.length === 0
  }

  return (
    <form action={formAction} className="mx-auto">
      <div className="max-lg:hidden">
        <TextSecondary>
          <Link href="/tags" className="inline-flex items-center gap-2">
            <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
            {t('tags')}
          </Link>
        </TextSecondary>
      </div>
      <div className="flex justify-center">
        <Heading>{tag ? (editMode ? t('editTitle') : t('viewTitle')) : t('createTitle')}</Heading>
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
              aria-label="Tag name"
              name="name"
              placeholder={t('namePlaceholder')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={!editMode || pending}
              invalid={shouldShowNameError()}
            />
            {shouldShowNameError() && <ErrorMessage>{validationErrors.name}</ErrorMessage>}
            {validationErrors.id && <ErrorMessage>{validationErrors.id}</ErrorMessage>}
          </Field>
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
                // form is used in view/edit tag
                if (formData.id) {
                  router.replace(pathname)
                } else {
                  // form is used in create tag
                  router.replace('/tags')
                }
                setEditMode(false)
              }}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={pending}>
              {tag ? (pending ? t('updating') : t('update')) : pending ? t('creating') : t('create')}
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
