'use server'

import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { z } from 'zod'
import { getRandomMeal, getRandomMealFromNotification, getRandomMealFromTag } from './random-DAL'

const randomTagFormSchema = z.object({
  tagId: z.string().uuid(),
})
const randomNotificationFormSchema = z.object({
  notificationId: z.string().uuid(),
})

export async function getRandomMealServerAction(): Promise<ServerActionResponse> {
  try {
    let meal = await getRandomMeal()

    if (meal.id === '') {
      return {
        result: ACTION_OK,
        data: {
          message: 'No meals found',
        },
      }
    } else {
      return {
        result: ACTION_OK,
        data: {
          meal,
        },
      }
    }
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
    }
  }
}

export async function getRandomMealFromTagServerAction(
  prevState: any,
  formData: FormData
): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const tagFormData = randomTagFormSchema.safeParse(contactFormData)

  if (!tagFormData.success) {
    return {
      result: ACTION_VALIDATION_ERROR,
    }
  }

  try {
    let meal = await getRandomMealFromTag(tagFormData.data.tagId)

    if (meal.id === '') {
      return {
        result: ACTION_OK,
        data: {
          message: 'No meals found',
        },
      }
    } else {
      return {
        result: ACTION_OK,
        data: {
          meal,
        },
      }
    }
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
    }
  }
}

export async function getRandomMealFromNotificationServerAction(
  prevState: any,
  formData: FormData
): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const notificationFormData = randomNotificationFormSchema.safeParse(contactFormData)

  if (!notificationFormData.success) {
    return {
      result: ACTION_VALIDATION_ERROR,
    }
  }

  try {
    let mealsByTags = await getRandomMealFromNotification(notificationFormData.data.notificationId)

    return {
      result: ACTION_OK,
      data: {
        mealsByTags,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
    }
  }
}
