import { APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'
import { Meal, MealIdAndName } from '../../..'
import { getQueryParam } from '../../../common/common'
import globals from '../../../common/globals'
import { Tag } from '../../../index'
import { createTags } from '../tag/DB-tag'
import {
  createMeal,
  deleteMeal,
  deleteMealTags,
  getMeal,
  getMealsByTag,
  getMealsCountByUser,
  getMealsForUser,
  updateMeal,
} from './DB-meal'

export async function handleMealRequest(
  resourcePath: string,
  httpMethod: string,
  pathParameters: APIGatewayProxyEventPathParameters,
  queryParameters: APIGatewayProxyEventQueryStringParameters,
  requestBody: any,
  sub: string
) {
  if (resourcePath === '/meals/count') {
    return await getMealsCountByUser(sub)
  } else if (resourcePath === '/meals/random') {
    let tagId = getQueryParam('tagId', queryParameters)
    return await handleGetRandomMeal(tagId, sub)
  } else if (resourcePath === '/meals/count') {
    return await getMealsCountByUser(sub)
  } else if (resourcePath === '/meals') {
    if (httpMethod === 'GET') {
      return await getMealsForUser(sub)
    } else if (httpMethod === 'POST') {
      const meal: Meal = requestBody.meal
      return await handleCreateMeal(meal, sub)
    }
  } else if (resourcePath === '/meals/{mealId}') {
    const mealId = pathParameters!.mealId!
    if (httpMethod === 'GET') {
      return await getMeal(mealId, sub)
    } else if (httpMethod === 'PUT') {
      const meal: Meal = requestBody.meal
      return await handleUpdateMeal(meal, sub)
    } else if (httpMethod === 'DELETE') {
      return await deleteMeal(mealId, sub)
    }
  }

  throw new Error(`Unsupported resource path: "${resourcePath}"`)
}

async function handleCreateMeal(meal: Meal, sub: string): Promise<{ id: string }> {
  globals.logger.debug('Creating meal', { mealCreateRequest: meal, sub })

  const tagItems: Tag[] = await getTagItems(meal, sub)

  meal = {
    id: '',
    name: meal.name,
    description: meal.description,
    tags: tagItems,
  }

  globals.logger.debug('Creating meal', { meal })

  const newMealId = await createMeal(meal, sub)

  return { id: newMealId }
}

async function handleGetRandomMeal(tagId: string, sub: string): Promise<MealIdAndName> {
  let result: MealIdAndName[] = []
  if (tagId) {
    result = await getMealsByTag(tagId)
  } else {
    result = await getMealsForUser(sub)
  }

  if (result.length === 0) {
    throw {
      name: 'NoContentException',
      message: `There are no meals to randomly choose from (tag='${tagId}')`,
    }
  }

  let randomInt = Math.floor(Math.random() * result.length)
  return { id: result[randomInt].id, name: result[randomInt].name }
}

async function handleUpdateMeal(meal: Meal, sub: string) {
  globals.logger.debug('Updating meal', { meal, sub })

  await deleteMealTags(meal.id, sub)

  const tagItems: Tag[] = await getTagItems(meal, sub)

  meal = {
    id: meal.id,
    name: meal.name,
    description: meal.description,
    tags: tagItems,
  }

  globals.logger.debug('Updating meal', { meal })

  return await updateMeal(meal, sub)
}

async function getTagItems(meal: Meal, sub: string): Promise<Tag[]> {
  const createdTags: Tag[] = await createTags(
    meal.tags.filter((tag) => tag.id === '').map((tag) => tag.name),
    sub
  )

  globals.logger.debug('Created tags', { createdTags })

  return [...createdTags, ...meal.tags.filter((tag) => tag.id !== '')]
}
