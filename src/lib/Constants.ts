export const CONSTANTS = {
  LIST_PAGE_SIZE: 10,
  MAX_REFERRALS: 5,
}

export const SUBSCRIPTION_PLAN = {
  BASIC: {
    value: 'Basic',
    MEAL_LIMIT: 50,
    TAG_LIMIT: 10,
    NOTIFICAITON_LIMIT: 5,
    PRICE_PER_MONTH: 2.99,
    DISCOUNTED_PRICE_PER_MONTH: 2.39,
  },
  STANDARD: {
    value: 'Standard',
    MEAL_LIMIT: 500,
    TAG_LIMIT: 50,
    NOTIFICAITON_LIMIT: 15,
    PRICE_PER_MONTH: 4.99,
    DISCOUNTED_PRICE_PER_MONTH: 3.99,
  },
  PRO: {
    value: 'Pro',
    MEAL_LIMIT: Infinity,
    TAG_LIMIT: Infinity,
    NOTIFICAITON_LIMIT: 100,
    PRICE_PER_MONTH: 9.99,
    DISCOUNTED_PRICE_PER_MONTH: 7.99,
  },
}

export const CUSTOM_ATTRIBUTES = {
  SUBSCRIBED: 'custom:subscribed',
  SUBSCRIPTION_PLAN: 'custom:subscriptionPlan',
  REFERRAL_COUNT: 'custom:referralCount',
  REFERRAL_CODE: 'custom:referralCode',
  STRIPE_CUSTOMER_ID: 'custom:stripeCustomerId',
}

export const COOKIES = {
  LANGUAGE: 'yumalarm-lang',
  DISABLE_TOUR_MODAL: 'yumalarm-disable-tour-modal',
}

export const LANGUAGE_EN = 'en'
export const LANGUAGE_SL = 'sl'
export const LANGUAGE_DE = 'de'

export const TOUR_STEPS_CLASSES = {
  STEP_1: { className: 'tour-step-1', selector: '.tour-step-1' },
  STEP_2: { className: 'tour-step-2', selector: '.tour-step-2' },
  STEP_3: { className: 'tour-step-3', selector: '.tour-step-3' },
  STEP_4: { className: 'tour-step-4', selector: '.tour-step-4' },
}

export const ACTION_OK = 'Success'
export const ACTION_ERROR = 'Error'
export const ACTION_VALIDATION_ERROR = 'Validation Error'
