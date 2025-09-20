import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar'
import { Sidebar, SidebarBody, SidebarItem, SidebarSection } from '@/components/catalyst/sidebar'
import { StackedLayout } from '@/components/catalyst/stacked-layout'
import { HeroText, TextSecondary } from '@/components/catalyst/text'
import LanguageDropdown from '@/components/yum-components/language/LanguageDropdown'
import EmailFormComponent from '@/lib/landing/EmailFormComponent'
import { getLocale, getTranslations } from 'next-intl/server'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'
import { cache } from 'react'

const getMessages = cache(async () => {
  return await getTranslations('LandingPage')
})

export default async function LandingPage() {
  const t = await getMessages()

  return (
    <StackedLayout
      isLandingPage={true}
      navbar={
        <Navbar className="px-10 py-6">
          <Link href="/" aria-label="Home">
            <NavbarLabel className="text-2xl font-extrabold text-teal-500">YumAlarm</NavbarLabel>
          </Link>
          <NavbarSpacer />
          <NavbarSection className="max-lg:hidden">
            <NavbarItem
              href="/login"
              aria-label="Search"
              className="text-md block rounded-lg text-center text-black focus-visible:outline-teal-500"
            >
              {t('Login')}
            </NavbarItem>

            <Button href="#cta" color="teal">
              {t('CTA.button')}
            </Button>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                href="/login"
                aria-label="Search"
                className="text-md block rounded-lg text-center text-black focus-visible:outline-teal-500"
              >
                {t('Login')}
              </SidebarItem>

              <Button href="#cta" color="teal">
                {t('CTA.button')}
              </Button>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <LandingPageHero />
      <div className="my-4 w-full px-6 lg:hidden">
        <Divider />
      </div>
      <LandingFeature1 />
      <div className="my-4 w-full px-6 lg:hidden">
        <Divider />
      </div>
      <LandingFeature2 />
      <div className="my-4 w-full px-6 lg:hidden">
        <Divider />
      </div>
      <Introduction />
      <div className="my-4 w-full px-6 lg:hidden">
        <Divider />
      </div>
      <LandingCTA />
      <div className="my-4 w-full px-6 lg:hidden">
        <Divider />
      </div>
      <LandingFooter />
    </StackedLayout>
  )
}

async function LandingPageHero() {
  const t = await getMessages()

  return (
    <section className="flex min-h-screen items-center px-6 py-24 md:px-24 lg:py-48">
      <div className="mx-auto grid h-full w-full items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div className="space-y-8 text-left">
          <HeroText>{t('Hero.title')}</HeroText>
          <TextSecondary>{t('Hero.description')}</TextSecondary>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <EmailFormComponent />
          </div>
        </div>

        {/* App Preview */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg backdrop-blur-md">
            <Image
              src="/images/landing/hero.png"
              alt="App Preview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-transparent"></div>
          </div>
          <div className="absolute -inset-0.5 -z-10 bg-gradient-to-tr from-teal-600/20 to-transparent blur-2xl"></div>
        </div>
      </div>
    </section>
  )
}

async function LandingFeature1() {
  const t = await getMessages()
  const locale = await getLocale()

  return (
    <section className="w-full p-6 md:p-24">
      <div className="mx-auto grid w-full items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg backdrop-blur-md">
            <ThemedImage
              srcLight={`/images/landing/meals_${locale}_light.png`}
              srcDark={`/images/landing/meals_${locale}_dark.png`}
              alt="YumALarm meals feature preview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-transparent"></div>
          </div>
          <div className="absolute -inset-0.5 -z-10 bg-gradient-to-tr from-teal-600/20 to-transparent blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="order-1 space-y-8 text-left md:order-2">
          <h2 className="text-3xl font-bold md:text-5xl">{t('Feature1.title')}</h2>
          <p className="max-w-xl text-lg text-gray-600">{t('Feature1.description')}</p>
        </div>
      </div>
    </section>
  )
}

async function LandingFeature2() {
  const t = await getMessages()
  const locale = await getLocale()

  return (
    <section className="w-full p-6 md:p-24">
      <div className="mx-auto grid w-full items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div className="order-1 space-y-8 text-left">
          <h2 className="text-3xl font-bold md:text-5xl">{t('Feature2.title')}</h2>
          <p className="max-w-xl text-lg text-gray-600">{t('Feature2.description')}</p>
        </div>
        {/* Image */}
        <div className="relative order-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg backdrop-blur-md">
            <Image
              src={`/images/landing/notification_${locale}.png`}
              alt="YumAlarm notification feature preview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-transparent"></div>
          </div>
          <div className="absolute -inset-0.5 -z-10 bg-gradient-to-tr from-teal-600/20 to-transparent blur-2xl"></div>
        </div>
      </div>
    </section>
  )
}

async function Introduction() {
  const t = await getMessages()

  return (
    <section className="w-full p-6 md:p-24">
      <div className="mx-auto grid w-full items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg backdrop-blur-md">
            <Image
              src="/images/landing/introduction.png"
              alt="Family image"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-transparent"></div>
          </div>
          <div className="absolute -inset-0.5 -z-10 bg-gradient-to-tr from-teal-600/20 to-transparent blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="order-1 space-y-8 text-left md:order-2">
          <h2 className="text-3xl font-bold md:text-4xl">{t('Introduction.title')}</h2>
          <div className="space-y-4 text-gray-600">
            <p>{t('Introduction.description1')}</p>
            <p>{t('Introduction.description2')}</p>
            <p>{t('Introduction.description3')}</p>
            <p>{t('Introduction.description4')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

async function LandingCTA() {
  const t = await getMessages()

  return (
    <section id="cta" className="w-full p-6 md:p-24">
      <div className="animate-on-scroll mx-auto w-full text-center">
        <span className="mb-6 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-600 dark:bg-teal-950 dark:text-teal-100">
          {t('CTA.eyebrow')}
        </span>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">{t('CTA.title')}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-gray-600">{t('CTA.description')}</p>

        <EmailFormComponent className="justify-center" />
      </div>
    </section>
  )
}

async function LandingFooter() {
  const t = await getMessages()

  return (
    <footer className="mx-auto flex w-4/5 flex-col items-center justify-between border-t border-gray-200/10 px-6 py-8 sm:flex-row">
      <div className="pb-3 text-sm text-gray-500 sm:mb-0">&copy; {t('Footer.copyright')}</div>
      <LanguageDropdown />
      <div className="flex">
        <Link href="/terms-of-service" className="px-2 text-sm text-gray-500 hover:text-gray-700 md:px-6">
          {t('Footer.terms')}
        </Link>
        <Link href="/privacy-policy" className="px-2 text-sm text-gray-500 hover:text-gray-700 md:px-6">
          {t('Footer.privacy')}
        </Link>
      </div>
    </footer>
  )
}

type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
  srcLight: string
  srcDark: string
}

const ThemedImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props

  return (
    <>
      <Image {...rest} src={srcLight} className="block dark:hidden" />
      <Image {...rest} src={srcDark} className="hidden dark:block" />
    </>
  )
}
