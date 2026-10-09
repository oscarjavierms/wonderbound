import type { Locale } from '@/lib/i18n/config'

export const routes = {
  home: '',
  expeditions: '/expeditions',
  destinations: '/destinations',
  about: '/about',
  bolivia: '/bolivia-2027',
  terms: '/terms',
  privacy: '/privacy',
} as const

export type RouteKey = keyof typeof routes

export function href(locale: Locale, route: RouteKey, hash?: string) {
  return `/${locale}${routes[route]}${hash ? `#${hash}` : ''}`
}

// Datos consignados en contrato; verificar contra certificados vigentes antes de publicar.
export const business = {
  tradeName: 'Wonderbound Journeys',
  legalRepresentative: 'Kelly Johana Vega Niño',
  nit: '1098730939-1',
  rnt: '300525',
  address:
    'Diagonal 19 #153B-10, Torre 1, apartamento 1303, Floridablanca, Santander, Colombia',
  email: 'dondeestakelly@gmail.com',
  whatsappNumber: '573189740603',
  whatsappDisplay: '+57 318 974 0603',
} as const

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wonderboundjourneys.com'

export const photos = {
  stars: { src: '/images/stars.jpg', width: 1079, height: 1616 },
  salarPoncho: { src: '/images/salar-poncho.jpg' },
  desertRock: { src: '/images/desert-rock.jpg' },
  llama: { src: '/images/llama.jpg' },
  saltStairs: { src: '/images/salt-stairs.jpg' },
  salarPink: { src: '/images/salar-pink.jpg' },
  salarVehicle: { src: '/images/salar-vehicle.jpg' },
  sunsetOrange: { src: '/images/sunset-orange.jpg' },
  sunsetPurple: { src: '/images/sunset-purple.jpg' },
  salarWide: { src: '/images/salar-wide.jpg' },
} as const
