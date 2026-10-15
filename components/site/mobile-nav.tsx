'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InstagramLink } from '@/components/site/instagram-link'
import { LanguageSwitcher } from '@/components/site/language-switcher'
import { SiteLogo } from '@/components/site/site-logo'
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
const linkClass =
  'inline-block font-display text-2xl font-light leading-tight text-neutral-900 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-3xl'

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

  const current = (active: boolean) => (active ? ('page' as const) : undefined)
  const expeditionsActive = rest.startsWith('/expeditions')
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
        'fixed inset-0 z-[110] h-full w-full lg:hidden',
        open ? 'visible' : 'invisible transition-[visibility] duration-300 motion-reduce:transition-none',
      )}
    >
      <div
        ref={panelRef}
        className={cn(
          'relative flex h-full w-full flex-col overflow-y-auto bg-[#FBFBFB] text-neutral-900',
          'pb-[max(2rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)]',
          'transition-opacity duration-300 ease-out motion-reduce:transition-none',
          open ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className="absolute inset-x-0 top-[env(safe-area-inset-top)] flex h-16 items-center justify-between gap-4 px-8">
          <Link
            href={`/${locale}`}
            onClick={onClose}
            aria-label="Wonderbound Journeys"
            className="flex items-center focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <SiteLogo />
          </Link>
          <button
            ref={closeRef}
            type="button"
            aria-label={labels.closeMenu}
            onClick={onClose}
            className="-mr-2 inline-flex size-10 items-center justify-center text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.25} />
          </button>
        </div>

        <nav aria-label={labels.mainNav} className="flex-1 px-8 pb-8 pt-24">
          <ul className="space-y-6 text-left">
            <li>
              <Link
                href={`/${locale}`}
                onClick={onClose}
                aria-current={current(rest === '')}
                className={cn(linkClass, rest === '' && 'italic')}
              >
                {labels.home}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/expeditions`}
                onClick={onClose}
                aria-current={current(expeditionsActive)}
                className={cn(linkClass, expeditionsActive && 'italic')}
              >
                {labels.expeditions}
              </Link>
              <Link
                href={`/${locale}/salidas-grupales/bolivia-2027`}
                onClick={onClose}
                aria-current={current(boliviaActive)}
                className="ml-1 mt-4 block w-fit border-l border-neutral-900/15 pl-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <span className={cn('block font-display text-xl font-light leading-tight text-neutral-900', boliviaActive && 'italic')}>
                  {labels.bolivia}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-neutral-500">
                  {labels.boliviaMeta}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/destinations`}
                onClick={onClose}
                aria-current={current(rest.startsWith('/destinations'))}
                className={cn(linkClass, rest.startsWith('/destinations') && 'italic')}
              >
                {labels.destinations}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/about`}
                onClick={onClose}
                aria-current={current(rest.startsWith('/about'))}
                className={cn(linkClass, rest.startsWith('/about') && 'italic')}
              >
                {labels.about}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center justify-between gap-4 px-8 text-sm text-neutral-500">
          <LanguageSwitcher locale={locale} rest={rest} label={labels.language} className="text-sm text-neutral-900" />
          <InstagramLink
            href={social.agencyInstagram}
            label={labels.instagram}
            className="size-auto gap-1.5 py-1 text-neutral-500 hover:text-neutral-900 hover:opacity-100"
            iconClassName="size-3.5"
          >
            <span className="text-sm">{INSTAGRAM_HANDLE}</span>
          </InstagramLink>
        </div>
      </div>
    </div>
  )
}
