'use client'

import { Avatar } from '@/components/catalyst/avatar'
import { Dropdown, DropdownButton } from '@/components/catalyst/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar'
import AccountDropdownMenu from './AccountDropdownMenu'
import { useUserContext } from './auth/UserDataWrapper'

export default function NavbarComponent() {
  const { isLoggedIn, email } = useUserContext()

  if (!isLoggedIn) {
    return <></>
  } else {
    return (
      <Navbar>
        <NavbarSpacer />
        <NavbarSection>
          <Dropdown>
            <DropdownButton as={NavbarItem}>
              <Avatar
                initials={email?.charAt(0).toUpperCase()}
                className="size-6 bg-zinc-900 text-white dark:bg-white dark:text-black"
                square
              />
            </DropdownButton>
            <AccountDropdownMenu anchor="bottom end" />
          </Dropdown>
        </NavbarSection>
      </Navbar>
    )
  }
}
