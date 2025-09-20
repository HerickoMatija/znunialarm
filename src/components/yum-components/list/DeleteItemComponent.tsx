'use client'

import { DropdownItem } from '@/components/catalyst/dropdown'
import { ACTION_OK } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'react-toastify'

export type DeleteItemComponentProps = {
  id: string
  deleteFunction: (id: string) => Promise<ServerActionResponse>
}

export default function DeleteItemComponent({ id, deleteFunction }: DeleteItemComponentProps) {
  const t = useTranslations()
  const [pending, setPending] = useState(false)

  const handleResponse = (response: ServerActionResponse) => {
    if (response?.result === ACTION_OK) {
      if (response?.data?.toastSuccessKey) {
        toast.success(t(response?.data?.toastSuccessKey))
      }
    } else {
      if (response?.data?.toastErrorKey) {
        toast.error(t(response?.data?.toastErrorKey))
      } else {
        toast.error(t('General.error'))
      }
    }
  }

  return (
    <DropdownItem
      onClick={async () => {
        setPending(true)
        let response = await deleteFunction(id)
        handleResponse(response)
        setPending(false)
      }}
    >
      {pending ? t('General.deleting') : t('General.delete')}
    </DropdownItem>
  )
}
