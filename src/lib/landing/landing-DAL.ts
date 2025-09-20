import { executePost, getRestApiId } from '@/lib/common-api-methods'

export async function addLandingEmail(email: string): Promise<boolean> {
  const { statusCode } = await executePost({
    apiName: getRestApiId(),
    path: 'landing',
    options: {
      body: {
        email,
      },
    },
  })

  return statusCode === 201 || statusCode === 200
}
