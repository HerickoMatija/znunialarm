import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import LoginComponent from './LoginComponent'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('LoginPage')

  return {
    title: t('title'),
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const origin = (await searchParams).origin as string

  return (
    <div className="mx-auto max-w-7xl py-16">
      <LoginComponent origin={origin} />
    </div>
  )
}
