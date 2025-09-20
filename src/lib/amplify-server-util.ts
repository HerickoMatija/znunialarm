import outputs from '@/output.json'
import { createServerRunner } from '@aws-amplify/adapter-nextjs'
import { ResourcesConfig } from 'aws-amplify'

export const { runWithAmplifyServerContext } = createServerRunner({
  config: getAmplifyConfig(),
})

export function getAmplifyConfig(): ResourcesConfig {
  let flatOutputs = Object.values(outputs)[0]

  const amplifyConfig: ResourcesConfig = {
    Auth: {
      Cognito: {
        userPoolId: flatOutputs.cognitoUserPoolID,
        userPoolClientId: flatOutputs.cognitoUserPoolWebClientID,
      },
    },
    API: {
      REST: {
        [flatOutputs.restApiID]: {
          endpoint: flatOutputs.restApiURL,
          region: flatOutputs.region,
        },
      },
    },
  }

  return amplifyConfig
}
