import { getAuthToken } from '@/lib/auth/amplify-server-methods'
import { executePost, getBaseRestApiObject } from '@/lib/common-api-methods'
import { Feedback } from '@/types'
import { redirect } from 'next/navigation'

export async function createFeedback(feedback: Feedback): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject('feedback', token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        feedback,
      },
    },
  }

  const { statusCode } = await executePost(finalApiObject)
  if (statusCode === 200) {
    return true
  } else {
    throw new Error('Failed to create notification')
  }
}
