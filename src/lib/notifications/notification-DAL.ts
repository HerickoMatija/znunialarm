import { getAuthToken } from '@/lib/auth/amplify-server-methods'
import { executeDelete, executeGet, executePost, executePut, getBaseRestApiObject } from '@/lib/common-api-methods'
import { Notification } from '@/types'
import { redirect } from 'next/navigation'

export async function getNotifications(): Promise<Notification[]> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject('notifications', token))

  if (statusCode === 204) {
    return []
  } else {
    let notifications = (await body.json()) as Notification[]
    notifications.sort((a, b) => a.name.localeCompare(b.name))
    return notifications
  }
}

export async function getNotification(notificationId: string): Promise<Notification> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject(`notifications/${notificationId}`, token))

  if (statusCode === 200) {
    let notification: any = await body.json()
    return notification as Notification
  } else {
    throw new Error('Notification not found')
  }
}

export async function createNotification(notification: Notification): Promise<string> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject('notifications', token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        notification,
      },
    },
  }

  const { body, statusCode } = await executePost(finalApiObject)
  if (statusCode === 200) {
    let response: any = await body.json()
    return response.id
  } else {
    throw new Error('Failed to create notification')
  }
}

export async function updateNotification(notification: Notification): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject(`notifications/${notification.id}`, token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        notification,
      },
    },
  }

  const { statusCode } = await executePut(finalApiObject)
  return statusCode === 200
}

export async function deleteNotification(notificationId: string): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode } = await executeDelete(getBaseRestApiObject(`notifications/${notificationId}`, token))
  return statusCode === 200
}

export async function getNotificationCount(): Promise<number> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject(`notifications/count`, token))

  if (statusCode === 200) {
    return (await body.json()) as number
  } else {
    throw new Error('Failed to get notification count')
  }
}
