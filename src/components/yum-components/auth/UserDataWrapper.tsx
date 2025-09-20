'use client'

import {
  getReferralCode,
  getReferralCount,
  getUserMealsLimit,
  getUserNotificationsLimit,
  getUserTagLimit,
} from '@/lib/auth/SubscriptionHelpers'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { fetchAuthSession, JWT } from 'aws-amplify/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export type UserContextType = {
  idToken: JWT | null
  isLoggedIn: boolean
  tagLimit: number
  mealLimit: number
  notificationLimit: number
  referralCode: string | null
  referralCount: number
  email: string | null
  sub: string | null
  refreshUser: Function
  signOutUser: Function
}

export type LanguageContextType = {
  locale: string
  selectLanguage: Function
}

interface UserDataWrapperProps {
  children: ReactNode
}

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  tagLimit: 0,
  mealLimit: 0,
  notificationLimit: 0,
  referralCode: null,
  referralCount: 0,
  email: null,
  sub: null,
  idToken: null,
  refreshUser: () => {},
  signOutUser: () => {},
})

export default function UserDataWrapper({ children }: UserDataWrapperProps) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus])
  const [idToken, setIdToken] = useState<JWT | null>(null)

  const isLoggedIn = idToken !== null
  const tagLimit = getUserTagLimit(idToken?.payload)
  const mealLimit = getUserMealsLimit(idToken?.payload)
  const notificationLimit = getUserNotificationsLimit(idToken?.payload)
  const referralCode = getReferralCode(idToken?.payload)
  const referralCount = getReferralCount(idToken?.payload)
  const email = (idToken?.payload.email as string) || null
  const sub = (idToken?.payload.sub as string) || null

  async function loadAttributes(forceRefresh: boolean) {
    if (authStatus === 'authenticated') {
      try {
        const authSessionResponse = await fetchAuthSession({ forceRefresh })
        setIdToken(authSessionResponse.tokens?.idToken || null)
      } catch (error) {
        setIdToken(null)
      }
    } else if (authStatus === 'unauthenticated') {
      setIdToken(null)
    }
  }

  useEffect(() => {
    loadAttributes(false)
  }, [])

  useEffect(() => {
    loadAttributes(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus])

  async function refreshUser() {
    loadAttributes(true)
  }

  function signOutUser() {
    setIdToken(null)
  }

  return (
    <UserContext.Provider
      value={{
        idToken,
        isLoggedIn,
        tagLimit,
        mealLimit,
        notificationLimit,
        referralCode,
        referralCount,
        email,
        sub,
        refreshUser,
        signOutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
