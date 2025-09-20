'use server'

import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { z } from 'zod'
import { createFeedback } from './feedback-DAL'

const createFeedbackSchema = z.object({
  description: z.string().min(1),
  type: z.enum(['Feature', 'Feedback', 'Bug']),
})

export async function addFeedbackServerAction(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const feedbackFormData = createFeedbackSchema.safeParse(contactFormData)

  if (!feedbackFormData.success) {
    //const fieldErrors = feedbackFormData.error.flatten().fieldErrors

    return {
      result: ACTION_VALIDATION_ERROR,
    }
  }

  try {
    await createFeedback({
      description: feedbackFormData.data.description,
      type: feedbackFormData.data.type,
    })
    return {
      result: ACTION_OK,
    }
  } catch (e) {
    console.log(e)
    return {
      result: ACTION_ERROR,
    }
  }
}
