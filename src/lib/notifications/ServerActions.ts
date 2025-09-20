'use server'

import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createNotification, deleteNotification, updateNotification } from './notification-DAL'

const errorMessages = {
  id: 'validation.id',
  name: 'validation.name',
  mealNumber: 'validation.mealNumber',
  tags: 'validation.tags',
  tagMealNumber: 'validation.tagMealNumber',
  sendOn: 'validation.sendOn',
}

const createFormSchema = z
  .object({
    name: z.string().min(1, errorMessages.name),
    mealNumber: z
      .union([
        z.coerce
          .number()
          .int(errorMessages.mealNumber)
          .gte(1, errorMessages.mealNumber)
          .lte(100, errorMessages.mealNumber)
          .min(1, errorMessages.mealNumber),
        z.nan(),
      ])
      .optional(),
    tags: z.preprocess(
      (val) => JSON.parse(val as string),
      z
        .array(
          z.object({
            tagId: z.string().min(1, errorMessages.tags),
            tagName: z.string().min(1, errorMessages.tags),
            number: z.coerce
              .number()
              .int(errorMessages.tagMealNumber)
              .gte(1, errorMessages.tagMealNumber)
              .lte(100, errorMessages.tagMealNumber)
              .min(1, errorMessages.tagMealNumber),
          })
        )
        .optional()
    ),
    sendMonday: z.coerce.boolean().optional(),
    sendTuesday: z.coerce.boolean().optional(),
    sendWednesday: z.coerce.boolean().optional(),
    sendThursday: z.coerce.boolean().optional(),
    sendFriday: z.coerce.boolean().optional(),
    sendSaturday: z.coerce.boolean().optional(),
    sendSunday: z.coerce.boolean().optional(),
  })
  .refine(
    (data) => {
      return (
        data.sendMonday ||
        data.sendTuesday ||
        data.sendWednesday ||
        data.sendThursday ||
        data.sendFriday ||
        data.sendSaturday ||
        data.sendSunday
      )
    },
    {
      message: errorMessages.sendOn,
      path: ['sendOn'],
    }
  )
  .refine(
    (data) => {
      if (data.tags?.length === 0) {
        return data.mealNumber
      }
      return true
    },
    {
      message: errorMessages.mealNumber,
      path: ['mealNumber'],
    }
  )

const updateFormSchema = z
  .object({
    id: z.string().uuid(errorMessages.id),
    name: z.string().min(1, errorMessages.name),
    mealNumber: z
      .union([
        z.coerce
          .number()
          .int(errorMessages.mealNumber)
          .gte(1, errorMessages.mealNumber)
          .lte(100, errorMessages.mealNumber)
          .min(1, errorMessages.mealNumber),
        z.nan(),
      ])
      .optional(),
    tags: z.preprocess(
      (val) => JSON.parse(val as string),
      z
        .array(
          z.object({
            tagId: z.string().min(1, errorMessages.tags),
            tagName: z.string().min(1, errorMessages.tags),
            number: z.coerce
              .number()
              .int(errorMessages.tagMealNumber)
              .gte(1, errorMessages.tagMealNumber)
              .lte(100, errorMessages.tagMealNumber)
              .min(1, errorMessages.tagMealNumber),
          })
        )
        .optional()
    ),
    sendMonday: z.coerce.boolean().optional(),
    sendTuesday: z.coerce.boolean().optional(),
    sendWednesday: z.coerce.boolean().optional(),
    sendThursday: z.coerce.boolean().optional(),
    sendFriday: z.coerce.boolean().optional(),
    sendSaturday: z.coerce.boolean().optional(),
    sendSunday: z.coerce.boolean().optional(),
  })
  .refine(
    (data) => {
      return (
        data.sendMonday ||
        data.sendTuesday ||
        data.sendWednesday ||
        data.sendThursday ||
        data.sendFriday ||
        data.sendSaturday ||
        data.sendSunday
      )
    },
    {
      message: errorMessages.sendOn,
      path: ['sendOn'],
    }
  )
  .refine(
    (data) => {
      if (data.tags?.length === 0) {
        return data.mealNumber
      }
      return true
    },
    {
      message: errorMessages.mealNumber,
      path: ['mealNumber'],
    }
  )

