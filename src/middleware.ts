import { runWithAmplifyServerContext } from '@/lib/amplify-server-util'
import { AuthSession } from 'aws-amplify/auth'
import { fetchAuthSession } from 'aws-amplify/auth/server'
import { NextRequest, NextResponse } from 'next/server'
import { isUserSubscribed } from './lib/auth/SubscriptionHelpers'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const session: AuthSession = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec: any) => {
      try {
        return await fetchAuthSession(contextSpec)
      } catch (error) {
        return {}
      }
    },
  })

  const parsedURL = new URL(request.url)
  const path = parsedURL.pathname

  // authenticated
  if (session.tokens !== undefined) {
    if (isUserSubscribed(session.tokens?.idToken?.payload)) {
      return response
    } else {
      return NextResponse.redirect(new URL(`/subscribe`, request.url))
    }
  }

  if (path === '/') {
    return NextResponse.redirect(new URL(`/welcome`, request.url))
  }

  return NextResponse.redirect(new URL(`/login?origin=${path}`, request.url))
}

export const config = {
  matcher: [
    '/((?!welcome|daily|_next/static|_next/image|images|favicon.ico|.well-known|frequently-asked-questions|terms-of-service|privacy-policy|subscribe|login).*)',
  ],
}
