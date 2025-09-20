import { getAuthToken } from '@/lib/auth/amplify-server-methods'
import { executeDelete, executeGet, executePost, executePut, getBaseRestApiObject } from '@/lib/common-api-methods'
import { Meal } from '@/types'
import { redirect } from 'next/navigation'

export async function getMeals(): Promise<Meal[]> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject('meals', token))

  if (statusCode === 204) {
    return []
  } else {
    let meals = (await body.json()) as Meal[]
    meals.sort((a, b) => a.name.localeCompare(b.name))
    return meals
  }
}

export async function getMeal(mealId: string): Promise<Meal> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject(`meals/${mealId}`, token))

  if (statusCode === 200) {
    let meal: any = await body.json()
    return meal as Meal
  } else {
    throw new Error('Meal not found')
  }
}

export async function createMeal(meal: Meal): Promise<string> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject('meals', token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        meal,
      },
    },
  }

  const { body, statusCode } = await executePost(finalApiObject)
  if (statusCode === 200) {
    let response: any = await body.json()
    return response.id
  } else {
    throw new Error('Failed to create meal')
  }
}

export async function updateMeal(meal: Meal): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject(`meals/${meal.id}`, token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        meal,
      },
    },
  }

  const { statusCode } = await executePut(finalApiObject)
  return statusCode === 200
}

export async function deleteMeal(mealId: string): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode } = await executeDelete(getBaseRestApiObject(`meals/${mealId}`, token))
  return statusCode === 200
}

export async function getMealCount(): Promise<number> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject(`meals/count`, token))

  if (statusCode === 200) {
    return (await body.json()) as number
  } else {
    throw new Error('Failed to get meal count')
  }
}
