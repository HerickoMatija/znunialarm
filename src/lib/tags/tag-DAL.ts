import { getAuthToken } from '@/lib/auth/amplify-server-methods'
import { executeDelete, executeGet, executePost, executePut, getBaseRestApiObject } from '@/lib/common-api-methods'
import { Tag } from '@/types'
import { redirect } from 'next/navigation'

export async function getTags(): Promise<Tag[]> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject('tags', token))

  if (statusCode === 204) {
    return []
  } else {
    let tags = (await body.json()) as Tag[]
    tags.sort((a, b) => a.name.localeCompare(b.name))
    return tags
  }
}

export async function getTag(tagId: string): Promise<Tag> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject(`tags/${tagId}`, token))

  if (statusCode === 200) {
    let tag: any = await body.json()
    return tag as Tag
  } else {
    throw new Error('Tag not found')
  }
}

export async function deleteTag(tagId: string): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode } = await executeDelete(getBaseRestApiObject(`tags/${tagId}`, token))
  return statusCode === 200
}

export async function createTag(tag: Tag): Promise<string> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject('tags', token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        tag,
      },
    },
  }

  const { body, statusCode } = await executePost(finalApiObject)
  if (statusCode === 200) {
    let response: any = await body.json()
    return response.id
  } else {
    throw new Error('Failed to create tag')
  }
}

export async function updateTag(tag: Tag): Promise<boolean> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const baseRestApiObject = getBaseRestApiObject(`tags/${tag.id}`, token)

  const finalApiObject = {
    ...baseRestApiObject,
    options: {
      ...baseRestApiObject.options,
      body: {
        tag,
      },
    },
  }

  const { statusCode } = await executePut(finalApiObject)
  return statusCode === 200
}

export async function getTagCount(): Promise<number> {
  const { token } = await getAuthToken()

  if (!token) {
    redirect('/login')
  }

  const { statusCode, body } = await executeGet(getBaseRestApiObject(`tags/count`, token))

  if (statusCode === 200) {
    return (await body.json()) as number
  } else {
    throw new Error('Failed to get tag count')
  }
}
