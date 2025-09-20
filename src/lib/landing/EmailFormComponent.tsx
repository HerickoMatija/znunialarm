'use client'

import { Button } from '@/components/catalyst/button'
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '@/components/catalyst/dialog'
import { ErrorMessage, Field } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { addEmail } from '@/lib/landing/ServerActions'
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'

export default function EmailFormComponent({ className }: { className?: string }) {
  const t = useTranslations('LandingPage')

  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openFailureModal, setOpenFailureModal] = useState(false)
  const [response, formAction, pending] = useActionState(addEmail, null)

  useEffect(() => {
    if (response?.result === ACTION_ERROR) {
      setOpenFailureModal(true)
    } else if (response?.result === ACTION_OK) {
      setOpenSuccessModal(true)
      setEmail('')
    } else if (response?.result === ACTION_VALIDATION_ERROR) {
      setValidationError(t('Validation.email'))
    }
  }, [response])

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <form action={formAction} className={clsx(className, 'flex w-full flex-col items-center gap-4 sm:flex-row')}>
        <Field className="w-full max-w-md">
          <Input
            type="email"
            aria-label="Email"
            name="email"
            placeholder={t('CTA.placeholder')}
            value={email}
            onChange={(e) => {
              setValidationError('')
              setEmail(e.target.value)
            }}
            invalid={validationError !== ''}
            required
          />
          {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
        </Field>

        <Button type="submit" disabled={pending} color="teal" className="cursor-pointer">
          {pending ? t('CTA.pending') : t('CTA.button')}
        </Button>
      </form>
      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
      <FailureModal open={openFailureModal} setOpen={setOpenFailureModal} />
    </>
  )
}

function SuccessModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const t = useTranslations('LandingPage.SuccessModal')

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle>
        <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
        {t('title')}
      </DialogTitle>
      <DialogDescription>{t('description')}</DialogDescription>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{t('button')}</Button>
      </DialogActions>
    </Dialog>
  )
}

function FailureModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const t = useTranslations('LandingPage.FailureModal')

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle>
        <XMarkIcon aria-hidden="true" className="size-6 text-red-600" />
        {t('title')}
      </DialogTitle>
      <DialogDescription>{t('description')}</DialogDescription>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{t('button')}</Button>
      </DialogActions>
    </Dialog>
  )
}
