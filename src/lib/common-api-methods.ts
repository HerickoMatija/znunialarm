import { runWithAmplifyServerContext } from '@/lib/amplify-server-util'
import outputs from '@/output.json'
import { del, get, post, put } from 'aws-amplify/api/server'
import { cookies } from 'next/headers'

export function getRestApiId(): string {
  let flatOutputs = Object.values(outputs)[0]
  return flatOutputs.restApiID
}

export function getBaseRestApiObject(path: string, token: string) {
  return {
    apiName: getRestApiId(),
    path: path,
    options: {
      headers: {
        Authorization: token.toString(),
      },
    },
  }
}

export const executeGet = async (getInput: any) => {
  const restOperation = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => get(contextSpec, getInput),
  })
  return await restOperation.response
}

export const executeDelete = async (deleteInput: any) => {
  const restOperation = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => del(contextSpec, deleteInput),
  })
  return await restOperation.response
}

export const executePut = async (putInput: any) => {
  const restOperation = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => put(contextSpec, putInput),
  })
  return await restOperation.response
}

export const executePost = async (postInput: any) => {
  const restOperation = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => post(contextSpec, postInput),
  })
  return await restOperation.response
}
