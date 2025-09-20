'use client'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { ErrorMessage, Field } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Heading, Subheading, TextSecondary } from '@/components/catalyst/text'
import { useUserContext } from '@/components/yum-components/auth/UserDataWrapper'
import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateEmailServerAction } from './ServerActions'

interface EmailFormProps {
  editable?: boolean
}

export default function EmailForm({ editable = true }: EmailFormProps) {
  const { email, refreshUser } = useUserContext()
  const t = useTranslations('SettingsPage')
  const [response, formAction, pending] = useActionState(updateEmailServerAction, null)
  const [formData, setFormData] = useState(email)
  const [validationError, setValidationError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (response?.result === ACTION_ERROR) {
      toast.error(t('error'))
    } else if (response?.result === ACTION_VALIDATION_ERROR) {
      setValidationError(t('Validation.name'))
    } else if (response?.result === ACTION_OK) {
      toast.success(t('success'))
      refreshUser()
      router.replace('/settings')
    }
  }, [response])

  return (
    <form action={formAction} className="mx-auto max-w-4xl">
      {editable && (
        <>
          <div className="flex justify-center">
            <Heading>{t('updateEmail')}</Heading>
          </div>
          <Divider className="my-6 sm:my-10" />
        </>
      )}

      <input type="hidden" name="previousEmail" value={email || ''} />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>{t('email')}</Subheading>
          <TextSecondary>{t('emailInfo')}</TextSecondary>
        </div>
        <div className="space-y-1">
          <Field>
            <Input
              aria-label="Email"
              name="email"
              placeholder={t('emailPlaceholder')}
              value={formData || ''}
              onChange={(e) => setFormData(e.target.value)}
              required
              disabled={!editable || pending}
            />
            {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-6 sm:my-10" soft />

      {editable && (
        <div className="flex justify-end gap-4">
          <>
            <Button plain disabled={pending} onClick={() => router.replace('/settings')}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? t('updating') : t('update')}
            </Button>
          </>
        </div>
      )}
    </form>
  )
}
