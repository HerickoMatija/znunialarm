import { IdentityPool, UserPoolAuthenticationProvider } from '@aws-cdk/aws-cognito-identitypool-alpha'
import { RemovalPolicy } from 'aws-cdk-lib'
import * as awsCognito from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'
import { stageNameContext } from '../../cdk.context'

type createYumalarmUserpool = {
  environment: {
    appName: string
    stage: stageNameContext
  }
}

export function createYumalarmUserpool(scope: Construct, props: createYumalarmUserpool) {
  const userPool = new awsCognito.UserPool(scope, `${props.environment.appName}_${props.environment.stage}_userpool`, {
    userPoolName: `${props.environment.appName}_${props.environment.stage}_userpool`,
    removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
    passwordPolicy: {
      minLength: 8,
    },
    selfSignUpEnabled: true,
    accountRecovery: awsCognito.AccountRecovery.EMAIL_ONLY,
    signInAliases: {
      email: true,
    },
    signInCaseSensitive: false,
    standardAttributes: {
      email: {
        required: true,
        mutable: true,
      },
    },
  })

  const userPoolClient = new awsCognito.UserPoolClient(
    scope,
    `${props.environment.appName}_${props.environment.stage}_userpoolClient`,
    { userPool }
  )

  const identityPool = new IdentityPool(scope, `${props.environment.appName}_${props.environment.stage}_identityPool`, {
    identityPoolName: `${props.environment.appName}-${props.environment.stage}IdentityPool`,
    allowUnauthenticatedIdentities: false,
    authenticationProviders: {
      userPools: [
        new UserPoolAuthenticationProvider({
          userPool: userPool,
          userPoolClient: userPoolClient,
        }),
      ],
    },
  })

  return { userPool, userPoolClient, identityPool }
}
