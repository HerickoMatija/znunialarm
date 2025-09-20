import { BatchWriteItemInput } from '@aws-sdk/client-dynamodb'
import { BatchWriteCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb'
import { Tag } from '../../..'
import {
  createItem,
  doBatchWrite,
  doTransaction,
  getIdFromKey,
  getItem,
  getTagKey,
  getUserKey,
  listItems,
} from '../../../common/common'
import globals from '../../../common/globals'
import { TagDB, TransactionItems } from '../types'

export async function getTag(tagId: string, sub: string): Promise<Tag> {
  const tag = await getItem<TagDB>(process.env.YUMALARM_TABLE_NAME!, {
    PK: getUserKey(sub),
    SK: getTagKey(tagId),
  })
  return { id: getIdFromKey(tag.SK), name: tag.tagName }
}

export async function createTag(tag: Tag, sub: string) {
  const newTagId = crypto.randomUUID()

  const newTag: TagDB = {
    PK: getUserKey(sub),
    SK: getTagKey(newTagId),
    tagName: tag.name,
    GSI1: getTagKey(newTagId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  globals.logger.debug('Creating tag', { newTag })

  const response = await createItem(process.env.YUMALARM_TABLE_NAME!, newTag)

  globals.logger.debug('Create meal response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to create tag',
    }
  }

  return newTagId
}

export async function updateTag(tag: Tag) {
  const tagItems: any[] = await getTagItems(tag.id)

  const transactItems: any = tagItems.map((tagItem) => ({
    Update: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Key: {
        PK: tagItem.PK,
        SK: tagItem.SK,
      },
      UpdateExpression: 'SET #nameKeyword = :nameValue, updatedAt = :updatedAtValue',
      ExpressionAttributeValues: {
        ':nameValue': tag.name,
        ':updatedAtValue': new Date().toISOString(),
      },
      ExpressionAttributeNames: {
        '#nameKeyword': 'tagName',
      },
    },
  }))

  globals.logger.debug('Updating tag items', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Update tag response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to update tag',
    }
  }

  return tag.id
}

export async function deleteTag(tagId: string) {
  const tagItems = await getTagItems(tagId)

  globals.logger.debug('Deleting tag item collection', { tagItems })

  const transactItems: TransactionItems = tagItems.map((tagItem) => ({
    Delete: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Key: {
        PK: tagItem.PK,
        SK: tagItem.SK,
      },
    },
  }))

  globals.logger.debug('Deleting tag items', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Delete tag response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to delete tag',
    }
  }
}

export async function createTags(tagsToBeCreated: string[], sub: string): Promise<{ id: string; name: string }[]> {
  if (tagsToBeCreated.length === 0) {
    return []
  }

  const newTagItems = tagsToBeCreated.map((tag) => ({
    id: crypto.randomUUID(),
    name: tag,
  }))

  const transactItems: any = newTagItems.map((tag) => ({
    PutRequest: {
      Item: {
        PK: getUserKey(sub),
        SK: getTagKey(tag.id),
        tagName: tag.name,
        GSI1: getTagKey(tag.id),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  }))

  globals.logger.debug('Creating new tag items', { transactItems })

  const input: BatchWriteItemInput = {
    RequestItems: {
      [process.env.YUMALARM_TABLE_NAME!]: transactItems,
    },
  }

  const command = new BatchWriteCommand(input)

  const result = await doBatchWrite(command)

  if (result.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to create tags',
    }
  }

  return newTagItems
}

export async function getTagsForUser(sub: string): Promise<Tag[]> {
  const results: TagDB[] = await listItems<TagDB>(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [`USER#${sub}`],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: ['TAG#'],
    },
  })

  return results.map((tag) => ({ id: getIdFromKey(tag.SK), name: tag.tagName }))
}

export async function getTagsCountByUser(sub: string): Promise<number> {
  const result = await getTagsForUser(sub)
  return result.length
}

async function getTagItems(tagId: string): Promise<any[]> {
  return await listItems(
    process.env.YUMALARM_TABLE_NAME!,
    {
      GSI1: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [getTagKey(tagId)],
      },
    },
    'GSI1'
  )
}
