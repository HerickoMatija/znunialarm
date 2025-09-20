import { BatchWriteItemInput } from '@aws-sdk/client-dynamodb'
import { BatchWriteCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb'
import {
  doBatchWrite,
  doTransaction,
  getIdFromKey,
  getNotificationKey,
  getNotificationTagKey,
  getTagKey,
  getUserKey,
  isNotificationItem,
  isNotificationTagItem,
  listItems,
} from '../../../common/common'
import globals from '../../../common/globals'
import { Notification } from '../../../index'
import { NotificationDB, NotificationTagDB, TransactionItems } from '../types'

export async function getNotification(notificationId: string, sub: string): Promise<Notification> {
  let results: any[] = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [getUserKey(sub)],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: [getNotificationKey(notificationId)],
    },
  })

  globals.logger.debug('Retrieved notification item collection', { results })

  let notification: NotificationDB | null = null
  const tags = []

  for (const item of results) {
    if (isNotificationItem(item.SK)) {
      notification = item as NotificationDB
    } else if (isNotificationTagItem(item.SK)) {
      const tagNotificationItem = item as NotificationTagDB
      const tagId = getIdFromKey(tagNotificationItem.GSI1)
      tags.push({ tagId: tagId, tagName: tagNotificationItem.tagName, number: tagNotificationItem.number })
    }
  }

  if (!notification) {
    throw {
      name: 'NotFoundException',
      message: 'Notification not found',
    }
  }

  const finalNotification: Notification = {
    id: getIdFromKey(notification.SK),
    name: notification.notificationName,
    mealNumber: notification.mealNumber,
    tags,
    sendMonday: notification.sendMonday,
    sendTuesday: notification.sendTuesday,
    sendWednesday: notification.sendWednesday,
    sendThursday: notification.sendThursday,
    sendFriday: notification.sendFriday,
    sendSaturday: notification.sendSaturday,
    sendSunday: notification.sendSunday,
  }

  globals.logger.debug('Assembled notification that will be returned', { finalNotification })

  return finalNotification
}

export async function createNotification(notification: Notification, sub: string) {
  const newNotificationId = crypto.randomUUID()

  const newNotification: NotificationDB = {
    PK: getUserKey(sub),
    SK: getNotificationKey(newNotificationId),
    notificationName: notification.name,
    mealNumber: notification.mealNumber,
    sendMonday: notification.sendMonday,
    sendTuesday: notification.sendTuesday,
    sendWednesday: notification.sendWednesday,
    sendThursday: notification.sendThursday,
    sendFriday: notification.sendFriday,
    sendSaturday: notification.sendSaturday,
    sendSunday: notification.sendSunday,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const transactItems: TransactionItems = notification.tags.map((tag) => ({
    Put: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Item: {
        PK: getUserKey(sub),
        SK: getNotificationTagKey(newNotificationId, tag.tagId),
        GSI1: getTagKey(tag.tagId),
        tagName: tag.tagName,
        number: tag.number,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  }))

  transactItems.push({
    Put: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Item: newNotification,
    },
  })

  globals.logger.debug('Create notification transaction items are', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Create notification response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to create notification',
    }
  }

  return newNotificationId
}

export async function updateNotification(notification: Notification, sub: string) {
  await deleteNotificationTags(notification.id, sub)

  const transactItems: TransactionItems = notification.tags.map((tag) => ({
    Put: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Item: {
        PK: getUserKey(sub),
        SK: getNotificationTagKey(notification.id, tag.tagId),
        GSI1: getTagKey(tag.tagId),
        tagName: tag.tagName,
        number: tag.number,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  }))

  transactItems.push({
    Update: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Key: {
        PK: getUserKey(sub),
        SK: getNotificationKey(notification.id),
      },
      UpdateExpression:
        'SET #nameKeyword = :nameValue, mealNumber = :mealNumberValue, sendMonday = :sendMondayValue, sendTuesday = :sendTuesdayValue, sendWednesday = :sendWednesdayValue, sendThursday = :sendThursdayValue, sendFriday = :sendFridayValue, sendSaturday = :sendSaturdayValue, sendSunday = :sendSundayValue, updatedAt = :updatedAtValue',
      ExpressionAttributeValues: {
        ':nameValue': notification.name,
        ':mealNumberValue': notification.mealNumber,
        ':sendMondayValue': notification.sendMonday,
        ':sendTuesdayValue': notification.sendTuesday,
        ':sendWednesdayValue': notification.sendWednesday,
        ':sendThursdayValue': notification.sendThursday,
        ':sendFridayValue': notification.sendFriday,
        ':sendSaturdayValue': notification.sendSaturday,
        ':sendSundayValue': notification.sendSunday,
        ':updatedAtValue': new Date().toISOString(),
      },
      ExpressionAttributeNames: {
        '#nameKeyword': 'notificationName',
      },
    },
  })

  globals.logger.debug('Update notification transaction items are', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Update notification response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to update notification',
    }
  }

  return notification.id
}

