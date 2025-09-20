import { getAuthToken } from '@/lib/auth/amplify-server-methods'
import { executeGet, getBaseRestApiObject } from '@/lib/common-api-methods'
import { MealIdAndName, MealsByTag } from '@/types'
import { redirect } from 'next/navigation'

export async function getRandomMeal(): Promise<MealIdAndName> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject('meals/random', token))

  if (statusCode === 200) {
    let meal: any = await body.json()
    return meal as MealIdAndName
  } else if (statusCode === 204) {
    return { id: '', name: '' }
  } else {
    throw new Error('Failed to get random meal')
  }
}

export async function getRandomMealFromTag(tagId: string): Promise<MealIdAndName> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject(`meals/random?tagId=${tagId}`, token))

  if (statusCode === 200) {
    let meal: any = await body.json()
    return meal as MealIdAndName
  } else if (statusCode === 204) {
    return { id: '', name: '' }
  } else {
    throw new Error('Failed to get random meal')
  }
}

export async function getRandomMealFromNotification(notificationId: string): Promise<MealsByTag[]> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(
    getBaseRestApiObject(`meals/random?notificationId=${notificationId}`, token)
  )

  if (statusCode === 200) {
    let mealsByTags: any = await body.json()
    return mealsByTags as MealsByTag[]
  } else if (statusCode === 204) {
    return []
  } else {
    throw new Error('Failed to get random meal')
  }
}
