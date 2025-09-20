'use client'

import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { ErrorMessage, Field } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { Heading, Subheading } from '@/components/catalyst/text'
import { updatePassword } from 'aws-amplify/auth'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ValidationErrors {
  oldPassword?: string
  password?: string
  confirmPassword?: string
}

export default function PasswordForm() {
  const t = useTranslations('SettingsPage')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const router = useRouter()

  function handleUpdatePasswordClick() {
    setPending(true)
    const validationResult = validatePassword(oldPassword, password, confirmPassword, t)
    setValidationErrors(validationResult.validationErrors)

    if (!validationResult.isValid) {
      setPending(false)
      return
    } else {
      updateUserPassword(oldPassword, password)
    }
    setPending(false)
  }

  async function updateUserPassword(oldPassword: string, newPassword: string) {
    updatePassword({ oldPassword, newPassword }).then(() => {
      router.push('/settings')
    })
  }

  return (
    <form className="mx-auto max-w-4xl">
      <div className="flex justify-center">
        <Heading>{t('updatePassword')}</Heading>
      </div>
      <Divider className="my-6 sm:my-10" />

      <section className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
        <div className="space-y-1">
          <Subheading>{t('oldPassword')}</Subheading>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Field>
            <Input
              type="password"
              aria-label="Old Password"
              name="oldPassword"
              placeholder={t('oldPasswordPlaceholder')}
              value={oldPassword || ''}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              disabled={pending}
            />
            {validationErrors['oldPassword'] && <ErrorMessage>{validationErrors['oldPassword']}</ErrorMessage>}
          </Field>
        </div>
        <div className="space-y-1">
          <Subheading>{t('newPassword')}</Subheading>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Field>
            <Input
              type="password"
              aria-label="New Password"
              name="password"
              placeholder={t('newPasswordPlaceholder')}
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={pending}
            />
            {validationErrors['password'] && <ErrorMessage>{validationErrors['password']}</ErrorMessage>}
          </Field>
        </div>
        <div className="space-y-1">
          <Subheading>{t('confirmPassword')}</Subheading>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Field>
            <Input
              type="password"
              aria-label="Confirm Password"
              name="confirmPassword"
              placeholder={t('confirmPasswordPlaceholder')}
              value={confirmPassword || ''}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={pending}
            />
            {validationErrors['confirmPassword'] && <ErrorMessage>{validationErrors['confirmPassword']}</ErrorMessage>}
          </Field>
        </div>
      </section>

      <Divider className="my-6 sm:my-10" soft />

      <div className="flex justify-end gap-4">
        <Button plain disabled={pending} onClick={() => router.replace('/settings')}>
          {t('cancel')}
        </Button>
        <Button disabled={pending} onClick={handleUpdatePasswordClick}>
          {pending ? t('updating') : t('update')}
        </Button>
      </div>
    </form>
  )
}

const validatePassword = (
  oldPassword: string,
  password: string,
  confirmPassword: string,
  t: any
): { isValid: boolean; validationErrors: ValidationErrors } => {
  let isValid = true
  let validationErrors: ValidationErrors = {}

  if (oldPassword.length === 0) {
    isValid = false
    validationErrors['oldPassword'] = t('Validation.emptyOldPassword')
  }

  if (password.length === 0) {
    isValid = false
    validationErrors['password'] = t('Validation.emptyPassword')
  }

  if (confirmPassword !== password) {
    isValid = false
    validationErrors['confirmPassword'] = t('Validation.passwordMismatch')
  }

  return { isValid: isValid, validationErrors: validationErrors }
}
