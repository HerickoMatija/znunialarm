'use client'

import { Avatar } from '@/components/catalyst/avatar'
import { Button } from '@/components/catalyst/button'
import { Dropdown, DropdownButton } from '@/components/catalyst/dropdown'
import { NavbarItem, NavbarSection } from '@/components/catalyst/navbar'
import { useUserContext } from '@/components/yum-components/auth/UserDataWrapper'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import AccountDropdownMenu from './AccountDropdownMenu'

export default function NavbarUserMenu() {
  const t = useTranslations('Navbar')
  const { isLoggedIn, email } = useUserContext()

  if (!isLoggedIn) {
    return (
      <NavbarSection>
        <NavbarItem href="/login">
          <Button color="teal">{t('login')}</Button>
        </NavbarItem>
      </NavbarSection>
    )
  }

  return (
    <NavbarSection>
      <Dropdown>
        {({ open }) => (
          <div>
            <DropdownButton as={NavbarItem}>
              <span className="flex min-w-0 items-center gap-3">
                <Avatar initials={email?.charAt(0).toUpperCase()} className="size-8 bg-teal-400 text-teal-950" />
                <span className="hidden min-w-0 sm:block">
                  <span className="block truncate text-base font-normal">{email}</span>
                </span>
              </span>
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </DropdownButton>
            <AccountDropdownMenu anchor="top start" />
          </div>
        )}
      </Dropdown>
    </NavbarSection>
  )
}
