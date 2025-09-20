import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const t = await getTranslations('LoadingPage')

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="flex min-h-[250px] flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600" />
          <div className="text-gray-600">{t('loading')}</div>
        </div>
      </div>
    </div>
  )
}
