'use client'

import { Avatar } from '@/components/catalyst/avatar'
import { Dropdown, DropdownButton } from '@/components/catalyst/dropdown'
import { SidebarItem, SidebarLabel } from '@/components/catalyst/sidebar'
import { Text } from '@/components/catalyst/text'
import { useUserContext } from '@/components/yum-components/auth/UserDataWrapper'
import { ChevronUpIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import AccountDropdownMenu from './AccountDropdownMenu'

export default function SidebarUserMenu() {
  const t = useTranslations('Navbar')
  const { isLoggedIn, email } = useUserContext()

  if (!isLoggedIn) {
    return (
      <SidebarItem href="/login">
        <SidebarLabel>
          <Text>{t('login')}</Text>
        </SidebarLabel>
      </SidebarItem>
    )
  }

  return (
    <Dropdown>
      <DropdownButton as={SidebarItem}>
        <span className="flex min-w-0 items-center gap-3">
          <Avatar
            initials={email?.charAt(0).toUpperCase()}
            className="size-6 bg-zinc-900 text-white dark:bg-white dark:text-black"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{email}</span>
          </span>
        </span>
        <ChevronUpIcon />
      </DropdownButton>
      <AccountDropdownMenu anchor="top start" />
    </Dropdown>
  )
}
