'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  CONSENT_COOKIE,
  META_PIXEL_ID,
  loadMetaPixel,
  trackPixel,
  type PixelEvent,
} from '@/lib/meta-pixel'

type Consent = 'unknown' | 'granted' | 'denied'

type Props = {
  locale: string
  privacyHref: string
  labels: { title: string; text: string; accept: string; reject: string; more: string }
}

function readConsent(): Consent {
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${CONSENT_COOKIE}=`))
  const value = match?.split('=')[1]
  return value === 'granted' || value === 'denied' ? value : 'unknown'
}

function writeConsent(value: Exclude<Consent, 'unknown'>) {
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`
}

// No hace nada hasta que exista NEXT_PUBLIC_META_PIXEL_ID y el visitante acepte.
export function MetaPixel({ privacyHref, labels }: Props) {
  const pathname = usePathname()
  const [consent, setConsent] = useState<Consent>('unknown')
  const [ready, setReady] = useState(false)
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    setConsent(readConsent())
    setReady(true)
  }, [])

  useEffect(() => {
    if (consent === 'granted' && META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID)
  }, [consent])

  useEffect(() => {
    if (!META_PIXEL_ID || consent === 'denied' || lastPath.current === pathname) return
    lastPath.current = pathname
    trackPixel('PageView')
  }, [pathname, consent])

  if (!META_PIXEL_ID || !ready || consent !== 'unknown') return null

  const choose = (value: 'granted' | 'denied') => {
    writeConsent(value)
    setConsent(value)
  }

  return (
    <aside
      aria-label={labels.title}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-lg border border-border bg-card p-5 shadow-xl md:inset-x-auto md:bottom-6 md:left-6"
    >
      <p className="font-display text-xl">{labels.title}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {labels.text}{' '}
        <Link href={privacyHref} className="underline underline-offset-4">
          {labels.more}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose('granted')}
          className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-salt hover:bg-ink/90"
        >
          {labels.accept}
        </button>
        <button
          type="button"
          onClick={() => choose('denied')}
          className="rounded-full border border-ink/30 px-5 py-2 text-sm font-medium hover:bg-sand"
        >
          {labels.reject}
        </button>
      </div>
    </aside>
  )
}

export function PixelEventOnMount({ event }: { event: PixelEvent }) {
  useEffect(() => {
    trackPixel(event)
  }, [event])
  return null
}
