import { Divider } from '@/components/catalyst/divider'
import { Link } from '@/components/catalyst/link'
import { Heading, Subheading } from '@/components/catalyst/text'
import UsageComponent from '@/components/yum-components/usage/UsageComponent'
import { getMealCount } from '@/lib/meal/meal-DAL'
import { getNotificationCount } from '@/lib/notifications/notification-DAL'
import { getTagCount } from '@/lib/tags/tag-DAL'
import { Cog8ToothIcon, EnvelopeIcon, PlusIcon, Square2StackIcon, TagIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

type Action = {
  titleId: string
  descriptionId: string
  href: string
  icon: React.ElementType
}

const actions: Action[] = [
  {
    titleId: 'random',
    descriptionId: 'randomDescription',
    href: '/random',
    icon: PlusIcon,
  },
  {
    titleId: 'meals',
    descriptionId: 'mealsDescription',
    href: '/meals',
    icon: Square2StackIcon,
  },
  {
    titleId: 'tags',
    descriptionId: 'tagsDescription',
    href: '/tags',
    icon: TagIcon,
  },
  {
    titleId: 'notifications',
    descriptionId: 'notificationsDescription',
    href: '/notifications',
    icon: EnvelopeIcon,
  },
  {
    titleId: 'settings',
    descriptionId: 'settingsDescription',
    href: '/settings',
    icon: Cog8ToothIcon,
  },
]

const getMessages = cache(async () => {
  return await getTranslations('DashboardPage')
})

const getMealCountCached = cache(async () => {
  return await getMealCount()
})

const getTagCountCached = cache(async () => {
  return await getTagCount()
})

const getNotificationCountCached = cache(async () => {
  return await getNotificationCount()
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function DashboardPage() {
  const t = await getMessages()
  const mealCount = await getMealCountCached()
  const tagCount = await getTagCountCached()
  const notificationCount = await getNotificationCountCached()

  return (
    <>
      <Heading className="my-8">{t('welcome')}</Heading>
      <Divider className="my-6 sm:my-10" />
      <UsageComponent mealCount={mealCount} tagCount={tagCount} notificationCount={notificationCount} />
      <Divider className="my-6 sm:my-10" />
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <ActionCard key={action.titleId} action={action} />
        ))}
      </div>
    </>
  )
}

async function ActionCard({ action }: { action: Action }) {
  const t = await getMessages()

  return (
    <div
      key={action.titleId}
      className={clsx(
        'rounded-lg shadow-sm dark:shadow-gray-700/10',
        'group relative p-6 transition-all duration-200',
        'hover:shadow-md dark:hover:shadow-gray-700/30',
        'focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500'
      )}
    >
      <div>
        <span className="inline-flex rounded-lg bg-teal-50 p-3 text-teal-400 dark:bg-opacity-20">
          <action.icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-8">
        <Subheading className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          <Link href={action.href} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {t(action.titleId)}
          </Link>
        </Subheading>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{t(action.descriptionId)}</p>
      </div>
      <span
        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400 dark:text-gray-600 dark:group-hover:text-gray-500"
        aria-hidden="true"
      >
        <svg className="h-6 w-6 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </div>
  )
}
