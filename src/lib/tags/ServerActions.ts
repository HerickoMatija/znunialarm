'use server'

import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createTag, deleteTag, updateTag } from './tag-DAL'

const errorMessages = {
  name: 'validation.name',
  id: 'validation.id',
}

const createFormSchema = z.object({
  name: z.string().min(1, errorMessages.name),
})

const updateFormSchema = z.object({
  id: z.string().uuid(errorMessages.id),
  name: z.string().min(1, errorMessages.name),
})

export async function addTagServerAction(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const tagFormData = createFormSchema.safeParse(contactFormData)

  if (!tagFormData.success) {
    const fieldErrors = tagFormData.error.flatten().fieldErrors

    return {
      result: ACTION_VALIDATION_ERROR,
      validationErrors: {
        name: fieldErrors?.name?.find((error) => error === errorMessages.name) ? errorMessages.name : '',
      },
    }
  }

  let id
  try {
    id = await createTag({
      id: '',
      name: tagFormData.data.name,
    })
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
      data: {
        toastErrorKey: 'addError',
      },
    }
  }

  revalidatePath('/tags')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'addSuccess',
    },
  }
}

export async function updateTagServerAction(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const tagFormData = updateFormSchema.safeParse(contactFormData)

  if (!tagFormData.success) {
    const fieldErrors = tagFormData.error.flatten().fieldErrors
    return {
      result: ACTION_VALIDATION_ERROR,
      validationErrors: {
        id: fieldErrors?.id?.find((error) => error === errorMessages.id) ? errorMessages.id : '',
        name: fieldErrors?.name?.find((error) => error === errorMessages.name) ? errorMessages.name : '',
      },
    }
  }

  try {
    await updateTag({
      id: tagFormData.data.id,
      name: tagFormData.data.name,
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

  revalidatePath('/tags')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'updateSuccess',
    },
  }
}

export async function deleteTagServerAction(id: string): Promise<ServerActionResponse> {
  try {
    await deleteTag(id)
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
      data: {
        toastErrorKey: 'TagPage.deleteError',
      },
    }
  }

  revalidatePath('/tags')
  return {
    result: ACTION_OK,
    data: {
      toastSuccessKey: 'TagPage.deleteSuccess',
    },
  }
}