export async function getNotificationsForUser(sub: string): Promise<Notification[]> {
  let results: any = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [getUserKey(sub)],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: ['NOTIFICATION#'],
    },
  })

  globals.logger.debug('Retrieved all notification item collections for user', { results })

  const notificationsById = new Map<string, Notification>()
  const tagsByNotificationId = new Map<string, NotificationTagDB[]>()

  results.forEach((item: any) => {
    if (isNotificationTagItem(item.SK)) {
      const tagNotificationItem = item as NotificationTagDB
      const notificationId = getIdFromKey(tagNotificationItem.SK)

      if (!tagsByNotificationId.has(notificationId)) {
        tagsByNotificationId.set(notificationId, [])
      }

      tagsByNotificationId.get(notificationId)!.push(tagNotificationItem)
    } else {
      const notificationItem = item as NotificationDB
      notificationsById.set(getIdFromKey(notificationItem.SK), {
        id: getIdFromKey(notificationItem.SK),
        name: notificationItem.notificationName,
        mealNumber: notificationItem.mealNumber,
        tags: [],
        sendMonday: notificationItem.sendMonday,
        sendTuesday: notificationItem.sendTuesday,
        sendWednesday: notificationItem.sendWednesday,
        sendThursday: notificationItem.sendThursday,
        sendFriday: notificationItem.sendFriday,
        sendSaturday: notificationItem.sendSaturday,
        sendSunday: notificationItem.sendSunday,
      })
    }
  })

  notificationsById.forEach((notification, notificationId) => {
    if (tagsByNotificationId.has(notificationId)) {
      notification.tags = tagsByNotificationId.get(notificationId)!.map((notificationTag) => {
        return {
          tagId: getIdFromKey(notificationTag.GSI1),
          tagName: notificationTag.tagName,
          number: notificationTag.number,
        }
      })
    }
  })

  const notifications = Array.from(notificationsById.values())

  globals.logger.debug('Assembled all notifications', { notifications })

  return notifications
}

export async function getNotificationsCountByUser(sub: string): Promise<number> {
  const result = await getNotificationsForUser(sub)
  return result.length
}

export async function deleteNotification(notificationId: string, sub: string) {
  const notificationItems = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [getUserKey(sub)],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: [getNotificationKey(notificationId)],
    },
  })

  globals.logger.info('Deleting notification item collection', { notificationItems })

  const transactItems: TransactionItems = notificationItems.map((item: any) => ({
    Delete: {
      TableName: process.env.YUMALARM_TABLE_NAME!,
      Key: {
        PK: item.PK,
        SK: item.SK,
      },
    },
  }))

  globals.logger.debug('Deleting notification items', { transactItems })

  const command = new TransactWriteCommand({
    TransactItems: transactItems,
  })

  const response = await doTransaction(command)

  globals.logger.debug('Delete notification response is', { response })

  if (response.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to delete notification',
    }
  }
}

async function deleteNotificationTags(notificationId: string, sub: string) {
  let results: any = await listItems(process.env.YUMALARM_TABLE_NAME!, {
    PK: {
      ComparisonOperator: 'EQ',
      AttributeValueList: [getUserKey(sub)],
    },
    SK: {
      ComparisonOperator: 'BEGINS_WITH',
      AttributeValueList: [getNotificationKey(notificationId)],
    },
  })

  const deleteItems = results
    .filter((item: any) => isNotificationTagItem(item.SK))
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

  globals.logger.debug('Delete notification tags result', { result })

  if (result.$metadata.httpStatusCode !== 200) {
    throw {
      name: 'InternalServerError',
      message: 'Failed to delete notification tags',
    }
  }
}
