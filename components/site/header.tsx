'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
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

const lightPages = ['/terms', '/privacy']

export function Header({ locale, labels }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const rest = pathname.replace(new RegExp(`^/${locale}`), '') || ''
  const onLightPage = lightPages.some((p) => rest.startsWith(p))
  const solid = scrolled || open || onLightPage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: `/${locale}`, label: labels.home, active: rest === '' },
    { href: `/${locale}/expeditions`, label: labels.expeditions, active: rest.startsWith('/expeditions') },
    { href: `/${locale}/destinations`, label: labels.destinations, active: rest.startsWith('/destinations') },
    { href: `/${locale}/about`, label: labels.about, active: rest.startsWith('/about') },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        solid ? 'bg-salt/95 text-ink shadow-[0_1px_0_0] shadow-border backdrop-blur' : 'bg-transparent text-white',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href={`/${locale}`}
          className="flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-offset-4"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-2xl font-medium tracking-tight md:text-[1.75rem]">
            Wonderbound
          </span>
          <span className="eyebrow mt-1 text-[0.6rem] tracking-[0.38em] opacity-80">Journeys</span>
        </Link>

        <nav aria-label={labels.mainNav} className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={cn(
                'eyebrow border-b border-transparent py-1 transition-colors hover:border-current',
                link.active && 'border-current',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <LanguageSwitcher locale={locale} rest={rest} label={labels.language} />
          <Link
            href={`/${locale}/bolivia-2027`}
            className="hidden rounded-full bg-terracotta px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-terracotta/90 sm:inline-flex"
          >
            {labels.bolivia}
          </Link>
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
          className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-ink px-5 pb-10 pt-8 text-salt md:top-20 lg:hidden"
        >
          <nav aria-label={labels.mainNav} className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={link.active ? 'page' : undefined}
                className="border-b border-salt/15 py-5 font-display text-3xl"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/bolivia-2027`}
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white"
            >
              {labels.bolivia}
            </Link>
          </nav>
        </div>
      )}
    </header>
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
              option.code === locale ? 'border-b border-current' : 'opacity-60 hover:opacity-100',
            )}
          >
            {option.text}
          </Link>
        </span>
      ))}
    </div>
  )
}
