'use client'

import { Subheading, Text } from '@/components/catalyst/text'
import { CONSTANTS } from '@/lib/Constants'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { useUserContext } from '../auth/UserDataWrapper'

type UsageComponentProps = {
  mealCount: number
  tagCount: number
  notificationCount: number
}

export default function UsageComponent({ mealCount, tagCount, notificationCount }: UsageComponentProps) {
  const t = useTranslations('DashboardPage')
  const { isLoggedIn, mealLimit, notificationLimit, tagLimit, referralCount, referralCode } = useUserContext()

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <Subheading className="mt-8">{t('usage')}</Subheading>
      <div className="grid w-full sm:mt-4 sm:grid-cols-2 sm:gap-8">
        <UsageCard title={t('meals')} current={mealCount} limit={mealLimit} limitReached={t('limitReached')} />
        <UsageCard title={t('tags')} current={tagCount} limit={tagLimit} limitReached={t('limitReached')} />
        <UsageCard
          title={t('notifications')}
          current={notificationCount}
          limit={notificationLimit}
          limitReached={t('limitReached')}
        />
        <RefferalCard title={t('referrals')} current={referralCount} referralCode={referralCode} />
      </div>
    </div>
  )
}

function UsageCard({
  title,
  current,
  limit,
  limitReached,
}: {
  title: string
  current: number
  limit: number
  limitReached: string
}) {
  const percentage = Math.min((current / limit) * 100, 100)
  const isOverLimit = percentage >= 100

  return (
    <div className="rounded-lg p-6">
      <div className="flex items-center justify-between">
        <Text>{title}</Text>
        <Text className="dark:text-gray-400">
          {current} / {limit}
        </Text>
      </div>
      <div className="mt-4">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="absolute h-full rounded-full bg-teal-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {isOverLimit ? <span className="text-red-500">{limitReached}</span> : `${Math.round(percentage)}%`}
      </div>
    </div>
  )
}

function RefferalCard({
  title,
  current,
  referralCode,
}: {
  title: string
  current: number
  referralCode: string | null
}) {
  const t = useTranslations('DashboardPage')
  const percentage = Math.min((current / CONSTANTS.MAX_REFERRALS) * 100, 100)
  const referralsReached = current >= CONSTANTS.MAX_REFERRALS

  return (
    <div className="rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-base font-medium text-gray-900 dark:text-white">{title}</div>
          <div className="group relative">
            <InformationCircleIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
            <div className="absolute left-1/2 top-full z-10 mt-2 hidden w-72 -translate-x-1/2 rounded-lg bg-white p-4 text-base text-gray-500 shadow-lg group-hover:block dark:bg-gray-800 dark:text-gray-400">
              {t('referralCodeInfo')}
            </div>
          </div>
        </div>
        <Text className="text-gray-500 dark:text-gray-400">
          {current} / {CONSTANTS.MAX_REFERRALS}
        </Text>
      </div>
      <div className="mt-4">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="absolute h-full rounded-full bg-teal-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {referralsReached ? (
          <span className="text-green-500">{t('referralsReached')}</span>
        ) : (
          `${Math.round(percentage)}%`
        )}
      </div>
      <div className="mt-2 text-base font-normal">
        <span className="text-gray-500 dark:text-gray-400">{t('referralCode')}</span>
        {referralCode}
      </div>
    </div>
  )
}
