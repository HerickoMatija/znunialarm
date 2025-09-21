import { Link } from '@/components/catalyst/link'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type FAQItem = {
  key: string
  richMappingFunc?: any // RichTranslationsValue
}

const faqs: FAQItem[] = [
  { key: 'freeTrial' },
  { key: 'pricingModel' },
  { key: 'minimumDuration' },
  { key: 'cancelSubscription' },
  { key: 'switchPlans' },
  { key: 'paymentOptions' },
  { key: 'processPayments' },
  {
    key: 'customerSupport',
    richMappingFunc: {
      replaceThis: (chunks: ReactNode) => <a href="mailto:support@yumalarm.com">{chunks}</a>,
    },
  },
  { key: 'discount' },
  { key: 'notificationTime' },
]

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Häufig gestellte Fragen',
  }
}

export default async function FAQPage() {
  return (
    <div className="mx-auto max-w-7xl py-16">
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-white/10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {t('title')}
          </h1>
          <p className="mt-6 text-base font-semibold leading-7">
            Können Sie die gesuchte Antwort nicht finden? Wenden Sie sich an unser <Link href="mailto:support@yumalarm.com" className="font-extrabold">Support-Team</Link> und wir melden uns so schnell wie möglich bei Ihnen.
          </p>
        </div>
        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-white/10">
          {faqs.map((faq) => (
            <Disclosure key={faq.key} as="div" className="pt-6">
              <dt>
                <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                  <span className="text-base/7 font-semibold">{faq.key + 'Question')</span>
                  <span className="ml-6 flex h-7 items-center">
                    <PlusIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                    <MinusIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" className="mt-2 pr-12">
                <p className="text-base/7 text-gray-600 dark:text-gray-300">
                  {faq.key + 'Answer}
                </p>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  )
}
