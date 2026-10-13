import type { Locale } from '@/lib/i18n/config'

export const routes = {
  home: '',
  expeditions: '/expeditions',
  destinations: '/destinations',
  about: '/about',
  bolivia: '/salidas-grupales/bolivia-2027',
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
  rnt: '300525',
  email: 'dondeestakelly@gmail.com',
  whatsappNumber: '573189740603',
  whatsappDisplay: '+57 318 974 0603',
} as const

export const social = {
  agencyInstagram: 'https://www.instagram.com/wonderbound_journeys',
  founderInstagram: 'https://www.instagram.com/dondeesta_kelly',
} as const

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wonderboundjourneys.com'

export const photos = {
  founder: { src: '/images/Fundadora.jpg' },
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
  laPaz: { src: '/images/la-paz.png' },
  valleLuna: { src: '/images/valle-luna.png' },
  geiseres: { src: '/images/geiseres.png' },
} as const

export const destinationCards = [
  { id: 'bolivia', src: '/images/salar-pink.jpg' },
  { id: 'peru', src: '/images/dest-peru.png' },
  { id: 'huayhuash', src: '/images/dest-huayhuash.png' },
  { id: 'patagonia', src: '/images/dest-patagonia.png' },
  { id: 'egipto', src: '/images/dest-egipto.png' },
  { id: 'laponia', src: '/images/dest-laponia.png' },
] as const

// Ruta de la foto de perfil por testimonio, en el mismo orden del diccionario. null muestra iniciales.
export const testimonialAvatars: (string | null)[] = [null, null]

export type DestinationId = (typeof destinationCards)[number]['id']