export async function addNotificationServerAction(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const notificationFormData = createFormSchema.safeParse(contactFormData)

  if (!notificationFormData.success) {
    const fieldErrors = notificationFormData.error.flatten().fieldErrors

    return {
      result: ACTION_VALIDATION_ERROR,
      validationErrors: {
        name: fieldErrors?.name?.find((error) => error === errorMessages.name) ? errorMessages.name : '',
        mealNumber: fieldErrors?.mealNumber?.find((error) => error === errorMessages.mealNumber)
          ? errorMessages.mealNumber
          : '',
        tags: fieldErrors?.tags?.find((tagError) => tagError === errorMessages.tags) ? errorMessages.tags : '',
        tagMealNumber: fieldErrors?.tags?.find((tagError) => tagError === errorMessages.tagMealNumber)
          ? errorMessages.tagMealNumber
          : '',
        sendOn: (fieldErrors as any)?.sendOn?.find((error: any) => error === errorMessages.sendOn)
          ? errorMessages.sendOn
          : '',
      },
    }
  }

  let id
  try {
    id = await createNotification({
      id: '',
      name: notificationFormData.data.name,
      mealNumber: notificationFormData.data.mealNumber || 0,
      tags: notificationFormData.data.tags || [],
      sendMonday: notificationFormData.data.sendMonday || false,
      sendTuesday: notificationFormData.data.sendTuesday || false,
      sendWednesday: notificationFormData.data.sendWednesday || false,
      sendThursday: notificationFormData.data.sendThursday || false,
      sendFriday: notificationFormData.data.sendFriday || false,
      sendSaturday: notificationFormData.data.sendSaturday || false,
      sendSunday: notificationFormData.data.sendSunday || false,
    })
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
      data: {
        toastErrorKey: 'createError',
      },
    }
  }

  revalidatePath('/notifications')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'createSuccess',
    },
  }
}

export async function updateNotificationServerAction(
  prevState: any,
  formData: FormData
): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const notificationFormData = updateFormSchema.safeParse(contactFormData)

  if (!notificationFormData.success) {
    const fieldErrors = notificationFormData.error.flatten().fieldErrors
    return {
      result: ACTION_VALIDATION_ERROR,
      validationErrors: {
        id: fieldErrors?.id?.find((error) => error === errorMessages.id) ? errorMessages.id : '',
        name: fieldErrors?.name?.find((error) => error === errorMessages.name) ? errorMessages.name : '',
        mealNumber: fieldErrors?.mealNumber?.find((error) => error === errorMessages.mealNumber)
          ? errorMessages.mealNumber
          : '',
        tags: fieldErrors?.tags?.find((tagError) => tagError === errorMessages.tags) ? errorMessages.tags : '',
        tagMealNumber: fieldErrors?.tags?.find((tagError) => tagError === errorMessages.tagMealNumber)
          ? errorMessages.tagMealNumber
          : '',
        sendOn: (fieldErrors as any)?.sendOn?.find((error: any) => error === errorMessages.sendOn)
          ? errorMessages.sendOn
          : '',
      },
    }
  }

  try {
    await updateNotification({
      id: notificationFormData.data.id,
      name: notificationFormData.data.name,
      mealNumber: notificationFormData.data.mealNumber || 0,
      tags: notificationFormData.data.tags || [],
      sendMonday: notificationFormData.data.sendMonday || false,
      sendTuesday: notificationFormData.data.sendTuesday || false,
      sendWednesday: notificationFormData.data.sendWednesday || false,
      sendThursday: notificationFormData.data.sendThursday || false,
      sendFriday: notificationFormData.data.sendFriday || false,
      sendSaturday: notificationFormData.data.sendSaturday || false,
      sendSunday: notificationFormData.data.sendSunday || false,
    })
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
      data: {
        toastErrorKey: 'updateError',
      },
    }
  }

  revalidatePath('/notifications')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'updateSuccess',
    },
  }
}

export async function deleteNotificationServerAction(id: string): Promise<ServerActionResponse> {
  try {
    await deleteNotification(id)
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
      data: {
        toastErrorKey: 'NotificationPage.deleteError',
      },
    }
  }

  revalidatePath('/notifications')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'NotificationPage.deleteSuccess',
    },
  }
}
