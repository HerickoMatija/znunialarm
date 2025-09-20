'use client'

import { DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from '@/components/catalyst/dropdown'
import { Text } from '@/components/catalyst/text'
import { useUserContext } from '@/components/yum-components/auth/UserDataWrapper'
import FeedbackAlert from '@/lib/feedback/FeedbackForm'
import { useAuthenticator } from '@aws-amplify/ui-react'
import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  CreditCardIcon,
  LightBulbIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import { useTranslations } from 'next-intl'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  const t = useTranslations('Navbar')
  const { signOutUser, isLoggedIn } = useUserContext()
  const { signOut } = useAuthenticator((context) => [context.user])
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)

  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      <DropdownMenu className="min-w-64" anchor={anchor}>
        <DropdownItem href="/settings">
          <UserCircleIcon />
          <DropdownLabel>
            <Text>{t('account')}</Text>
          </DropdownLabel>
        </DropdownItem>
        <DropdownItem href={process.env.NEXT_PUBLIC_REACT_APP_STRIPE_CUSTOMER_PORTAL_LINK}>
          <CreditCardIcon />
          <DropdownLabel>
            <Text>{t('subscription')}</Text>
          </DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="mailto:support@yumalarm.com">
          <ChatBubbleBottomCenterTextIcon />
          <DropdownLabel>
            <Text>{t('support')}</Text>
          </DropdownLabel>
        </DropdownItem>
        <DropdownItem onClick={() => setOpenFeedbackDialog(true)}>
          <LightBulbIcon />
          <DropdownLabel>
            <Text>{t('feedback')}</Text>
          </DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem
          onClick={() => {
            signOut()
            signOutUser()
            redirect('/login')
          }}
        >
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>
            <Text>{t('signOut')}</Text>
          </DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
      <FeedbackAlert open={openFeedbackDialog} setOpen={setOpenFeedbackDialog} />
    </>
  )
}
