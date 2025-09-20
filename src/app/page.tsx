import { Button } from '@/components/catalyst/button'
import { Divider } from '@/components/catalyst/divider'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '@/components/catalyst/navbar'
import { Sidebar, SidebarBody, SidebarItem, SidebarSection } from '@/components/catalyst/sidebar'
import { StackedLayout } from '@/components/catalyst/stacked-layout'
import { HeroText, TextSecondary } from '@/components/catalyst/text'
import EmailFormComponent from '@/lib/landing/EmailFormComponent'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

export default async function LandingPage() {
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
              Login
            </NavbarItem>

            <Button href="#cta" color="teal">
              Frühzeitigen Zugang erhalten
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
                Login
              </SidebarItem>

              <Button href="#cta" color="teal">
                Frühzeitigen Zugang erhalten
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
  return (
    <section className="flex min-h-screen items-center px-6 py-24 md:px-24 lg:py-48">
      <div className="mx-auto grid h-full w-full items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div className="space-y-8 text-left">
          <HeroText>
          Sparen Sie Zeit mit automatischen Essensvorschlägen
          </HeroText>
          <TextSecondary>Fügen Sie Ihre Mahlzeiten hinzu, wählen Sie einen Plan, und lassen Sie YumAlarm Ihre Essensvorschläge direkt in Ihren E-Mail-Posteingang liefern!</TextSecondary>
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
  return (
    <section className="w-full p-6 md:p-24">
      <div className="mx-auto grid w-full items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg backdrop-blur-md">
            <ThemedImage
              srcLight={`/images/landing/meals_light.png`}
              srcDark={`/images/landing/meals_dark.png`}
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
          <h2 className="text-3xl font-bold md:text-5xl">Verlieren Sie nie wieder den Überblick über Ihre Lieblingsgerichte</h2>
          <p className="max-w-xl text-lg text-gray-600">Mit YumAlarm können Sie alle Ihre Lieblingsgerichte speichern und in selbst erstellte Tags wie Mittagessen, 15 Minuten Mahlzeiten oder Vegetarisch einordnen.</p>
        </div>
      </div>
    </section>
  )
}

async function LandingFeature2() {
  return (
    <section className="w-full p-6 md:p-24">
      <div className="mx-auto grid w-full items-center gap-12 lg:grid-cols-2">
        {/* Content */}
        <div className="order-1 space-y-8 text-left">
          <h2 className="text-3xl font-bold md:text-5xl">Erhalten Sie personalisierte Essensvorschläge direkt in Ihren E-Mail-Posteingang</h2>
          <p className="max-w-xl text-lg text-gray-600">Ihnen gehen nie wieder die Essensideen aus! Richten Sie eine tägliche oder wöchentliche E-Mail ein und erhalten Sie zufällige Gerichte aus allen Ihren Mahlzeiten oder aus einem ausgewählten Tag.</p>
        </div>
        {/* Image */}
        <div className="relative order-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-lg backdrop-blur-md">
            <Image
              src={`/images/landing/notification.png`}
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
          <h2 className="text-3xl font-bold md:text-4xl">Hey, ich bin Matija, und ich bin der Ersteller von ZnuniAlarm.</h2>
          <div className="space-y-4 text-gray-600">
            <p>In meiner vierköpfigen Familie genießen wir großartige hausgemachte Mahlzeiten. Aber wir hatten ein Problem: Das Hinsetzen und Planen unserer Mahlzeiten für die Woche fühlte sich wie eine lästige Pflicht an und kostete zu viel Energie</p>
            <p>Oft griffen wir auf dieselben 10 Rezepte zurück, einfach weil sie leicht zu merken waren. Keine Sorge, wir lieben sie – aber was ist mit all den fantastischen Rezepten, die wir ausprobiert, geliebt und dann... vergessen haben?</p>
            <p>Um unser Leben zu erleichtern, habe ich YumAlarm entwickelt. Es ist eine einfache Möglichkeit, all unsere Lieblingsrezepte zu speichern und zufällige Mahlzeiten aus denen auszuwählen, von denen wir wissen, dass wir sie lieben.</p>
            <p>Was zuvor eine stressige, wiederkehrende Aufgabe war, ist jetzt schnell und einfach geworden.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

async function LandingCTA() {
  return (
    <section id="cta" className="w-full p-6 md:p-24">
      <div className="animate-on-scroll mx-auto w-full text-center">
        <span className="mb-6 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-600 dark:bg-teal-950 dark:text-teal-100">
          Werden Sie noch heute Teil von ZnuniAlarm
        </span>
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">Bereit Zeit und Energie zu sparen?</h2>
        <p className="mx-auto mb-10 max-w-2xl text-gray-600">Tragen Sie sich jetzt in die Warteliste ein, um frühzeitig Zugang zu neuen Features zu erhalten, YumAlarm aktiv mitzugestalten und Ihre Mahlzeitenplanung zu automatisieren.</p>

        <EmailFormComponent className="justify-center" />
      </div>
    </section>
  )
}

async function LandingFooter() {
  return (
    <footer className="mx-auto flex w-4/5 flex-col items-center justify-between border-t border-gray-200/10 px-6 py-8 sm:flex-row">
      <div className="pb-3 text-sm text-gray-500 sm:mb-0">&copy; 2025 YumAlarm. Alle Rechte vorbehalten</div>
      <div className="flex">
        <Link href="/terms-of-service" className="px-2 text-sm text-gray-500 hover:text-gray-700 md:px-6">
          AGB
        </Link>
        <Link href="/privacy-policy" className="px-2 text-sm text-gray-500 hover:text-gray-700 md:px-6">
          Datenschutz
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
