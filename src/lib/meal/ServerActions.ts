'use server'

import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createMeal, deleteMeal, updateMeal } from './meal-DAL'

const errorMessages = {
  id: 'validation.id',
  name: 'validation.name',
  tags: 'validation.tags',
}

const createFormSchema = z.object({
  name: z.string().min(1, errorMessages.name),
  description: z.string().optional(),
  tags: z.preprocess(
    (val) => JSON.parse(val as string),
    z
      .array(
        z.object({
          id: z.union([z.string().uuid(errorMessages.tags), z.string().length(0, errorMessages.tags)]),
          name: z.string().min(1, errorMessages.tags),
        })
      )
      .optional()
  ),
})

const updateFormSchema = z.object({
  id: z.string().uuid(errorMessages.id),
  name: z.string().min(1, errorMessages.name),
  description: z.string().optional(),
  tags: z.preprocess(
    (val) => JSON.parse(val as string),
    z
      .array(
        z.object({
          id: z.union([z.string().uuid(errorMessages.tags), z.string().length(0, errorMessages.tags)]),
          name: z.string().min(1, errorMessages.tags),
        })
      )
      .optional()
  ),
})

export async function addMealServerAction(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const mealFormData = createFormSchema.safeParse(contactFormData)

  if (!mealFormData.success) {
    const fieldErrors = mealFormData.error.flatten().fieldErrors

    return {
      result: ACTION_VALIDATION_ERROR,
      validationErrors: {
        name: fieldErrors?.name?.find((error) => error === errorMessages.name) ? errorMessages.name : '',
        tags: fieldErrors?.tags?.find((tagError) => tagError === errorMessages.tags) ? errorMessages.tags : '',
      },
    }
  }

  let id
  try {
    id = await createMeal({
      id: '',
      name: mealFormData.data.name,
      description: mealFormData.data.description || '',
      tags: mealFormData.data.tags || [],
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

  revalidatePath('/meals')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'createSuccess',
    },
  }
}

export async function updateMealServerAction(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const mealFormData = updateFormSchema.safeParse(contactFormData)

  if (!mealFormData.success) {
    const fieldErrors = mealFormData.error.flatten().fieldErrors

    console.log(fieldErrors)

    return {
      result: ACTION_VALIDATION_ERROR,
      validationErrors: {
        id: fieldErrors?.id?.find((error) => error === errorMessages.id) ? errorMessages.id : '',
        name: fieldErrors?.name?.find((error) => error === errorMessages.name) ? errorMessages.name : '',
        tags: fieldErrors?.tags?.find((tagError) => tagError === errorMessages.tags) ? errorMessages.tags : '',
      },
    }
  }

  try {
    await updateMeal({
      id: mealFormData.data.id,
      name: mealFormData.data.name,
      description: mealFormData.data.description || '',
      tags: mealFormData.data.tags || [],
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

  revalidatePath('/meals')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'updateSuccess',
    },
  }
}

export async function deleteMealServerAction(id: string): Promise<ServerActionResponse> {
  try {
    await deleteMeal(id)
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
      data: {
        toastErrorKey: 'MealPage.deleteError',
      },
    }
  }
  revalidatePath('/meals')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'MealPage.deleteSuccess',
    },
  }
}
