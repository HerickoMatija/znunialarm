import { paginateListUsers } from '@aws-sdk/client-cognito-identity-provider'
import {
  BatchGetCommand,
  BatchWriteCommand,
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  QueryCommandInput,
  TransactWriteCommand,
  UpdateCommand,
  paginateQuery,
} from '@aws-sdk/lib-dynamodb'
import globals from './globals'

export function getQueryParam(queryParamKey: string, queryParameters: any) {
  if (queryParameters && queryParameters[queryParamKey]) {
    return queryParameters[queryParamKey]
  }
  return null
}

export async function deleteItem(tableName: string, id: any) {
  let command = new DeleteCommand({
    TableName: tableName,
    Key: {
      id: id,
    },
  })

  let queryResponse = await globals.dynamoDB.send(command)

  globals.logger.debug('Delete item response is', { queryResponse })

  if (queryResponse.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'BackendError',
      message: `Error deleting item with id ${id}`,
    }
  }
  return queryResponse
}

export async function getItem<T>(tableName: string, keyConditions: any) {
  let command = new GetCommand({
    TableName: tableName,
    Key: keyConditions,
  })

  let queryResponse = await globals.dynamoDB.send(command)

  globals.logger.debug('Get item response is', { queryResponse })

  if (queryResponse.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'BackendError',
      message: `Error retrieving item with key ${keyConditions}`,
    }
  }

  return queryResponse.Item as T
}

export async function listItemsPaged(
  tableName: string,
  keyConditions: any,
  limit: string,
  token: string,
  indexName?: string,
  queryFilter?: any
) {
  let params: QueryCommandInput = {
    IndexName: indexName,
    KeyConditions: keyConditions,
    TableName: tableName,
    Limit: Number(limit),
  }

  if (token) {
    params.ExclusiveStartKey = JSON.parse(token)
  }
  if (queryFilter) {
    params.QueryFilter = queryFilter
  }

  let queryResponse = await globals.dynamoDB.send(new QueryCommand(params))

  if (queryResponse.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'BackendError',
      message: `Error retrieving items`,
    }
  }

  return {
    items: queryResponse.Items,
    nextToken: queryResponse.LastEvaluatedKey,
  }
}

export async function listItems<T>(
  tableName: string,
  keyConditions: any,
  indexName?: string,
  queryFilter?: any
): Promise<T[]> {
  let params: QueryCommandInput = {
    IndexName: indexName,
    KeyConditions: keyConditions,
    TableName: tableName,
  }

  if (queryFilter) {
    params.QueryFilter = queryFilter
  }

  const paginatorConfig = {
    client: globals.dynamoDB,
    pageSize: 50,
  }

  const paginator = paginateQuery(paginatorConfig, params)

  const items = []
  for await (const page of paginator) {
    if (page.Items) {
      items.push(...(page.Items as T[]))
    }
  }

  return items
}

export async function getItemCount(tableName: string, keyConditions: any, indexName?: string): Promise<number> {
  let params = {
    IndexName: indexName,
    KeyConditions: keyConditions,
    TableName: tableName,
  }

  const paginatorConfig = {
    client: globals.dynamoDB,
    pageSize: 50,
  }

  const paginator = paginateQuery(paginatorConfig, params)

  let count = 0
  for await (const page of paginator) {
    if (page.Items) {
      count += page.Items.length
    }
  }

  return count
}

export async function createItem(tableName: string, item: any) {
  let command = new PutCommand({
    TableName: tableName,
    Item: item,
  })

  let queryResponse = await globals.dynamoDB.send(command)

  globals.logger.debug('Create item response is', { queryResponse })

  if (queryResponse.$metadata.httpStatusCode !== 200) {
    throw { name: 'BackendError', message: 'Error creating item' }
  }

  return queryResponse
}

export async function updateItem(
  tableName: string,
  key: any,
  updateExpression: any,
  expressionAttributeValues: any,
  expressionAttributeNames: any
) {
  let command = new UpdateCommand({
    Key: key,
    TableName: tableName,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
  })

  let queryResponse = await globals.dynamoDB.send(command)

  globals.logger.debug('Update item response is', { queryResponse })

  if (queryResponse.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'BackendError',
      message: `Error updating item`,
    }
  }

  return queryResponse
}

export async function doTransaction(command: TransactWriteCommand) {
  try {
    return await globals.dynamoDB.send(command)
  } catch (error: any) {
    throw {
      name: 'BackendError',
      message: `Error updating items: ${error.message}`,
    }
  }
}

export async function doBatchWrite(command: BatchWriteCommand) {
  try {
    return await globals.dynamoDB.send(command)
  } catch (error: any) {
    throw {
      name: 'BackendError',
      message: `Error batch writing items: ${error.message}`,
    }
  }
}

export async function doBatchGet(command: BatchGetCommand) {
  try {
    const result = await globals.dynamoDB.send(command)
    return result.Responses
  } catch (error: any) {
    throw {
      name: 'BackendError',
      message: `Error batch getting items: ${error.message}`,
    }
  }
}

export function getHeaders() {
  return {
    'Content-Type': 'application/json',
    // 👇 allow CORS for all origins
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Security-Token,X-Amz-User-Agent',
    'Access-Control-Allow-Credentials': 'true', // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Methods': 'OPTIONS,PUT',
  }
}

export async function listAllCognitoUsers(cognitoClient: any, userPoolId: string, attributesToGet: any) {
  const paginatorConfig = {
    client: cognitoClient,
    pageSize: 50,
  }

  const input = {
    UserPoolId: userPoolId,
    AttributesToGet: attributesToGet,
  }

  const paginator = paginateListUsers(paginatorConfig, input)

  const users = []

  for await (const page of paginator) {
    if (page.Users) {
      users.push(...page.Users)
    }
  }

  return users
}

export function getUserKey(sub: string) {
  return `USER#${sub}`
}

export function getMealKey(mealId: string) {
  return `MEAL#${mealId}`
}

export function getNotificationKey(notificationId: string) {
  return `NOTIFICATION#${notificationId}`
}

export function getTagKey(tagId: string) {
  return `TAG#${tagId}`
}

export function getMealTagKey(mealId: string, tagId: string) {
  return `MEAL#${mealId}#TAG#${tagId}`
}

export function getNotificationTagKey(notificationId: string, tagId: string) {
  return `NOTIFICATION#${notificationId}#TAG#${tagId}`
}

export function getIdFromKey(key: string) {
  return key.split('#')[1]
}

export function getSecondIdFromKey(key: string) {
  return key.split('#')[3]
}

export function isMealItem(key: string) {
  return key.startsWith('MEAL#') && key.length == 41
}

export function isTagItem(key: string) {
  return key.startsWith('TAG#') && key.length == 40
}

export function isNotificationItem(key: string) {
  return key.startsWith('NOTIFICATION#') && key.length == 49
}

export function isUserItem(key: string) {
  return key.startsWith('USER#') && key.length == 41
}

export function isMealTagItem(key: string) {
  return key.startsWith('MEAL#') && key.length == 82
}

export function isNotificationTagItem(key: string) {
  return key.startsWith('NOTIFICATION#') && key.length == 90
}
