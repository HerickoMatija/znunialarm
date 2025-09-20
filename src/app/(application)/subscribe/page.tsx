import { Button } from '@/components/catalyst/button'
import { SUBSCRIPTION_PLAN } from '@/lib/Constants'
import clsx from 'clsx'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'
import PriceComponent from './PriceComponent'

const getMessages = cache(async () => {
  return await getTranslations('SubscribePage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function SubscribePage() {
  return <Pricing />
}

function SwirlyDoodle({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 281 40" className={className} preserveAspectRatio="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" className={clsx('h-6 w-6 flex-none fill-current stroke-current', className)}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle cx={12} cy={12} r={8.25} fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type PlanProps = {
  name: string
  price: number
  discountedPrice: number
  mealsLimit: number
  categoryLimit: number
  notificationLimit: number
  featured?: boolean
  paymentLink: string
}

async function Plan({
  name,
  price,
  discountedPrice,
  mealsLimit,
  categoryLimit,
  notificationLimit,
  featured = false,
  paymentLink,
}: PlanProps) {
  let t = await getMessages()

  return (
    <section
      className={clsx(
        'flex flex-col rounded-3xl px-6 sm:px-8',
        featured ? 'order-first bg-teal-500/20 py-8 lg:order-none dark:bg-teal-500/20' : 'ring-1 ring-teal-400 lg:py-8'
      )}
    >
      <h3 className={clsx('font-display mt-5 text-lg font-extrabold dark:text-white')}>
        {name} {t('plan')}
      </h3>
      <PriceComponent
        perMonthText={t('perMonth')}
        withReferralDiscountText={t('withReferralDiscount')}
        featured={featured}
        price={price}
        discountedPrice={discountedPrice}
      />
      <ul className={clsx('order-last mt-10 flex flex-col gap-y-3 text-sm dark:text-white')}>
        <li className="flex">
          <CheckIcon className="dark:text-white" />
          <span className="ml-4">{t('trial')}</span>
        </li>
        <li className="flex">
          <CheckIcon className="dark:text-white" />
          <span className={clsx('ml-4 dark:text-white')}>
            {mealsLimit !== Infinity ? mealsLimit : t('Unlimited')} {t('mealAmount')}
          </span>
        </li>
        <li className="flex">
          <CheckIcon className="dark:text-white" />
          <span className={clsx('ml-4 dark:text-white')}>
            {categoryLimit !== Infinity ? categoryLimit : t('Unlimited')} {t('tagAmount')}
          </span>
        </li>
        <li className="flex">
          <CheckIcon className="dark:text-white" />
          <span className={clsx('ml-4 dark:text-white')}>
            {notificationLimit} {t('notificationAmount')}
          </span>
        </li>
        <li className="flex">
          <CheckIcon className="dark:text-white" />
          <span className={clsx('ml-4 dark:text-white')}>{t('mealGeneration')}</span>
        </li>
      </ul>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button color="teal" href={paymentLink}>
          {t('cta')}
        </Button>
      </div>
    </section>
  )
}

async function Pricing() {
  let t = await getMessages()

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="md:text-center">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          <span className="relative whitespace-nowrap">
            <SwirlyDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-teal-400" />
            <span className="relative">{t('heading1')}</span>
          </span>{' '}
          {t('heading2')}
        </h2>
      </div>
      <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
        <Plan
          name={SUBSCRIPTION_PLAN.BASIC.value}
          price={SUBSCRIPTION_PLAN.BASIC.PRICE_PER_MONTH}
          discountedPrice={SUBSCRIPTION_PLAN.BASIC.DISCOUNTED_PRICE_PER_MONTH}
          mealsLimit={SUBSCRIPTION_PLAN.BASIC.MEAL_LIMIT}
          categoryLimit={SUBSCRIPTION_PLAN.BASIC.TAG_LIMIT}
          notificationLimit={SUBSCRIPTION_PLAN.BASIC.NOTIFICAITON_LIMIT}
          paymentLink={process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PAYMENT_LINK_BASIC!}
        />
        <Plan
          featured
          name={SUBSCRIPTION_PLAN.STANDARD.value}
          price={SUBSCRIPTION_PLAN.STANDARD.PRICE_PER_MONTH}
          discountedPrice={SUBSCRIPTION_PLAN.STANDARD.DISCOUNTED_PRICE_PER_MONTH}
          mealsLimit={SUBSCRIPTION_PLAN.STANDARD.MEAL_LIMIT}
          categoryLimit={SUBSCRIPTION_PLAN.STANDARD.TAG_LIMIT}
          notificationLimit={SUBSCRIPTION_PLAN.STANDARD.NOTIFICAITON_LIMIT}
          paymentLink={process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PAYMENT_LINK_STANDARD!}
        />
        <Plan
          name={SUBSCRIPTION_PLAN.PRO.value}
          price={SUBSCRIPTION_PLAN.PRO.PRICE_PER_MONTH}
          discountedPrice={SUBSCRIPTION_PLAN.PRO.DISCOUNTED_PRICE_PER_MONTH}
          mealsLimit={SUBSCRIPTION_PLAN.PRO.MEAL_LIMIT}
          categoryLimit={SUBSCRIPTION_PLAN.PRO.TAG_LIMIT}
          notificationLimit={SUBSCRIPTION_PLAN.PRO.NOTIFICAITON_LIMIT}
          paymentLink={process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PAYMENT_LINK_PRO!}
        />
      </div>
    </div>
  )
}
