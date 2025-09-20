'use client'

import { Divider } from '@/components/catalyst/divider'
import { Heading, Subheading, TextSecondary } from '@/components/catalyst/text'
import { ACTION_ERROR, ACTION_OK } from '@/lib/Constants'
import { getRandomMealServerAction } from '@/lib/random/ServerActions'
import { Notification, ServerActionResponse, Tag } from '@/types'
import { SparklesIcon, TagIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'react-toastify'
import RandomMealFormTag from './RandomMealFormTag'

type ShowType = 'TAG' | 'NOTIFICATION' | 'NONE'

export type MealsPerGroup = {
  mealGroups: MealGroup[]
}

export type MealGroup = {
  name: string
  linkToGroup: string
  meals: MealResult[]
}

export type MealResult = {
  name: string
  linkToMeal: string
}

export default function RandomMealComponent({ tags, notifications }: { tags: Tag[]; notifications: Notification[] }) {
  const t = useTranslations('RandomPage')
  const [show, setShow] = useState<ShowType>('NONE')
  const [mealsPerGroup, setMealsPerGroup] = useState<MealsPerGroup>({ mealGroups: [] })
  const [noResultMessage, setNoResultMessage] = useState<string>('')

  const handleResponse = (response: ServerActionResponse) => {
    if (response?.result === ACTION_OK) {
      if (response.data?.message === 'No meals found') {
        setNoResultMessage(t('noMealsFound'))
      } else {
        let mealsPerGroup = [
          {
            name: '',
            linkToGroup: '',
            meals: [
              {
                name: response.data?.meal?.name ?? '',
                linkToMeal: response.data?.meal?.id ?? '',
              },
            ],
          },
        ]
        setMealsPerGroup({ mealGroups: mealsPerGroup })
      }
    } else if (response?.result === ACTION_ERROR) {
      toast.error(t('error'))
    }
  }

  const resetFields = () => {
    setMealsPerGroup({ mealGroups: [] })
    setNoResultMessage('')
  }

  return (
    <>
      <div className="mt-4 grid gap-8 md:grid-cols-3">
        <RandomCard
          header={t('randomHeader')}
          description={t('randomDescription')}
          Icon={SparklesIcon}
          iconForeground="text-teal-600"
          iconBackground="bg-teal-50"
          onClickHandler={async () => {
            resetFields()
            let response = await getRandomMealServerAction()
            handleResponse(response)
            setShow('NONE')
          }}
        />
        <RandomCard
          header={t('tagRandomHeader')}
          description={t('tagRandomDescription')}
          Icon={TagIcon}
          iconForeground="text-teal-600"
          iconBackground="bg-teal-50"
          selected={show === 'TAG'}
          onClickHandler={() => {
            resetFields()
            setShow('TAG')
          }}
        />
        {/*
        <RandomCard
          header="Random from Notification"
          description="Get a random meal selection as configured in your notification"
          Icon={EnvelopeIcon}
          iconForeground="text-teal-600"
          iconBackground="bg-teal-50"
          onClickHandler={() => {
            setShow('NOTIFICATION')
            setMealName('')
          }}
        />
        */}
      </div>

      <Divider className="my-6 sm:my-10" />

      {show === 'TAG' && (
        <RandomMealFormTag tags={tags} setMealsPerGroup={setMealsPerGroup} setNoResultMessage={setNoResultMessage} />
      )}

      {/* show === 'NOTIFICATION' && <RandomMealFormNotificaiton notifications={notifications} /> */}

      {noResultMessage && (
        <div className="flex min-h-[250px] items-center justify-center space-y-3 text-center">
          <Heading className="text-teal-500 dark:text-teal-400">{noResultMessage}</Heading>
        </div>
      )}

      {mealsPerGroup.mealGroups.map((mealGroup) => (
        <div key={mealGroup.name} className="flex min-h-[250px] items-center justify-center space-y-3 text-center">
          <Heading className="text-teal-500 dark:text-teal-400">{mealGroup.name}</Heading>
          <ul>
            {mealGroup.meals.map((meal) => (
              <li key={meal.name} className="rounded-lg border-2 border-teal-500 p-8 shadow-lg">
                <a href={meal.linkToMeal}>{meal.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

type RandomCardProps = {
  header: string
  description: string
  Icon: React.ElementType
  iconForeground: string
  iconBackground: string
  onClickHandler: () => void
  selected?: boolean
}

function RandomCard({
  header,
  description,
  Icon,
  iconForeground,
  iconBackground,
  onClickHandler,
  selected = false,
}: RandomCardProps) {
  return (
    <div
      key={header}
      className={clsx(
        'rounded-lg border-2',
        'group relative p-6 transition-all duration-200',
        'hover:border-teal-500 hover:shadow-md dark:hover:shadow-gray-700/30',
        'focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500',
        'cursor-pointer',
        selected
          ? 'border-teal-500 shadow-md dark:shadow-teal-700/30'
          : 'border-zinc-300 shadow-sm dark:border-zinc-700/80'
      )}
      onClick={onClickHandler}
    >
      <div className="sm:mt-8">
        <Subheading>{header}</Subheading>
        <TextSecondary>{description}</TextSecondary>
      </div>
      <span
        className="pointer-events-none absolute right-2 top-2 text-gray-300 group-hover:text-gray-400 sm:right-6 sm:top-6 dark:text-gray-600 dark:group-hover:text-gray-500"
        aria-hidden="true"
      >
        <span className={clsx(iconBackground, iconForeground, 'inline-flex rounded-lg p-3', 'dark:bg-opacity-20')}>
          <Icon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />
        </span>
      </span>
    </div>
  )
}
