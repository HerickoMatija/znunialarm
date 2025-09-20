'use client'

import { formatPrice, getCountryFromTimezone } from '@/lib/pricing/PricingUtils'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export type PriceComponentProps = {
  featured: boolean
  price: number
  discountedPrice: number
  perMonthText: string
  withReferralDiscountText: string
}

export default function PriceComponent({
  featured,
  price,
  discountedPrice,
  perMonthText,
  withReferralDiscountText,
}: PriceComponentProps) {
  const [isClient, setIsClient] = useState(false)
  const country = getCountryFromBrowser()
  const formattedPrice = formatPrice(price, country)
  const formattedDiscountedPrice = formatPrice(discountedPrice, country)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <>
      <p className={clsx('mt-2 text-base italic', 'text-slate-400 dark:text-white')}>
        {formattedDiscountedPrice}
        {perMonthText} {withReferralDiscountText}
      </p>

      <p className={clsx('font-display order-first text-5xl font-light tracking-tight', 'dark:text-white')}>
        {formattedPrice}
        {perMonthText}
      </p>
    </>
  )
}

export function getCountryFromBrowser(): string {
  if (typeof window === 'undefined') return 'US' // Default for SSR

  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return getCountryFromTimezone(timeZone)
  } catch (e) {
    console.warn('Could not determine timezone')
  }

  return 'US'
}
