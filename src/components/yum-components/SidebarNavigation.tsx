'use client'

import { SidebarItem, SidebarLabel, SidebarSection } from '@/components/catalyst/sidebar'
import { Text } from '@/components/catalyst/text'
import { useUserContext } from '@/components/yum-components/auth/UserDataWrapper'
import { EnvelopeIcon, HomeIcon, SparklesIcon, Square2StackIcon, TagIcon } from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

const navigationItems = [
  {
    labelKey: 'dashboard',
    href: '/',
    icon: HomeIcon,
    isCurrent: (pathname: string) => pathname === '/',
  },
  {
    labelKey: 'random',
    href: '/random',
    icon: SparklesIcon,
    isCurrent: (pathname: string) => pathname.startsWith('/random'),
  },
  {
    labelKey: 'meals',
    href: '/meals',
    icon: Square2StackIcon,
    isCurrent: (pathname: string) => pathname.startsWith('/meals'),
  },
  {
    labelKey: 'notifications',
    href: '/notifications',
    icon: EnvelopeIcon,
    isCurrent: (pathname: string) => pathname.startsWith('/notifications'),
  },
  {
    labelKey: 'tags',
    href: '/tags',
    icon: TagIcon,
    isCurrent: (pathname: string) => pathname.startsWith('/tags'),
  },
]

export default function SidebarNavigation() {
  const t = useTranslations('Navbar')
  const { isLoggedIn } = useUserContext()
  const pathname = usePathname()

  if (!isLoggedIn) {
    return (
      <SidebarSection>
        <SidebarItem href="/login">
          <SidebarLabel>
            <Text>{t('login')}</Text>
          </SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    )
  } else {
    return (
      <SidebarSection>
        {navigationItems.map((item) => (
          <SidebarItem href={item.href} current={item.isCurrent(pathname)}>
            <item.icon />
            <SidebarLabel>
              <Text>{t(item.labelKey)}</Text>
            </SidebarLabel>
          </SidebarItem>
        ))}
      </SidebarSection>
    )
  }
}
