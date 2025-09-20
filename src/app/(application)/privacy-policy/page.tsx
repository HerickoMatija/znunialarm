import clsx from 'clsx'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

type PrivacyPolicyItem = {
  title?: string | null
  sections: PrivacyPolicySection[]
}

type PrivacyPolicySection = {
  title?: string | null
  content: PrivacyPolicyContent[]
}

type PrivacyPolicyContent = {
  type: 'paragraph' | 'list'
  key?: string
  keys?: string[]
  richMappingFunc?: any // RichTranslationsValue
  noDots?: boolean
}

const items: PrivacyPolicyItem[] = [
  {
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'Introduction.part1' },
          { type: 'paragraph', key: 'Introduction.part2' },
        ],
      },
    ],
  },
  {
    title: 'DataCollection.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'DataCollection.description' },
          {
            type: 'list',
            keys: ['DataCollection.list1', 'DataCollection.list2'],
          },
        ],
      },
    ],
  },
  {
    title: 'LegalBasis.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'LegalBasis.description' }],
      },
    ],
  },
  {
    title: 'DataUsage.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'DataUsage.description' },
          {
            type: 'list',
            keys: ['DataUsage.list1', 'DataUsage.list2', 'DataUsage.list3'],
          },
        ],
      },
    ],
  },
  {
    title: 'DataStorage.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'DataStorage.description' }],
      },
    ],
  },
  {
    title: 'SharingOfData.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'SharingOfData.description1' },
          {
            type: 'list',
            keys: ['SharingOfData.list1', 'SharingOfData.list2'],
          },
          { type: 'paragraph', key: 'SharingOfData.description2' },
        ],
      },
    ],
  },
  {
    title: 'UserRights.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'UserRights.description' }],
      },
    ],
  },
  {
    title: 'Cookies.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'Cookies.description' }],
      },
    ],
  },
  {
    title: 'Marketing.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'Marketing.description' }],
      },
    ],
  },
  {
    title: 'DataRetention.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'DataRetention.description' }],
      },
    ],
  },
  {
    title: 'InternationalDataTransfers.title',
    sections: [
      {
        content: [
          {
            type: 'paragraph',
            key: 'InternationalDataTransfers.description',
          },
        ],
      },
    ],
  },
  {
    title: 'USResidents.title',
    sections: [
      {
        content: [
          {
            type: 'paragraph',
            key: 'USResidents.description',
          },
        ],
      },
    ],
  },
  {
    title: 'EUCompliance.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'EUCompliance.description' }],
      },
    ],
  },
  {
    title: 'Updates.title',
    sections: [
      {
        content: [{ type: 'paragraph', key: 'Updates.description' }],
      },
    ],
  },
  {
    title: 'Contact.title',
    sections: [
      {
        content: [
          { type: 'paragraph', key: 'Contact.description' },
          {
            type: 'list',
            keys: ['Contact.list1', 'Contact.list2', 'Contact.list3'],
            richMappingFunc: {
              replaceThis: (chunks: string) => <a href="mailto:support@yumalarm.com">{chunks}</a>,
            },
            noDots: true,
          },
        ],
      },
    ],
  },
]

const getMessages = cache(async () => {
  return await getTranslations('PrivacyPolicyPage')
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages()

  return {
    title: t('title'),
  }
}

export default async function PrivacyPolicyPage() {
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

function renderItem(item: PrivacyPolicyItem, t: any, key: string) {
  return (
    <div key={key}>
      {item.title && <h2 className="mt-6 text-2xl font-bold tracking-tight">{t(item.title)}</h2>}
      {item.sections.map((section, index) => {
        return renderSection(section, t, key + '-' + index)
      })}
    </div>
  )
}

function renderSection(section: PrivacyPolicySection, t: any, key: string) {
  return (
    <div key={key}>
      {section.title && <h3 className="mt-6 text-xl font-bold tracking-tight">{t(section.title)}</h3>}
      {section.content.map((content, index) => {
        return renderContent(content, index, t, key + '-' + index)
      })}
    </div>
  )
}

function renderContent(content: PrivacyPolicyContent, idx: number, t: any, key: string) {
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
          {t(content.key)}
        </p>
      )
    } else {
      return (
        <p className="mt-2 leading-8" key={key}>
          {t(content.key)}
        </p>
      )
    }
  }
}
