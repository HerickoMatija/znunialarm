'use client'

import { DropdownItem, DropdownLabel } from '@/components/catalyst/dropdown'
import { COOKIES } from '@/lib/Constants'
import { setCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'

export default function LanguageDropdownItem({ label, value }: { label: string; value: string }) {
  const router = useRouter()

  return (
    <>
      <DropdownItem
        onClick={() => {
          setCookie(COOKIES.LANGUAGE, value)
          router.refresh()
        }}
      >
        <DropdownLabel>{label}</DropdownLabel>
      </DropdownItem>
    </>
  )
}
