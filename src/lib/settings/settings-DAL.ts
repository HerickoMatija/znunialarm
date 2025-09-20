import { getAuthToken } from '@/lib/auth/amplify-server-methods'
import { executePut, getBaseRestApiObject } from '@/lib/common-api-methods'
import { redirect } from 'next/navigation'

export async function updateEmail(previousEmail: string, email: string): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject(`updateEmail`, token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        previousEmail: previousEmail,
        newEmail: email,
      },
    },
  }

  const { statusCode } = await executePut(finalApiObject)
  return statusCode === 200
}
