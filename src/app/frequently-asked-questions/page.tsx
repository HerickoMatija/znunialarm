import { Link } from '@/components/catalyst/link'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid'
import { Metadata } from 'next'
import { ReactNode } from 'react'

type FAQItem = {
  question: string
  answer: string
}

const faqs2 = [
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
      replaceThis: (chunks: ReactNode) => ,
    },
  },
  { key: 'discount' },
  { key: 'notificationTime' },
]

 const fagq: FAQItem[] = [
  {
    "answer": "Ja, wir bieten für jeden Plan eine 14-tägige kostenlose Testphase an. Dies ist eine risikofreie Möglichkeit für Sie, unser Angebot kennenzulernen.",
        "question": "Gibt es eine kostenlose Testphase?",
      },
      {
        "answer": "YumAlarm ist ein abonnementbasiertes SaaS, daher gibt es einen monatlichen Festpreis je nach gewähltem Plan.",
            "question": "Wie ist Ihr Preismodell?",
          },
          {
            "answer": "Es gibt keine Mindestvertragslaufzeit für unser Abonnement. Sie haben die Flexibilität, unseren Service monatlich zu nutzen und können jederzeit kündigen.",
            "question": "Gibt es eine Mindestvertragslaufzeit für das Abonnement?",
          },
          {
            "answer": "Ja. Unsere Abonnements sind monatlich, sodass Sie jederzeit kündigen können und Ihr Abonnement im nächsten Monat nicht verlängert wird. Klicken Sie in Ihrem Benutzermenü auf 'Abonnement', melden Sie sich im Stripe-Dashboard an und dort können Sie Ihr Abonnement kündigen.",
                "question": "Kann ich mein Abonnement jederzeit kündigen?"
              },
              {
                "answer": "Ja, Sie können Ihren Plan jederzeit ändern. Klicken Sie in Ihrem Benutzermenü auf 'Mein Abonnement', melden Sie sich im Stripe-Dashboard an und dort können Sie Ihren Plan ändern.",
                    "question": "Kann ich zwischen den Plänen wechseln?",
                  },
                  {
                    "answer": "Wir akzeptieren Karten, Apple Pay, Google Pay, Link und Paypal.",
                        "question": "Welche Zahlungsmöglichkeiten bieten Sie an?",
                      },
                      {
                        "answer": "Wir nutzen Stripe für die Abwicklung aller unserer Zahlungen und das Abonnement-Management.",
                            "question": "Wie verarbeiten Sie Zahlungen und verwalten Abonnements?",
                          },
                          {
                            "answer": "Sie können den Kundenservice per E-Mail unter <a href='mailto:support@yumalarm.com'>support@yumalarm.com</a> kontaktieren. Wir bemühen uns, während unserer Geschäftszeiten (Montag bis Freitag, 9:00–17:00 Uhr MEZ) so schnell wie möglich zu antworten.. Klicken Sie einfach unten auf der Seite auf 'Kontakt'",
                                "question": "Wie kann ich den Kundenservice kontaktieren?",
                              },
                              {
                                "answer": "Um den lebenslangen Rabatt von 20% zu erhalten, müssen Sie 5 Freunde dazu bringen, sich mit Ihrem YumID-Empfehlungscode anzumelden. Ihren Empfehlungscode finden Sie im Dashboard unter der Rubrik 'Empfehlungen'.",
                                    "question": "Wie kann ich den lebenslangen Rabatt von 20% sichern?",
                                  },
                                  {
                                    "answer": "Die Verarbeitung der Benachrichtigungen beginnt täglich um 12:00 Uhr MEZ. Ihre Benachrichtigungen sollten Sie dann um diese Zeit erhalten.",
                                        "question": "Wann werden die Benachrichtigungen gesendet?",
                                      },
                                      {
                                        "answer": "Ihre Zufriedenheit hat für uns Priorität, und wir sichern dies mit einer 100% Geld-zurück-Garantie innerhalb von 30 Tagen nach Ihrem Kauf zu. Sollte unser Produkt nicht Ihren Erwartungen entsprechen, können Sie eine Rückerstattung beantragen. Kontaktieren Sie uns einfach unter {link} und wir werden Ihre Rückerstattung schnellstmöglich bearbeiten.",
                                            "question": "Gibt es eine Rückerstattungsrichtlinie?",
                                          },
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
          "Häufig gestellte Fragen"
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
                  <span className="text-base/7 font-semibold">{faq.question)</span>
                  <span className="ml-6 flex h-7 items-center">
                    <PlusIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                    <MinusIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                  </span>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" className="mt-2 pr-12">
                <p className="text-base/7 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  )
}
