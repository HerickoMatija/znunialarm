'use server'

import { runWithAmplifyServerContext } from '@/lib/amplify-server-util'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth/server'
import { cookies } from 'next/headers'

export const fetchSessionFromServer = async () => {
  const currentSession = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchAuthSession(contextSpec),
  })
  return currentSession
}

export const fetchUserFromServer = async () => {
  const currentUser = runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec),
  })
  return currentUser
}

export const getAuthToken = async () => {
  const session = await fetchSessionFromServer()
  const token = session.tokens?.idToken?.toString()
  return { token }
}

export const isLoggedIn = async () => {
  const session = await fetchSessionFromServer()
  return session.tokens !== undefined
}
