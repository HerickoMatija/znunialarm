import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

const getMessages = cache(async () => {
  return await getTranslations('SuccessPage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; edit?: boolean }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const t = await getMessages()
  const { signup, update } = await searchParams

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
          <div className="rounded-full bg-green-200 p-2 dark:bg-green-800/30">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          {t('title')}
        </h1>

        <div className="mt-8 max-w-xl">
          {isValidString(signup) && (
            <p className="text-lg leading-7 text-zinc-600 dark:text-zinc-400">{t('signupMessage')}</p>
          )}
          {isValidString(update) && (
            <p className="text-lg leading-7 text-zinc-600 dark:text-zinc-400">{t('updateMessage')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function isValidString(param: any): boolean {
  return typeof param === 'string'
}
