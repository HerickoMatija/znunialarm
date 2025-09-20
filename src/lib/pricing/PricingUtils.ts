import { CURRENCIES, CurrencyCode, EU_COUNTRIES } from './PricingConstants'

function getCurrencyForCountry(countryCode: string): CurrencyCode {
  if (countryCode === 'CH') {
    return 'CHF'
  } else if (EU_COUNTRIES.includes(countryCode)) {
    return 'EUR'
  }

  return 'USD'
}

export function formatPrice(amount: number, countryCode: string): string {
  const currency = getCurrencyForCountry(countryCode)
  const symbol = CURRENCIES[currency]

  return currency === 'CHF'
    ? `${symbol} ${amount}` // CHF goes before the number
    : `${symbol}${amount}` // EUR and USD go before the number
}

const EUROPEAN_TIMEZONE_MAP: Record<string, string> = {
  // Western Europe
  'Europe/London': 'GB', // United Kingdom
  'Europe/Dublin': 'IE', // Ireland
  'Europe/Lisbon': 'PT', // Portugal
  // Central Europe
  'Europe/Amsterdam': 'NL', // Netherlands
  'Europe/Andorra': 'AD', // Andorra
  'Europe/Berlin': 'DE', // Germany
  'Europe/Brussels': 'BE', // Belgium
  'Europe/Luxembourg': 'LU', // Luxembourg
  'Europe/Madrid': 'ES', // Spain
  'Europe/Monaco': 'MC', // Monaco
  'Europe/Paris': 'FR', // France
  'Europe/Rome': 'IT', // Italy
  'Europe/Stockholm': 'SE', // Sweden
  'Europe/Vatican': 'VA', // Vatican City
  'Europe/Vienna': 'AT', // Austria
  'Europe/Zurich': 'CH', // Switzerland
  // Northern Europe
  'Europe/Copenhagen': 'DK', // Denmark
  'Europe/Helsinki': 'FI', // Finland
  'Europe/Oslo': 'NO', // Norway
  // Eastern Europe
  'Europe/Bucharest': 'RO', // Romania
  'Europe/Budapest': 'HU', // Hungary
  'Europe/Chisinau': 'MD', // Moldova
  'Europe/Kiev': 'UA', // Ukraine
  'Europe/Minsk': 'BY', // Belarus
  'Europe/Moscow': 'RU', // Russia
  'Europe/Prague': 'CZ', // Czech Republic
  'Europe/Riga': 'LV', // Latvia
  'Europe/Sofia': 'BG', // Bulgaria
  'Europe/Tallinn': 'EE', // Estonia
  'Europe/Vilnius': 'LT', // Lithuania
  'Europe/Warsaw': 'PL', // Poland
  // Southern Europe
  'Europe/Athens': 'GR', // Greece
  'Europe/Belgrade': 'RS', // Serbia
  'Europe/Ljubljana': 'SI', // Slovenia
  'Europe/Malta': 'MT', // Malta
  'Europe/Podgorica': 'ME', // Montenegro
  'Europe/San_Marino': 'SM', // San Marino
  'Europe/Sarajevo': 'BA', // Bosnia and Herzegovina
  'Europe/Skopje': 'MK', // North Macedonia
  'Europe/Tirane': 'AL', // Albania
  'Europe/Zagreb': 'HR', // Croati
  // Others
  'Atlantic/Reykjavik': 'IS', // Iceland
  'Europe/Isle_of_Man': 'IM', // Isle of Man
  'Europe/Jersey': 'JE', // Jersey
  'Europe/Guernsey': 'GG', // Guernsey
  'Europe/Gibraltar': 'GI', // Gibraltar
  'Europe/Mariehamn': 'AX', // Åland Islands
  'Europe/Vaduz': 'LI', // Liechtenstein
}

// Helper function to get country from timezone
export function getCountryFromTimezone(timezone: string): string {
  return EUROPEAN_TIMEZONE_MAP[timezone] || 'US'
}
