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

export type GalleryPhoto = { src: string; wide?: boolean }

function gallery(...entries: (string | GalleryPhoto)[]): GalleryPhoto[] {
  return entries.map((entry) =>
    typeof entry === 'string' ? { src: `/images/${entry}` } : { ...entry, src: `/images/${entry.src}` },
  )
}

// El orden debe coincidir con `destinations.cards` de los diccionarios.
export const destinationCards = [
  { id: 'bolivia', src: '/images/salar-pink.jpg', available: true, gallery: [] as GalleryPhoto[] },
  {
    id: 'egipto',
    src: '/images/dest-egipto.png',
    available: false,
    gallery: gallery('E1.JPG', 'E2.JPG', 'E3.JPG', 'E4.JPG', 'E5.JPG', 'E6.JPG', { src: 'E7.JPG', wide: true }, 'E8.jpg'),
  },
  {
    id: 'peru',
    src: '/images/dest-peru.png',
    available: false,
    gallery: gallery(
      'Peru1.jpg',
      'Peru2.jpg',
      'Peru3.jpg',
      'Peru4.jpg',
      'Peru5.JPG',
      'Peru6.JPG',
      'Peru7.JPG',
      'Peru8.JPG',
      'Peru9.JPG',
      'Peru10.jpg',
    ),
  },
  {
    id: 'jordania',
    src: '/images/J1.JPG',
    available: false,
    gallery: gallery('J1.JPG', 'J2.JPG', 'J3.jpg', 'J4.jpg', 'J5.JPG', { src: 'J6.JPG', wide: true }, 'J7.JPG'),
  },
  {
    id: 'patagonia',
    src: '/images/dest-patagonia.png',
    available: false,
    gallery: gallery('P1.JPG', 'P2.JPG', 'P3.JPG', 'P4.jpg', 'P5.jpg', 'P6.jpg', 'P7.JPG', 'P8.jpg'),
  },
  {
    id: 'huayhuash',
    src: '/images/dest-huayhuash.png',
    available: false,
    gallery: gallery(
      'H1.JPG',
      'H2.JPG',
      'H4.JPG',
      'H5.JPG',
      'H6.JPG',
      'H7.JPG',
      'H8.JPG',
      'H9.JPG',
      'H10.JPG',
      'H3.jpg',
      'H11.jpg',
    ),
  },
  { id: 'laponia', src: '/images/dest-laponia.png', available: false, gallery: [] as GalleryPhoto[] },
] as const

export function destinationHref(locale: Locale, id: DestinationId) {
  return id === 'bolivia' ? href(locale, 'bolivia') : `/${locale}${routes.destinations}/${id}`
}

// Ruta de la foto de perfil por testimonio, en el mismo orden del diccionario. null muestra iniciales.
export const testimonialAvatars: (string | null)[] = [null, null]

export type DestinationId = (typeof destinationCards)[number]['id']
