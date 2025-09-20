import { RemovalPolicy } from 'aws-cdk-lib'
import { AuthorizationType, CfnAuthorizer, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'
import { Construct } from 'constructs'
import { stageNameContext } from '../../../cdk.context'
import path = require('path')

type createYumAlarmEndpointsProps = {
  environment: {
    appName: string
    stage: stageNameContext
    region: string
  }
}

export const createYumAlarmEndpoints = (
  scope: Construct,
  restApi: RestApi,
  authorizer: CfnAuthorizer,
  yumalarmDB: Table,
  props: createYumAlarmEndpointsProps
) => {
  const yumalarmHandler = new NodejsFunction(
    scope,
    `${props.environment.appName}_${props.environment.stage}_yumalarmLambda`,
    {
      projectRoot: path.resolve(__dirname),
      depsLockFilePath: path.resolve(__dirname, './package-lock.json'),
      functionName: `${props.environment.appName}_${props.environment.stage}_yumalarmLambda`,
      entry: path.resolve(__dirname, './index.js'),
      runtime: Runtime.NODEJS_20_X,
      logGroup: createLogGroupForLambda(scope, props, 'yumalarmLambda'),
      environment: {
        REGION: props.environment.region,
        YUMALARM_TABLE_NAME: yumalarmDB.tableName,
      },
    }
  )

  yumalarmDB.grantReadWriteData(yumalarmHandler)

  addMealEndpoints(restApi, yumalarmHandler, authorizer)
  addNotificationEndpoints(restApi, yumalarmHandler, authorizer)
  addTagEndpoints(restApi, yumalarmHandler, authorizer)
}

function addMealEndpoints(restApi: RestApi, yumalarmHandler: NodejsFunction, authorizer: CfnAuthorizer) {
  const mealsResource = restApi.root.addResource('meals')
  mealsResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  mealsResource.addMethod('POST', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })

  const randomMealResource = mealsResource.addResource('random')
  randomMealResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })

  const countMealResource = mealsResource.addResource('count')
  countMealResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })

  const mealIdResource = mealsResource.addResource('{mealId}')
  mealIdResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  mealIdResource.addMethod('PUT', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  mealIdResource.addMethod('DELETE', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
}

function addTagEndpoints(restApi: RestApi, yumalarmHandler: NodejsFunction, authorizer: CfnAuthorizer) {
  const tagsResource = restApi.root.addResource('tags')
  tagsResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  tagsResource.addMethod('POST', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })

  const countTagsResource = tagsResource.addResource('count')
  countTagsResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })

  const tagIdResource = tagsResource.addResource('{tagId}')
  tagIdResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  tagIdResource.addMethod('PUT', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  tagIdResource.addMethod('DELETE', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
}

function addNotificationEndpoints(restApi: RestApi, yumalarmHandler: NodejsFunction, authorizer: CfnAuthorizer) {
  const notificationsResource = restApi.root.addResource('notifications')
  notificationsResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  notificationsResource.addMethod('POST', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })

  const countNotificationsResource = notificationsResource.addResource('count')
  countNotificationsResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })

  const notificationIdResource = notificationsResource.addResource('{notificationId}')
  notificationIdResource.addMethod('GET', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  notificationIdResource.addMethod('PUT', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
  notificationIdResource.addMethod('DELETE', new LambdaIntegration(yumalarmHandler), {
    authorizationType: AuthorizationType.COGNITO,
    authorizer: { authorizerId: authorizer.ref },
  })
}

function createLogGroupForLambda(scope: Construct, props: createYumAlarmEndpointsProps, lambdaName: string) {
  return new LogGroup(scope, `${props.environment.appName}_${props.environment.stage}_${lambdaName}LogGroup`, {
    logGroupName: `/aws/lambda/${props.environment.appName}_${props.environment.stage}_${lambdaName}`,
    retention: props.environment.stage === 'prod' ? RetentionDays.ONE_YEAR : RetentionDays.ONE_MONTH,
    removalPolicy: props.environment.stage === 'prod' ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
  })
}
