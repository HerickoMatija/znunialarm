import { APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'
import globals from '../../../common/globals'
import { Notification } from '../../../index'
import {
  createNotification,
  deleteNotification,
  getNotification,
  getNotificationsCountByUser,
  getNotificationsForUser,
  updateNotification,
} from './DB-notification'

export async function handleNotificationRequest(
  resourcePath: string,
  httpMethod: string,
  pathParameters: APIGatewayProxyEventPathParameters,
  queryParameters: APIGatewayProxyEventQueryStringParameters,
  requestBody: any,
  sub: string
) {
  if (resourcePath === '/notifications/count') {
    return await getNotificationsCountByUser(sub)
  } else if (resourcePath === '/notifications') {
    if (httpMethod === 'GET') {
      return await getNotificationsForUser(sub)
    } else if (httpMethod === 'POST') {
      const notificationCreateRequest: Notification = requestBody.notification
      return await handleCreateNotification(notificationCreateRequest, sub)
    }
  } else if (resourcePath === '/notifications/{notificationId}') {
    const notificationId = pathParameters!.notificationId!
    if (httpMethod === 'GET') {
      return await getNotification(notificationId, sub)
    } else if (httpMethod === 'PUT') {
      const notificationUpdateRequest: Notification = requestBody.notification
      return await updateNotification(notificationUpdateRequest, sub)
    } else if (httpMethod === 'DELETE') {
      return await deleteNotification(notificationId, sub)
    }
  }

  throw new Error(`Unsupported resource path: "${resourcePath}"`)
}

async function handleCreateNotification(notification: Notification, sub: string): Promise<{ id: string }> {
  globals.logger.debug('Creating notification', { notification, sub })

  const newNotificationId = await createNotification(notification, sub)

  return { id: newNotificationId }
}
