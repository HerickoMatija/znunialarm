'use server'

import { ACTION_ERROR, ACTION_OK, ACTION_VALIDATION_ERROR } from '@/lib/Constants'
import { ServerActionResponse } from '@/types'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { updateEmail } from './settings-DAL'

const updateEmailSchema = z.object({
  email: z.string().email().min(1),
  previousEmail: z.string().email().min(1),
})

export async function updateEmailServerAction(prevState: any, formData: FormData): Promise<ServerActionResponse> {
  const contactFormData = Object.fromEntries(formData)
  const emailFormData = updateEmailSchema.safeParse(contactFormData)

  if (!emailFormData.success) {
    return { result: ACTION_VALIDATION_ERROR }
  }

  try {
    await updateEmail(emailFormData.data.previousEmail, emailFormData.data.email)
  } catch (e) {
    console.log(e)
    return { result: ACTION_ERROR }
  }

  revalidatePath(`/settings`)
  return { result: ACTION_OK }
}
