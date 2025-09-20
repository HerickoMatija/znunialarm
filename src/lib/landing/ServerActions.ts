'use server'

import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { z } from 'zod'
import { addLandingEmail } from './landing-DAL'

const addEmailSchema = z.object({
  email: z.string().email().min(1),
})

export async function addEmail(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const emailFormData = addEmailSchema.safeParse(contactFormData)

  if (!emailFormData.success) {
    return {
      result: ACTION_VALIDATION_ERROR,
    }
  }

  try {
    let success = await addLandingEmail(emailFormData.data.email)
    if (!success) {
      return {
        result: ACTION_ERROR,
      }
    }
    return {
      result: ACTION_OK,
    }
  } catch (e) {
    return {
      result: ACTION_ERROR,
    }
  }
}
