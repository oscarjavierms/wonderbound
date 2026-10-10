'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n/config'

type HeaderProps = {
  locale: Locale
  labels: {
    expeditions: string
    destinations: string
    about: string
    home: string
    bolivia: string
    openMenu: string
    closeMenu: string
    mainNav: string
    language: string
  }
}

const linkClass =
  'eyebrow border-b border-transparent py-1 transition-colors hover:border-current focus-visible:outline-2 focus-visible:outline-offset-4'

export function Header({ locale, labels }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const rest = pathname.replace(new RegExp(`^/${locale}`), '') || ''
  const onExpeditions = rest.startsWith('/expeditions') || rest.startsWith('/bolivia-2027')

  const links = [
    { href: `/${locale}`, label: labels.home, active: rest === '' },
    { href: `/${locale}/destinations`, label: labels.destinations, active: rest.startsWith('/destinations') },
    { href: `/${locale}/about`, label: labels.about, active: rest.startsWith('/about') },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-salt/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href={`/${locale}`}
          className="flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-offset-4"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-2xl tracking-tight md:text-[1.75rem]">Wonderbound</span>
          <span className="eyebrow mt-1 text-[0.6rem] tracking-[0.38em] text-muted-foreground">
            Journeys
          </span>
        </Link>

        <nav aria-label={labels.mainNav} className="hidden items-center gap-9 lg:flex">
          <Link
            href={links[0].href}
            aria-current={links[0].active ? 'page' : undefined}
            className={cn(linkClass, links[0].active && 'border-current')}
          >
            {links[0].label}
          </Link>
          <GroupDeparturesMenu
            locale={locale}
            label={labels.expeditions}
            boliviaLabel={labels.bolivia}
            active={onExpeditions}
            boliviaActive={rest.startsWith('/bolivia-2027')}
          />
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={cn(linkClass, link.active && 'border-current')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <LanguageSwitcher locale={locale} rest={rest} label={labels.language} />
          <button
            type="button"
            className="-mr-2 inline-flex size-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-salt px-5 pb-10 pt-6 md:top-20 lg:hidden"
        >
          <nav aria-label={labels.mainNav} className="flex flex-col">
            <MobileLink href={links[0].href} active={links[0].active} onNavigate={() => setOpen(false)}>
              {links[0].label}
            </MobileLink>
            <MobileLink
              href={`/${locale}/expeditions`}
              active={rest.startsWith('/expeditions')}
              onNavigate={() => setOpen(false)}
            >
              {labels.expeditions}
            </MobileLink>
            <Link
              href={`/${locale}/bolivia-2027`}
              onClick={() => setOpen(false)}
              aria-current={rest.startsWith('/bolivia-2027') ? 'page' : undefined}
              className="border-b border-border py-4 pl-6 text-lg text-muted-foreground"
            >
              {labels.bolivia}
            </Link>
            {links.slice(1).map((link) => (
              <MobileLink
                key={link.href}
                href={link.href}
                active={link.active}
                onNavigate={() => setOpen(false)}
              >
                {link.label}
              </MobileLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function MobileLink({
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
      className="border-b border-border py-5 font-display text-3xl"
    >
      {children}
    </Link>
  )
}

function GroupDeparturesMenu({
  locale,
  label,
  boliviaLabel,
  active,
  boliviaActive,
}: {
  locale: Locale
  label: string
  boliviaLabel: string
  active: boolean
  boliviaActive: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-1">
        <Link
          href={`/${locale}/expeditions`}
          aria-current={active ? 'page' : undefined}
          className={cn(linkClass, active && 'border-current')}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="group-departures-menu"
          aria-label={label}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ChevronDown
            aria-hidden="true"
            className={cn('size-3.5 transition-transform', open && 'rotate-180')}
          />
        </button>
      </div>

      <div
        id="group-departures-menu"
        hidden={!open}
        className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-4"
      >
        <ul className="border border-border bg-white py-2 shadow-sm">
          <li>
            <Link
              href={`/${locale}/bolivia-2027`}
              aria-current={boliviaActive ? 'page' : undefined}
              className="block px-5 py-3 font-display text-xl transition-colors hover:bg-sand focus-visible:bg-sand"
            >
              {boliviaLabel}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function LanguageSwitcher({ locale, rest, label }: { locale: Locale; rest: string; label: string }) {
  const options: { code: Locale; text: string; name: string }[] = [
    { code: 'es', text: 'ES', name: 'Español' },
    { code: 'en', text: 'EN', name: 'English' },
  ]
  return (
    <div role="group" aria-label={label} className="eyebrow flex items-center gap-1.5 text-xs">
      {options.map((option, index) => (
        <span key={option.code} className="flex items-center gap-1.5">
          {index > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
          <Link
            href={`/${option.code}${rest}`}
            hrefLang={option.code}
            lang={option.code}
            aria-label={option.name}
            aria-current={option.code === locale ? 'true' : undefined}
            className={cn(
              'py-1 transition-opacity',
              option.code === locale ? 'border-b border-current' : 'opacity-50 hover:opacity-100',
            )}
          >
            {option.text}
          </Link>
        </span>
      ))}
    </div>
  )
}
