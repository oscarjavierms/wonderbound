'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InstagramLink } from '@/components/site/instagram-link'
import { LanguageSwitcher } from '@/components/site/language-switcher'
import { social } from '@/lib/site'
import type { Locale } from '@/lib/i18n/config'

type MobileNavProps = {
  open: boolean
  onClose: () => void
  locale: Locale
  rest: string
  returnFocusRef: React.RefObject<HTMLButtonElement | null>
  labels: {
    expeditions: string
    destinations: string
    about: string
    home: string
    bolivia: string
    boliviaMeta: string
    closeMenu: string
    mainNav: string
    language: string
    instagram: string
  }
}

const INSTAGRAM_HANDLE = '@wonderbound_journeys'
const FOCUSABLE = 'a[href], button:not([disabled])'

export function MobileNav({ open, onClose, locale, rest, returnFocusRef, labels }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (open) {
      closeRef.current?.focus()
      wasOpen.current = true
      return
    }
    if (wasOpen.current) returnFocusRef.current?.focus()
    wasOpen.current = false
  }, [open, returnFocusRef])

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return
    const items = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const links = [
    { href: `/${locale}`, label: labels.home, active: rest === '' },
    { href: `/${locale}/destinations`, label: labels.destinations, active: rest.startsWith('/destinations') },
    { href: `/${locale}/expeditions`, label: labels.expeditions, active: rest.startsWith('/expeditions') },
    { href: `/${locale}/about`, label: labels.about, active: rest.startsWith('/about') },
  ]
  const boliviaActive = rest.endsWith('/bolivia-2027')

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={labels.mainNav}
      inert={!open}
      onKeyDown={trapFocus}
      className={cn(
        'fixed inset-0 z-[110] lg:hidden',
        open ? 'visible' : 'invisible transition-[visibility] duration-300 motion-reduce:transition-none',
      )}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={labels.closeMenu}
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/20 transition-opacity duration-300 motion-reduce:transition-none',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        ref={panelRef}
        className={cn(
          'absolute inset-x-0 top-0 mx-auto mt-[max(0.5rem,env(safe-area-inset-top))] max-h-[calc(100dvh-1rem)] w-full max-w-[92%] overflow-y-auto rounded-2xl p-6',
          'border border-white/10 bg-neutral-900/80 text-white shadow-2xl shadow-black/30 backdrop-blur-md',
          'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none',
          open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
        )}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label={labels.closeMenu}
          onClick={onClose}
          className="absolute right-2 top-2 inline-flex size-9 items-center justify-center text-white/80 transition-opacity hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>

        <nav aria-label={labels.mainNav} className="grid grid-cols-[auto_auto] justify-between gap-x-3 gap-y-3.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={link.active ? 'page' : undefined}
              className={cn(
                'whitespace-nowrap font-display text-[0.9rem] leading-6 text-white/90 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4',
                link.active && 'italic text-white',
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={`/${locale}/salidas-grupales/bolivia-2027`}
            onClick={onClose}
            aria-current={boliviaActive ? 'page' : undefined}
            className="col-span-2 mt-0.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-t border-white/10 pt-3.5 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span className={cn('font-display text-[0.95rem] leading-6 text-white', boliviaActive && 'italic')}>
              {labels.bolivia}
            </span>
            <span className="text-[0.62rem] uppercase tracking-[0.12em] text-white/55">{labels.boliviaMeta}</span>
          </Link>
        </nav>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <LanguageSwitcher locale={locale} rest={rest} label={labels.language} className="text-[0.7rem] text-white" />
          <InstagramLink
            href={social.agencyInstagram}
            label={labels.instagram}
            className="size-auto gap-1.5 py-1 text-white/60 hover:text-white hover:opacity-100"
            iconClassName="size-3.5"
          >
            <span className="text-[0.7rem] tracking-wide">{INSTAGRAM_HANDLE}</span>
          </InstagramLink>
        </div>
      </div>
    </div>
  )
}
