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

  const mainLinks = [
    { href: `/${locale}`, label: labels.home, active: rest === '' },
    { href: `/${locale}/expeditions`, label: labels.expeditions, active: rest.startsWith('/expeditions') },
  ]
  const trailingLinks = [
    { href: `/${locale}/destinations`, label: labels.destinations, active: rest.startsWith('/destinations') },
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
          'absolute inset-0 bg-black/30 transition-opacity duration-300 motion-reduce:transition-none',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        ref={panelRef}
        className={cn(
          'absolute inset-y-0 right-0 flex w-[80%] max-w-[340px] flex-col overflow-y-auto bg-[#FBFBFB] text-neutral-900 shadow-[-24px_0_48px_-24px_rgba(17,17,17,0.25)]',
          'transition-transform duration-300 ease-out motion-reduce:transition-none',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-start justify-between px-7 pt-10">
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span className="font-display text-2xl tracking-tight">Wonderbound</span>
            <span className="eyebrow mt-1 text-[0.6rem] tracking-[0.38em] text-neutral-500">Journeys</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            aria-label={labels.closeMenu}
            onClick={onClose}
            className="-mr-2 -mt-1 inline-flex size-10 items-center justify-center text-neutral-900 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label={labels.mainNav} className="mt-14 flex flex-col gap-7 px-7">
          {mainLinks.map((link) => (
            <PanelLink key={link.href} href={link.href} active={link.active} onNavigate={onClose}>
              {link.label}
            </PanelLink>
          ))}

          <Link
            href={`/${locale}/salidas-grupales/bolivia-2027`}
            onClick={onClose}
            aria-current={boliviaActive ? 'page' : undefined}
            className="-mt-3 ml-1 flex flex-col gap-1 border-l border-neutral-900/15 pl-5 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span className={cn('font-display text-xl text-neutral-900', boliviaActive && 'italic')}>
              {labels.bolivia}
            </span>
            <span className="text-xs uppercase tracking-[0.14em] text-neutral-500">{labels.boliviaMeta}</span>
          </Link>

          {trailingLinks.map((link) => (
            <PanelLink key={link.href} href={link.href} active={link.active} onNavigate={onClose}>
              {link.label}
            </PanelLink>
          ))}
        </nav>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-neutral-900/10 px-7 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 text-neutral-900">
          <LanguageSwitcher locale={locale} rest={rest} label={labels.language} />
          <InstagramLink
            href={social.agencyInstagram}
            label={labels.instagram}
            className="size-auto gap-2 py-1 text-neutral-500 hover:opacity-100 hover:text-neutral-900"
            iconClassName="size-4"
          >
            <span className="text-xs tracking-wide">{INSTAGRAM_HANDLE}</span>
          </InstagramLink>
        </div>
      </div>
    </div>
  )
}

function PanelLink({
  href,
  active,
  onNavigate,
  children,
}: {
  href: string
  active: boolean
  onNavigate: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'font-display text-xl text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4',
        active && 'italic',
      )}
    >
      {children}
    </Link>
  )
}
