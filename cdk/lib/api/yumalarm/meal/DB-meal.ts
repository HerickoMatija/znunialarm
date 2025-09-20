import { BatchWriteItemInput } from '@aws-sdk/client-dynamodb'
import { BatchWriteCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb'
import { Meal, MealIdAndName, Tag } from '../../..'
import {
  doBatchWrite,
  doTransaction,
  getIdFromKey,
  getMealKey,
  getMealTagKey,
  getTagKey,
  getUserKey,
  isMealTagItem,
  listItems,
} from '../../../common/common'
import globals from '../../../common/globals'
import { MealDB, TagMealDB, TransactionItems } from '../types'

export async function createMeal(meal: Meal, sub: string): Promise<string> {
  let newMealId = crypto.randomUUID()

  let newMeal: MealDB = {
    PK: getUserKey(sub),
    SK: getMealKey(newMealId),
    mealName: meal.name,
    description: meal.description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const transactItems: TransactionItems = meal.tags.map((tag) => ({
    Put: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Item: {
        PK: getUserKey(sub),
        SK: getMealTagKey(newMealId, tag.id),
        GSI1: getTagKey(tag.id),
        mealName: meal.name,
        tagName: tag.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  }))

  transactItems.push({
    Put: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Item: newMeal,
    },
  })

  globals.logger.debug('Create meal transaction items are', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Create meal response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to create meal',
    }
  }

  return newMealId
}

export async function updateMeal(meal: Meal, sub: string): Promise<string> {
  let updatedItem: MealDB = {
    PK: getUserKey(sub),
    SK: getMealKey(meal.id),
    mealName: meal.name,
    description: meal.description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const transactItems: TransactionItems = meal.tags.map((tag) => ({
    Put: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Item: {
        PK: getUserKey(sub),
        SK: getMealTagKey(meal.id, tag.id),
        GSI1: getTagKey(tag.id),
        mealName: meal.name,
        tagName: tag.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  }))

  transactItems.push({
    Update: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Key: {
        PK: updatedItem.PK,
        SK: updatedItem.SK,
      },
      UpdateExpression: 'SET #nameKeyword = :nameValue, description = :descriptionValue, updatedAt = :updatedAtValue',
      ExpressionAttributeValues: {
        ':nameValue': meal.name,
        ':descriptionValue': meal.description,
        ':updatedAtValue': new Date().toISOString(),
      },
      ExpressionAttributeNames: {
        '#nameKeyword': 'mealName',
      },
    },
  })

  globals.logger.debug('Update meal transaction items are', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Update meal response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to update meal',
    }
  }

  return meal.id
}

export async function getMeal(mealId: string, sub: string): Promise<Meal> {
  let results: any[] = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [getUserKey(sub)],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: [getMealKey(mealId)],
    },
  })

  globals.logger.debug('Retrieved meal item collection', { results })

  let meal: MealDB | null = null
  const tags = []

  for (const item of results) {
    if (item.SK === getMealKey(mealId)) {
      meal = item
    } else if (item.SK.startsWith(`${getMealKey(mealId)}#TAG#`)) {
      const tagMealItem = item as TagMealDB
      const tagId = getIdFromKey(tagMealItem.GSI1)
      tags.push({ id: tagId, name: tagMealItem.tagName })
    }
  }

  if (!meal) {
    throw {
      name: 'NotFoundException',
      message: 'Meal not found',
    }
  }

  const finalMeal: Meal = {
    id: getIdFromKey(meal.SK),
    name: meal.mealName,
    description: meal.description,
    tags,
  }

  globals.logger.debug('Assembled meal that will be returned', { finalMeal })

  return finalMeal
}

export async function getMealsForUser(sub: string): Promise<Meal[]> {
  let results: any = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [`USER#${sub}`],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: ['MEAL#'],
    },
  })

  globals.logger.debug('Retrieved all meal item collections for user', { results })

  const mealsById = new Map<string, Meal>()
  const tagsByMealId = new Map<string, Tag[]>()

  results.forEach((item: any) => {
    if (isMealTagItem(item.SK)) {
      const tagMealItem = item as TagMealDB
      const tagId = getIdFromKey(tagMealItem.GSI1)
      const mealId = getIdFromKey(tagMealItem.SK)

      if (!tagsByMealId.has(mealId)) {
        tagsByMealId.set(mealId, [])
      }

      tagsByMealId.get(mealId)!.push({
        id: tagId,
        name: tagMealItem.tagName,
      })
    } else {
      const mealItem = item as MealDB
      mealsById.set(getIdFromKey(mealItem.SK), {
        id: getIdFromKey(mealItem.SK),
        name: mealItem.mealName,
        description: mealItem.description,
        tags: [],
      })
    }
  })

  mealsById.forEach((meal, mealId) => {
    meal.tags = tagsByMealId.get(mealId) || []
  })

  const meals = Array.from(mealsById.values())

  globals.logger.debug('Assembled all meals', { meals })

  return meals
}

export async function getMealsByTag(tagId: string): Promise<MealIdAndName[]> {
  const result: TagMealDB[] = await listItems<TagMealDB>(
    process.env.YUMALARM_TABLE_NAME!,
    {
      GSI1: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [getTagKey(tagId)],
      },
      SK: {
        ComparisonOperator: 'BEGINS_WITH',
        AttributeValueList: ['MEAL#'],
      },
    },
    'GSI1'
  )

  return result.map((item) => ({
    id: getIdFromKey(item.SK),
    name: item.mealName,
  }))
}

export async function deleteMeal(mealId: string, sub: string) {
  const mealItems = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [getUserKey(sub)],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: [getMealKey(mealId)],
    },
  })

  globals.logger.info('Deleting meal item collection', { mealItems })

  const transactItems: TransactionItems = mealItems.map((item: any) => ({
    Delete: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Key: {
        PK: item.PK,
        SK: item.SK,
      },
    },
  }))

  globals.logger.debug('Deleting meal items', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Delete meal response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to delete meal',
    }
  }
}

export async function deleteMealTags(mealId: string, sub: string) {
  const results = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [getUserKey(sub)],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: [getMealKey(mealId)],
    },
  })

  const deleteItems = results
    .filter((item: any) => isMealTagItem(item.SK))
    .map((item: any) => ({
      DeleteRequest: {
        Key: {
          PK: item.PK,
          SK: item.SK,
        },
      },
    }))

  globals.logger.debug('Deleting tag items', { deleteItems })

  if (deleteItems.length === 0) {
    return
  }

  const input: BatchWriteItemInput = {
    RequestItems: {
      [process.env.YUMALARM_TABLE_NAME!]: deleteItems,
    },
  }

  const command = new BatchWriteCommand(input)

  const result = await doBatchWrite(command)

  globals.logger.debug('Delete meal tags result', { result })

  if (result.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to delete meal tags',
    }
  }
}

export async function getMealsCountByUser(sub: string): Promise<number> {
  const result = await getMealsForUser(sub)
  return result.length
}
