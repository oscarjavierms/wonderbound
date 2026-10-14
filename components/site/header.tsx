'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InstagramLink } from '@/components/site/instagram-link'
import { LanguageSwitcher } from '@/components/site/language-switcher'
import { MobileNav } from '@/components/site/mobile-nav'
import { social } from '@/lib/site'
import type { Locale } from '@/lib/i18n/config'

type HeaderProps = {
  locale: Locale
  labels: {
    expeditions: string
    destinations: string
    about: string
    home: string
    bolivia: string
    boliviaMeta: string
    activeDepartures: string
    openMenu: string
    closeMenu: string
    mainNav: string
    language: string
    instagram: string
  }
}

const linkClass =
  'eyebrow border-b border-transparent py-1 transition-colors hover:border-current focus-visible:outline-2 focus-visible:outline-offset-4'

export function Header({ locale, labels }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const rest = pathname.replace(new RegExp(`^/${locale}`), '') || ''
  const onExpeditions = rest.startsWith('/expeditions') || rest.endsWith('/bolivia-2027')

  const homeLink = { href: `/${locale}`, label: labels.home, active: rest === '' }
  const links = [
    { href: `/${locale}/destinations`, label: labels.destinations, active: rest.startsWith('/destinations') },
    { href: `/${locale}/about`, label: labels.about, active: rest.startsWith('/about') },
  ]

  const { atTop, hidden } = useSmartNavbar(pathname)
  const hasDarkHero = rest === '' || rest.endsWith('/bolivia-2027')
  const transparent = atTop
  const lightText = transparent && hasDarkHero
  const isHidden = hidden

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] w-full transition-[transform,background-color,color,box-shadow,backdrop-filter] duration-300 ease-out',
          transparent ? 'bg-transparent shadow-none' : 'bg-white/80 shadow-sm backdrop-blur-md',
          lightText ? 'text-white' : 'text-[#111111]',
          isHidden && '-translate-y-full',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
          <Link
            href={`/${locale}`}
            className="flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-offset-4"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-2xl tracking-tight md:text-[1.75rem]">Wonderbound</span>
            <span
              className={cn(
                'eyebrow mt-1 text-[0.6rem] tracking-[0.38em] transition-colors duration-300',
                lightText ? 'text-white/75' : 'text-muted-foreground',
              )}
            >
              Journeys
            </span>
          </Link>

          <nav aria-label={labels.mainNav} className="hidden items-center gap-10 lg:flex">
            <Link
              href={homeLink.href}
              aria-current={homeLink.active ? 'page' : undefined}
              className={cn(linkClass, homeLink.active && 'border-current')}
            >
              {homeLink.label}
            </Link>
            <GroupDeparturesMenu
              locale={locale}
              label={labels.expeditions}
              boliviaLabel={labels.bolivia}
              boliviaMeta={labels.boliviaMeta}
              heading={labels.activeDepartures}
              active={onExpeditions}
              boliviaActive={rest.endsWith('/bolivia-2027')}
            />
            {links.map((link) => (
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
            <InstagramLink href={social.agencyInstagram} label={labels.instagram} />
            <div className="max-sm:hidden">
              <LanguageSwitcher locale={locale} rest={rest} label={labels.language} />
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              className="-mr-2 inline-flex size-10 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              aria-label={labels.openMenu}
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        rest={rest}
        returnFocusRef={menuButtonRef}
        labels={labels}
      />
    </>
  )
}

const TOP_THRESHOLD = 8
const HIDE_AFTER = 120
const SCROLL_DELTA = 6
const REVEAL_ZONE = 72

function useSmartNavbar(pathname: string) {
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setAtTop(y <= TOP_THRESHOLD)
      if (y <= HIDE_AFTER) {
        setHidden(false)
      } else if (y - lastY > SCROLL_DELTA) {
        setHidden(true)
      } else if (lastY - y > SCROLL_DELTA) {
        setHidden(false)
      }
      if (Math.abs(y - lastY) > SCROLL_DELTA) lastY = y
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.clientY <= REVEAL_ZONE) setHidden(false)
    }

    const onFocusIn = (event: FocusEvent) => {
      if ((event.target as HTMLElement | null)?.closest('header')) setHidden(false)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('focusin', onFocusIn)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [pathname])

  return { atTop, hidden }
}

function GroupDeparturesMenu({
  locale,
  label,
  boliviaLabel,
  boliviaMeta,
  heading,
  active,
  boliviaActive,
}: {
  locale: Locale
  label: string
  boliviaLabel: string
  boliviaMeta: string
  heading: string
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
        className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-5"
      >
        <div className="border border-ink/5 bg-white p-2 shadow-[0_24px_48px_-24px_rgba(17,17,17,0.18)]">
          <p className="px-4 pb-2 pt-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            {heading}
          </p>
          <ul>
            <li>
              <Link
                href={`/${locale}/salidas-grupales/bolivia-2027`}
                aria-current={boliviaActive ? 'page' : undefined}
                className="group/item flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-salt focus-visible:bg-salt"
              >
                <span className="flex flex-col">
                  <span className="font-display text-[1.65rem] leading-tight italic">
                    {boliviaLabel}
                  </span>
                  <span className="mt-1 text-xs tracking-wider text-muted-foreground">
                    {boliviaMeta}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 -rotate-90 opacity-0 transition-opacity group-hover/item:opacity-60"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
