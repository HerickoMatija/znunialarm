'use client'

import { Button } from '@/components/catalyst/button'
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '@/components/catalyst/dialog'
import { ErrorMessage, Field } from '@/components/catalyst/fieldset'
import { Input } from '@/components/catalyst/input'
import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { addEmail } from '@/lib/landing/ServerActions'
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useActionState, useEffect, useState } from 'react'

export default function EmailFormComponent({ className }: { className?: string }) {
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
            placeholder="E-Mail-Adresse eingeben"
            value={email}
            onChange={(e: any) => {
              setValidationError('')
              setEmail(e.target.value)
            }}
            invalid={validationError !== ''}
            required
          />
          {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
        </Field>

        <Button type="submit" disabled={pending} color="teal" className="cursor-pointer">
          {pending ? 'Wird gesendet...' : 'Frühzeitigen Zugang erhalten'}
        </Button>
      </form>
      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
      <FailureModal open={openFailureModal} setOpen={setOpenFailureModal} />
    </>
  )
}

function SuccessModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle>
        <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
        Erfolg!
      </DialogTitle>
      <DialogDescription>Vielen Dank, dass Sie sich in die Warteliste eingetragen haben!! Wir werden Sie benachrichtigen, sobald Sie auf YumAlarm zugreifen können.</DialogDescription>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Zurück</Button>
      </DialogActions>
    </Dialog>
  )
}

function FailureModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle>
        <XMarkIcon aria-hidden="true" className="size-6 text-red-600" />
        Fehler!
      </DialogTitle>
      <DialogDescription>Etwas ist schiefgelaufen, bitte versuchen Sie es erneut. Falls das Problem weiterhin besteht, kontaktieren Sie bitte den Support.</DialogDescription>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Zurück</Button>
      </DialogActions>
    </Dialog>
  )
}
