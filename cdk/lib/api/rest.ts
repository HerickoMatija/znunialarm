import { RemovalPolicy } from 'aws-cdk-lib'
import { AuthorizationType, CfnAuthorizer, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { Construct } from 'constructs'
import { stageNameContext } from '../../cdk.context'
import { createYumAlarmEndpoints } from './yumalarm/endpoints'

type RestAPIProps = {
  environment: {
    appName: string
    stage: stageNameContext
    region: string
  }
  yumalarmDB: Table
  userPoolId: string
  userPoolArn: string
}

export function createRestAPI(scope: Construct, props: RestAPIProps) {
  const api = new RestApi(scope, `${props.environment.appName}_${props.environment.stage}_restApi`, {
    restApiName: `${props.environment.appName}_${props.environment.stage}_restApi`,
    deployOptions: {
      stageName: `${props.environment.stage}`,
    },
    defaultCorsPreflightOptions: {
      allowOrigins: [
        'http://localhost:3000',
        'https://localhost:3000',
        'https://yumalarm.com',
        'https://www.yumalarm.com',
        `https://${props.environment.stage}.yumalarm.com`,
        `https://www.${props.environment.stage}.yumalarm.com`,
      ],
      allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
    },
  })

  const authorizer = new CfnAuthorizer(
    scope,
    `${props.environment.appName}_${props.environment.stage}_restAPIAuthorizer`,
    {
      name: `${props.environment.appName}_${props.environment.stage}_restAPIAuthorizer`,
      type: AuthorizationType.COGNITO,
      identitySource: 'method.request.header.Authorization',
      providerArns: [props.userPoolArn],
      restApiId: api.restApiId,
    }
  )

  authorizer.applyRemovalPolicy(props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY)

  // Add all the endpoints
  createYumAlarmEndpoints(scope, api, authorizer, props.yumalarmDB, {
    environment: props.environment,
  })

  return api
}
