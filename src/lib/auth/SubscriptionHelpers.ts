import { CUSTOM_ATTRIBUTES, SUBSCRIPTION_PLAN } from '@/lib/Constants'
import { JwtPayload } from '@aws-amplify/core/internals/utils'

export function isUserSubscribed(userAttributes: JwtPayload | null | undefined): boolean {
  if (!userAttributes) {
    return false
  }
  if (!userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIBED]) {
    return false
  }
  return userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIBED] === 'true'
}

export function getUserMealsLimit(userAttributes: JwtPayload | null | undefined): number {
  if (!userAttributes || !userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIPTION_PLAN]) {
    return 0
  }

  switch (userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIPTION_PLAN]) {
    case SUBSCRIPTION_PLAN.BASIC.value:
      return SUBSCRIPTION_PLAN.BASIC.MEAL_LIMIT
    case SUBSCRIPTION_PLAN.STANDARD.value:
      return SUBSCRIPTION_PLAN.STANDARD.MEAL_LIMIT
    case SUBSCRIPTION_PLAN.PRO.value:
      return SUBSCRIPTION_PLAN.PRO.MEAL_LIMIT
    default:
      return 0
  }
}

export function getUserNotificationsLimit(userAttributes: JwtPayload | null | undefined): number {
  if (!userAttributes || !userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIPTION_PLAN]) {
    return 0
  }

  switch (userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIPTION_PLAN]) {
    case SUBSCRIPTION_PLAN.BASIC.value:
      return SUBSCRIPTION_PLAN.BASIC.NOTIFICAITON_LIMIT
    case SUBSCRIPTION_PLAN.STANDARD.value:
      return SUBSCRIPTION_PLAN.STANDARD.NOTIFICAITON_LIMIT
    case SUBSCRIPTION_PLAN.PRO.value:
      return SUBSCRIPTION_PLAN.PRO.NOTIFICAITON_LIMIT
    default:
      return 0
  }
}

export function getUserTagLimit(userAttributes: JwtPayload | null | undefined): number {
  if (!userAttributes || !userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIPTION_PLAN]) {
    return 0
  }

  switch (userAttributes[CUSTOM_ATTRIBUTES.SUBSCRIPTION_PLAN]) {
    case SUBSCRIPTION_PLAN.BASIC.value:
      return SUBSCRIPTION_PLAN.BASIC.TAG_LIMIT
    case SUBSCRIPTION_PLAN.STANDARD.value:
      return SUBSCRIPTION_PLAN.STANDARD.TAG_LIMIT
    case SUBSCRIPTION_PLAN.PRO.value:
      return SUBSCRIPTION_PLAN.PRO.TAG_LIMIT
    default:
      return 0
  }
}

export function getReferralCount(userAttributes: JwtPayload | null | undefined): number {
  if (!userAttributes || !userAttributes[CUSTOM_ATTRIBUTES.REFERRAL_COUNT]) {
    return 0
  } else {
    return parseInt(userAttributes[CUSTOM_ATTRIBUTES.REFERRAL_COUNT] as string)
  }
}

export function getReferralCode(userAttributes: JwtPayload | null | undefined): string {
  if (!userAttributes || !userAttributes[CUSTOM_ATTRIBUTES.REFERRAL_CODE]) {
    return ''
  } else {
    return userAttributes[CUSTOM_ATTRIBUTES.REFERRAL_CODE] as string
  }
}
