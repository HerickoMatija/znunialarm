'use client'

import { BadgeButton } from '@/components/catalyst/badge'
import { Button } from '@/components/catalyst/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/catalyst/dialog'
import { ErrorMessage, Field, Label } from '@/components/catalyst/fieldset'
import { Subheading, TextSecondary } from '@/components/catalyst/text'
import { Textarea } from '@/components/catalyst/textarea'
import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { Feedback } from '@/types'
import { BugAntIcon, InboxArrowDownIcon, LightBulbIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addFeedbackServerAction } from './ServerActions'

export default function FeedbackAlert({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const t = useTranslations('FeedbackForm')
  const [description, setDescription] = useState<string>('')
  const [type, setType] = useState<Feedback['type'] | ''>('')
  const [response, formAction, pending] = useActionState(addFeedbackServerAction, null)
  const [validationError, setValidationError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (response?.result === ACTION_ERROR) {
      toast.error(t('error'))
    } else if (response?.result === ACTION_VALIDATION_ERROR) {
      setValidationError(t('Validation.name'))
    } else if (response?.result === ACTION_OK) {
      setSuccessMessage(t('success'))
      setTimeout(() => {
        setType('')
        setDescription('')
        setSuccessMessage('')
        setOpen(false)
      }, 3000)
    }
  }, [response])

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
          setType('')
          setDescription('')
        }}
      >
        <form action={formAction}>
          <DialogTitle>
            <Subheading>{!type ? t('prompt') : t(type)}</Subheading>
          </DialogTitle>
          <DialogDescription>
            <TextSecondary>
              {type &&
                t.rich('promptDescription', {
                  replaceThis: (chunks) => {
                    return t(type)
                  },
                })}
            </TextSecondary>
          </DialogDescription>
          <DialogBody>
            {type && (
              <div className="space-y-1 sm:col-span-2">
                <Field>
                  <Label>{t('description')}</Label>
                  <Textarea
                    aria-label="Feedback description"
                    name="description"
                    placeholder={t('descriptionPlaceholder')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    disabled={pending}
                    rows={5}
                  />
                  {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
                </Field>
              </div>
            )}
            {!type && (
              <div className="flex flex-col gap-2">
                <Button onClick={() => setType('Feature')}>
                  {t('Feature')}
                  <LightBulbIcon aria-hidden="true" className="m-2 h-4 w-4" />
                </Button>
                <Button onClick={() => setType('Feedback')}>
                  {t('Feedback')}
                  <InboxArrowDownIcon aria-hidden="true" className="m-2 h-4 w-4" />
                </Button>
                <Button onClick={() => setType('Bug')}>
                  {t('Bug')}
                  <BugAntIcon aria-hidden="true" className="m-2 h-4 w-4" />
                </Button>
              </div>
            )}
            <input type="hidden" name="type" value={type} />
          </DialogBody>
          <DialogActions>
            {!successMessage && type && (
              <>
                <Button
                  plain
                  onClick={() => {
                    setType('')
                    setDescription('')
                  }}
                >
                  {t('back')}
                </Button>

                <Button type="submit" disabled={pending}>
                  {t('submit')}
                </Button>
              </>
            )}
            {successMessage && <BadgeButton color="green">{t('success')}</BadgeButton>}
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
