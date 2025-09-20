import clsx from 'clsx'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

type TosItem = {
  title?: string | null
  sections: TosItemSection[]
}

type TosItemSection = {
  title?: string | null
  content: TosItemContent[]
}

type TosItemContent = {
  type: 'paragraph' | 'list'
  key?: string
  keys?: string[]
  richMappingFunc?: any // RichTranslationsValue
  noDots?: boolean
}

const items: TosItem[] = [
  {
    sections: [
      {
        content: [{ type: 'paragraph', key: 'introduction' }],
      },
    ],
  },
  {
    title: 'Scope.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'Scope.description1' },
          { type: 'paragraph', key: 'Scope.description2' },
          { type: 'paragraph', key: 'Scope.description3' },
          { type: 'paragraph', key: 'Scope.description4' },
          { type: 'paragraph', key: 'Scope.description5' },
        ],
      },
    ],
  },
  {
    title: 'Services.title',
    sections: [
      {
        title: 'Services.RightOfUse.title',
        content: [
          { type: 'paragraph', key: 'Services.RightOfUse.description1' },
          { type: 'paragraph', key: 'Services.RightOfUse.description2' },
          { type: 'paragraph', key: 'Services.RightOfUse.description3' },
        ],
      },
      {
        title: 'Services.Restriction.title',
        content: [
          { type: 'paragraph', key: 'Services.Restriction.description1' },
          {
            type: 'list',
            keys: [
              'Services.Restriction.list1',
              'Services.Restriction.list2',
              'Services.Restriction.list3',
              'Services.Restriction.list4',
              'Services.Restriction.list5',
            ],
          },
        ],
      },
      {
        title: 'Services.Operation.title',
        content: [
          { type: 'paragraph', key: 'Services.Operation.description1' },
          { type: 'paragraph', key: 'Services.Operation.description2' },
        ],
      },
      {
        title: 'Services.Support.title',
        content: [
          { type: 'paragraph', key: 'Services.Support.description1' },
          {
            type: 'paragraph',
            key: 'Services.Support.description2',
            richMappingFunc: {
              replaceThis: (chunks: string) => <a href="mailto:support@yumalarm.com">{chunks}</a>,
            },
          },
        ],
      },
      {
        title: 'Services.Changes.title',
        content: [
          { type: 'paragraph', key: 'Services.Changes.description1' },
          {
            type: 'list',
            keys: [
              'Services.Changes.list1',
              'Services.Changes.list2',
              'Services.Changes.list3',
              'Services.Changes.list4',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Involvement.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'Involvement.description1' },
          { type: 'paragraph', key: 'Involvement.description2' },
        ],
      },
    ],
  },
  {
    title: 'Renumeration.title',
    sections: [
      {
        title: 'Renumeration.FeeStructure.title',
        content: [{ type: 'paragraph', key: 'Renumeration.FeeStructure.description1' }],
      },
      {
        title: 'Renumeration.Payment.title',
        content: [
          { type: 'paragraph', key: 'Renumeration.Payment.description1' },
          { type: 'paragraph', key: 'Renumeration.Payment.description2' },
        ],
      },
      {
        title: 'Renumeration.Prices.title',
        content: [{ type: 'paragraph', key: 'Renumeration.Prices.description1' }],
      },
      {
        title: 'Renumeration.Measures.title',
        content: [{ type: 'paragraph', key: 'Renumeration.Measures.description1' }],
      },
    ],
  },
  {
    title: 'Data.title',
    sections: [
      {
        title: 'Data.SubmissionOfContent.title',
        content: [
          {
            type: 'paragraph',
            key: 'Data.SubmissionOfContent.description1',
          },
        ],
      },
      {
        title: 'Data.ProhibitedContent.title',
        content: [{ type: 'paragraph', key: 'Data.ProhibitedContent.description1' }],
      },
      {
        title: 'Data.Rights.title',
        content: [
          {
            type: 'paragraph',
            key: 'Data.Rights.description1',
          },
          {
            type: 'paragraph',
            key: 'Data.Rights.description2',
          },
          {
            type: 'paragraph',
            key: 'Data.Rights.description3',
          },
          {
            type: 'paragraph',
            key: 'Data.Rights.description4',
          },
        ],
      },
      {
        title: 'Data.Protection.title',
        content: [
          { type: 'paragraph', key: 'Data.Protection.description1' },
          { type: 'paragraph', key: 'Data.Protection.description2' },
          { type: 'paragraph', key: 'Data.Protection.description3' },
        ],
      },
      {
        title: 'Data.Retention.title',
        content: [{ type: 'paragraph', key: 'Data.Retention.description1' }],
      },
      {
        title: 'Data.Deletion.title',
        content: [{ type: 'paragraph', key: 'Data.Deletion.description1' }],
      },
    ],
  },
  {
    title: 'Release.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'Release.description1' },
          { type: 'paragraph', key: 'Release.description2' },
          { type: 'paragraph', key: 'Release.description3' },
        ],
      },
    ],
  },
  {
    title: 'Liability.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'Liability.description1' },
          {
            type: 'list',
            keys: [
              'Liability.list1',
              'Liability.list2',
              'Liability.list3',
              'Liability.list4',
              'Liability.list5',
              'Liability.list6',
              'Liability.list7',
              'Liability.list8',
              'Liability.list9',
              'Liability.list10',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Warranties.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'Warranties.description1' }],
      },
    ],
  },
  {
    title: 'TermAndTermination.title',
    sections: [
      {
        title: 'TermAndTermination.Term.title',
        content: [
          { type: 'paragraph', key: 'TermAndTermination.Term.description1' },
          { type: 'paragraph', key: 'TermAndTermination.Term.description2' },
        ],
      },
      {
        title: 'TermAndTermination.Termination.title',
        content: [
          { type: 'paragraph', key: 'TermAndTermination.Termination.description1' },
          { type: 'paragraph', key: 'TermAndTermination.Termination.description2' },
          {
            type: 'list',
            keys: [
              'TermAndTermination.Termination.list1',
              'TermAndTermination.Termination.list2',
              'TermAndTermination.Termination.list3',
            ],
          },
        ],
      },
      {
        title: 'TermAndTermination.DataAfterTermination.title',
        content: [
          {
            type: 'paragraph',
            key: 'TermAndTermination.DataAfterTermination.description1',
          },
          {
            type: 'paragraph',
            key: 'TermAndTermination.DataAfterTermination.description2',
          },
          {
            type: 'paragraph',
            key: 'TermAndTermination.DataAfterTermination.description3',
          },
        ],
      },
    ],
  },
  {
    title: 'Confidentiality.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'Confidentiality.description1' },
          { type: 'paragraph', key: 'Confidentiality.description2' },
        ],
      },
    ],
  },
  {
    title: 'FinalProvisions.title',
    sections: [
      {
        title: 'FinalProvisions.Ammendments.title',
        content: [{ type: 'paragraph', key: 'FinalProvisions.Ammendments.description1' }],
      },
      {
        title: 'FinalProvisions.Offsetting.title',
        content: [
          { type: 'paragraph', key: 'FinalProvisions.Offsetting.description1' },
          { type: 'paragraph', key: 'FinalProvisions.Offsetting.description2' },
        ],
      },
      {
        title: 'FinalProvisions.Place.title',
        content: [{ type: 'paragraph', key: 'FinalProvisions.Place.description1' }],
      },
      {
        title: 'FinalProvisions.Severability.title',
        content: [{ type: 'paragraph', key: 'FinalProvisions.Severability.description1' }],
      },
      {
        title: 'FinalProvisions.ContractConclusion.title',
        content: [
          {
            type: 'paragraph',
            key: 'FinalProvisions.ContractConclusion.description1',
          },
        ],
      },
    ],
  },
  {
    title: 'ApplicableLaw.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'ApplicableLaw.description1' },
          { type: 'paragraph', key: 'ApplicableLaw.description2' },
        ],
      },
    ],
  },
]

