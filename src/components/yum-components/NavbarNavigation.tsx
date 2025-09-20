'use client'

import { NavbarDivider, NavbarItem, NavbarLabel, NavbarSection } from '@/components/catalyst/navbar'
import { Text } from '@/components/catalyst/text'
import { useUserContext } from '@/components/yum-components/auth/UserDataWrapper'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

const navigationItems = [
  {
    labelKey: 'random',
    href: '/random',
    isCurrent: (pathname: string) => pathname.startsWith('/random'),
  },
  {
    labelKey: 'meals',
    href: '/meals',
    isCurrent: (pathname: string) => pathname.startsWith('/meals'),
  },
  {
    labelKey: 'notifications',
    href: '/notifications',
    isCurrent: (pathname: string) => pathname.startsWith('/notifications'),
  },
  {
    labelKey: 'tags',
    href: '/tags',
    isCurrent: (pathname: string) => pathname.startsWith('/tags'),
  },
]

export default function NavbarNavigation() {
  const t = useTranslations('Navbar')
  const { isLoggedIn } = useUserContext()
  const pathname = usePathname()

  if (!isLoggedIn) {
    return null
  } else {
    return (
      <>
        <NavbarDivider className="max-lg:hidden" />
        <NavbarSection className="max-lg:hidden">
          {navigationItems.map((item) => (
            <NavbarItem key={item.labelKey} href={item.href} current={item.isCurrent(pathname)}>
              <NavbarLabel>
                <Text>{t(item.labelKey)}</Text>
              </NavbarLabel>
            </NavbarItem>
          ))}
        </NavbarSection>
      </>
    )
  }
}
