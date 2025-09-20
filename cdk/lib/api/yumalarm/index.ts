/*****************************
 * Imports *
 ****************************/
import {
  APIGatewayEvent,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
  Context,
} from 'aws-lambda'
import { getHeaders } from '../../common/common'
import globals from '../../common/globals'
import { handleMealRequest } from './meal/mealRequestHandler'
import { handleNotificationRequest } from './notification/notificationRequestHandler'
import { handleTagRequest } from './tag/tagRequestHandler'

/****************************
 * Handler *
 ****************************/
exports.handler = async (event: APIGatewayEvent, context: Context) => {
  globals.initialize()

  let body
  let statusCode = 200
  const headers = getHeaders()

  const httpMethod: string = event.httpMethod
  const resourcePath: string = event.resource
  const pathParameters: APIGatewayProxyEventPathParameters = event.pathParameters || {}
  const queryParameters: APIGatewayProxyEventQueryStringParameters = event.queryStringParameters || {}
  const sub: string = event.requestContext?.authorizer?.claims?.sub
  const requestBody = event.body ? JSON.parse(event.body) : {}

  globals.logger.info('Received request', {
    httpMethod,
    resourcePath,
    pathParameters,
    queryParameters,
    requestBody,
    sub,
  })

  try {
    if (resourcePath.startsWith('/meals')) {
      body = await handleMealRequest(resourcePath, httpMethod, pathParameters, queryParameters, requestBody, sub)
    } else if (resourcePath.startsWith('/tags')) {
      body = await handleTagRequest(resourcePath, httpMethod, pathParameters, queryParameters, requestBody, sub)
    } else if (resourcePath.startsWith('/notifications')) {
      body = await handleNotificationRequest(
        resourcePath,
        httpMethod,
        pathParameters,
        queryParameters,
        requestBody,
        sub
      )
    } else {
      throw new Error(`Unsupported resource path: "${resourcePath}"`)
    }
  } catch (err: any) {
    globals.logger.error('There was an internal error while processing the meals lambda', {
      error_message: err.message,
      error_stack: err.stack,
    })

    if (err.name === 'PermissionDeniedException') {
      statusCode = 401
    } else if (err.name === 'BackendError') {
      statusCode = 500
    } else if (err.name === 'NoContentException') {
      statusCode = 204
    } else {
      statusCode = 400
    }
    body = {
      errorMessage: err.message,
      errorType: err.name,
    }
  } finally {
    body = JSON.stringify(body)
  }

  return {
    statusCode,
    body,
    headers,
  }
}