const getMessages = cache(async () => {
  return await getTranslations('TermsOfServicePage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function TermsOfServicePage() {
  const t = await getMessages()

  return (
    <div className="mx-auto max-w-4xl text-base leading-7">
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h1>
      <p className="text-base font-semibold leading-7">{t('version')}</p>
      {items.map((item, index) => {
        return renderItem(item, t, index.toString())
      })}
    </div>
  )
}

function renderItem(item: TosItem, t: any, key: string) {
  return (
    <div key={key}>
      {item.title && <h2 className="mt-6 text-2xl font-bold tracking-tight">{t(item.title)}</h2>}
      {item.sections.map((section, index) => {
        return renderSection(section, t, key + '-' + index)
      })}
    </div>
  )
}

function renderSection(section: TosItemSection, t: any, key: string) {
  return (
    <div key={key}>
      {section.title && <h3 className="mt-6 text-xl font-bold tracking-tight">{t(section.title)}</h3>}
      {section.content.map((content, index) => {
        return renderContent(content, index, t, key + '-' + index)
      })}
    </div>
  )
}

function renderContent(content: TosItemContent, idx: number, t: any, key: string) {
  if (content.type === 'list') {
    return (
      <ul className={clsx('ml-4 mt-2 space-y-4', content.noDots ? '' : 'list-disc')} key={key}>
        {content.keys?.map((listKey, index) => {
          return (
            <li className="gap-x-3" key={key + '-' + index}>
              <span>{t.rich(listKey, content.richMappingFunc)}</span>
            </li>
          )
        })}
      </ul>
    )
  } else {
    if (idx === 0) {
      return (
        <p className="mt-6 leading-8" key={key}>
          {t.rich(content.key, content.richMappingFunc)}
        </p>
      )
    } else {
      return (
        <p className="mt-2 leading-8" key={key}>
          {t.rich(content.key, content.richMappingFunc)}
        </p>
      )
    }
  }
}
