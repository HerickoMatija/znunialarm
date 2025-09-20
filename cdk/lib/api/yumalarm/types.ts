import { ConditionCheck, Delete, Put, TransactWriteItem, Update } from '@aws-sdk/client-dynamodb'
import { NativeAttributeValue } from '@aws-sdk/util-dynamodb'

export type MealDB = {
  PK: string
  SK: string
  mealName: string
  description: string
  createdAt: string
  updatedAt: string
}

export type TagDB = {
  PK: string
  SK: string
  GSI1: string
  tagName: string
  createdAt: string
  updatedAt: string
}

export type TagMealDB = {
  PK: string
  SK: string
  GSI1: string
  mealName: string
  tagName: string
  createdAt: string
  updatedAt: string
}

export type NotificationDB = {
  PK: string
  SK: string
  notificationName: string
  mealNumber: number
  sendMonday: boolean
  sendTuesday: boolean
  sendWednesday: boolean
  sendThursday: boolean
  sendFriday: boolean
  sendSaturday: boolean
  sendSunday: boolean
  createdAt: string
  updatedAt: string
}

export type NotificationTagDB = {
  PK: string
  SK: string
  GSI1: string
  tagName: string
  number: number
  createdAt: string
  updatedAt: string
}

export type TransactionItems =
  | (Omit<TransactWriteItem, 'ConditionCheck' | 'Put' | 'Delete' | 'Update'> & {
      ConditionCheck?:
        | (Omit<ConditionCheck, 'Key' | 'ExpressionAttributeValues'> & {
            Key: Record<string, NativeAttributeValue> | undefined
            ExpressionAttributeValues?: Record<string, NativeAttributeValue> | undefined
          })
        | undefined
      Put?:
        | (Omit<Put, 'Item' | 'ExpressionAttributeValues'> & {
            Item: Record<string, NativeAttributeValue> | undefined
            ExpressionAttributeValues?: Record<string, NativeAttributeValue> | undefined
          })
        | undefined
      Delete?:
        | (Omit<Delete, 'Key' | 'ExpressionAttributeValues'> & {
            Key: Record<string, NativeAttributeValue> | undefined
            ExpressionAttributeValues?: Record<string, NativeAttributeValue> | undefined
          })
        | undefined
      Update?:
        | (Omit<Update, 'Key' | 'ExpressionAttributeValues'> & {
            Key: Record<string, NativeAttributeValue> | undefined
            ExpressionAttributeValues?: Record<string, NativeAttributeValue> | undefined
          })
        | undefined
    })[]
  | undefined
