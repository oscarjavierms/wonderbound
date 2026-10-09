export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
export const CONSENT_COOKIE = 'wb_consent'

export type PixelEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Contact'
  | 'Lead'
  | 'InitiateCheckout'
  | 'Purchase'

type Fbq = {
  (...args: unknown[]): void
  push: Fbq
  loaded: boolean
  version: string
  queue: unknown[][]
  callMethod?: (...args: unknown[]) => void
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
    __wbPixelQueue?: Array<[PixelEvent, Record<string, unknown> | undefined]>
  }
}

export function loadMetaPixel(id: string) {
  if (typeof window === 'undefined' || window.fbq) return

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  } as Fbq
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  fbq('init', id)

  const pending = window.__wbPixelQueue ?? []
  window.__wbPixelQueue = []
  for (const [event, params] of pending) fbq('track', event, params)
}

// Los eventos se encolan en memoria hasta que exista consentimiento y el píxel esté cargado.
export function trackPixel(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !META_PIXEL_ID) return
  if (window.fbq) {
    window.fbq('track', event, params)
    return
  }
  window.__wbPixelQueue = window.__wbPixelQueue ?? []
  window.__wbPixelQueue.push([event, params])
}
