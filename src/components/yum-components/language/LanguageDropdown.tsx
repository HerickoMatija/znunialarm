import { Dropdown, DropdownButton, DropdownDivider, DropdownMenu } from '@/components/catalyst/dropdown'
import { SidebarItem, SidebarLabel } from '@/components/catalyst/sidebar'
import { LANGUAGE_DE, LANGUAGE_EN, LANGUAGE_SL } from '@/lib/Constants'
import { LanguageIcon } from '@heroicons/react/16/solid'
import { getLocale, getTranslations } from 'next-intl/server'
import LanguageDropdownItem from './LanguageDropdownItem'

export default async function LanguageDropdown() {
  const locale = await getLocale()
  const t = await getTranslations('LanguageDropdown')

  return (
    <Dropdown>
      <DropdownButton as={SidebarItem}>
        <LanguageIcon />
        <SidebarLabel>{t(locale)}</SidebarLabel>
      </DropdownButton>
      <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
        {getItems(locale, t)}
      </DropdownMenu>
    </Dropdown>
  )
}

function getItems(locale: string, t: any) {
  if (locale === LANGUAGE_EN) {
    return (
      <>
        <LanguageDropdownItem label={t('de')} value={LANGUAGE_DE} />
        <DropdownDivider />
        <LanguageDropdownItem label={t('sl')} value={LANGUAGE_SL} />
      </>
    )
  } else if (locale === LANGUAGE_DE) {
    return (
      <>
        <LanguageDropdownItem label={t('en')} value={LANGUAGE_EN} />
        <DropdownDivider />
        <LanguageDropdownItem label={t('sl')} value={LANGUAGE_SL} />
      </>
    )
  } else if (locale === LANGUAGE_SL) {
    return (
      <>
        <LanguageDropdownItem label={t('en')} value={LANGUAGE_EN} />
        <DropdownDivider />
        <LanguageDropdownItem label={t('de')} value={LANGUAGE_DE} />
      </>
    )
  }
  return <></>
}
