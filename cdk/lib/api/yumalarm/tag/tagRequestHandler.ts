import { APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'
import { Tag } from '../../..'
import globals from '../../../common/globals'
import { createTag, deleteTag, getTag, getTagsCountByUser, getTagsForUser, updateTag } from './DB-tag'

export async function handleTagRequest(
  resourcePath: string,
  httpMethod: string,
  pathParameters: APIGatewayProxyEventPathParameters,
  queryParameters: APIGatewayProxyEventQueryStringParameters,
  requestBody: any,
  sub: string
) {
  if (resourcePath === '/tags/count') {
    return await getTagsCountByUser(sub)
  } else if (resourcePath === '/tags') {
    if (httpMethod === 'GET') {
      return await getTagsForUser(sub)
    } else if (httpMethod === 'POST') {
      const tagCreateRequest: Tag = requestBody.tag
      return await handleCreateTag(tagCreateRequest, sub)
    }
  } else if (resourcePath === '/tags/{tagId}') {
    const tagId = pathParameters!.tagId!
    if (httpMethod === 'GET') {
      return await getTag(tagId, sub)
    } else if (httpMethod === 'PUT') {
      const tag: Tag = requestBody.tag
      return await updateTag(tag)
    } else if (httpMethod === 'DELETE') {
      return await deleteTag(tagId)
    }
  }

  throw new Error(`Unsupported resource path: "${resourcePath}"`)
}

async function handleCreateTag(tag: Tag, sub: string): Promise<{ id: string }> {
  globals.logger.debug('Creating tag', { tag, sub })

  const newTagId = await createTag(tag, sub)

  return { id: newTagId }
}
