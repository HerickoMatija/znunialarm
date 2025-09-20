import * as cdk from 'aws-cdk-lib'
import { CUSTOM_ATTRIBUTES, SUBSCRIPTION_PLAN } from '../../src/lib/Constants'
import { CDKContext } from '../cdk.context'
import { createRestAPI } from './api/rest'
import { createYumalarmUserpool } from './auth/auth'
import { createBackupRule, createFeedbackTable, createLandingTable, createRecipesTable, createYumAlarmTable } from './database/database'
import { createEmailLambda } from './functions/emailLambda/lambda'
import { createStripeWebhook } from './functions/stripeWebhook/lambda'

export class ZnunialarmStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: cdk.StackProps, context: CDKContext) {
    super(scope, id, props)

    const environment = {
      appName: context.appName,
      stage: context.stage,
      region: context.env.region,
    }
    const propertyKeys = {
      stripeSecret: `stripe-secret-${context.stage}`,
      stripeWebhookSecret: `stripe-webhook-secret-${context.stage}`,
      stripeDiscountCouponId: `stripe-discount-coupon-id-${context.stage}`,
      stripeProductCodeBasic: `stripe-product-code-basic-${context.stage}`,
      stripeProductCodeStandard: `stripe-product-code-standard-${context.stage}`,
      stripeProductCodePro: `stripe-product-code-pro-${context.stage}`,
      stripeCustomAttributeYumId: `stripe-custom-attribute-yum-id-${context.stage}`,
    }
    const subscriptions = {
      basicPlanValue: SUBSCRIPTION_PLAN.BASIC.value,
      standardPlanValue: SUBSCRIPTION_PLAN.STANDARD.value,
      proPlanValue: SUBSCRIPTION_PLAN.PRO.value,
    }
    const customAttributes = {
      subscribed: CUSTOM_ATTRIBUTES.SUBSCRIBED,
      subscriptionPlan: CUSTOM_ATTRIBUTES.SUBSCRIPTION_PLAN,
      referrals: CUSTOM_ATTRIBUTES.REFERRAL_COUNT,
      referralCode: CUSTOM_ATTRIBUTES.REFERRAL_CODE,
      stripeCustomerId: CUSTOM_ATTRIBUTES.STRIPE_CUSTOMER_ID,
    }

    const feedbackDB = createFeedbackTable(this, { environment })
    const landingDB = createLandingTable(this, { environment })
    const yumalarmDB = createYumAlarmTable(this, { environment })
    const recipeDB = createRecipesTable(this, { environment })

    createBackupRule(
      this,
      {
        environment,
      },
      [feedbackDB, landingDB, yumalarmDB, recipeDB]
    )

    const cognito = createYumalarmUserpool(this, { environment })

    const restAPI = createRestAPI(this, {
      environment,
      yumalarmDB,
      feedbackDB,
      landingDB,
      userPoolId: cognito.userPool.userPoolId,
      userPoolArn: cognito.userPool.userPoolArn,
      propertyKeys,
      customAttributes,
    })

    const stripeWebhook = createStripeWebhook(this, {
      environment,
      userPoolId: cognito.userPool.userPoolId,
      userPoolArn: cognito.userPool.userPoolArn,
      propertyKeys,
      customAttributes,
      subscriptions,
    })

    createEmailLambda(this, {
      environment,
      userPoolId: cognito.userPool.userPoolId,
      userPoolArn: cognito.userPool.userPoolArn,
      customAttributeSubscribed: CUSTOM_ATTRIBUTES.SUBSCRIBED,
      yumalarmTable: yumalarmDB,
    })

    new cdk.CfnOutput(this, 'region', {
      value: this.region,
    })

    new cdk.CfnOutput(this, 'cognitoUserPoolID', {
      value: cognito.userPool.userPoolId,
    })
    new cdk.CfnOutput(this, 'cognitoUserPoolWebClientID', {
      value: cognito.userPoolClient.userPoolClientId,
    })
    new cdk.CfnOutput(this, 'cognitoIdentityPoolID', {
      value: cognito.identityPool.identityPoolId,
    })

    new cdk.CfnOutput(this, 'appsyncAuthenticationType', {
      value: 'userPool',
    })

    new cdk.CfnOutput(this, 'lambdaStripeWebhookURL', {
      value: stripeWebhook.stripeWebhookURL.url,
    })

    new cdk.CfnOutput(this, 'restApiURL', {
      value: restAPI.url,
    })

    new cdk.CfnOutput(this, 'restApiID', {
      value: restAPI.restApiId,
    })
  }
}
