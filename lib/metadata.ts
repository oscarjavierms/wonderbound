import type { Metadata } from 'next'
import { getDictionary, locales, type Locale } from '@/lib/i18n/config'
import { href, type RouteKey } from '@/lib/site'

export function pageMetadata(
  locale: Locale,
  route: RouteKey,
  page: keyof ReturnType<typeof getDictionary>['meta']['pages'],
  description?: string,
): Metadata {
  const dict = getDictionary(locale)
  return {
    title: dict.meta.pages[page],
    description: description ?? dict.meta.description,
    alternates: {
      canonical: href(locale, route),
      languages: Object.fromEntries(locales.map((l) => [l, href(l, route)])),
    },
  }
}
