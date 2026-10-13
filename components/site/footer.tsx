import Link from 'next/link'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { business, href, social, whatsappUrl } from '@/lib/site'
import { Container } from '@/components/site/ui'
import { InstagramLink } from '@/components/site/instagram-link'

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const year = new Date().getFullYear()

  const explore = [
    { label: dict.nav.expeditions, to: href(locale, 'expeditions') },
    { label: dict.nav.bolivia, to: href(locale, 'bolivia') },
    { label: dict.nav.destinations, to: href(locale, 'destinations') },
    { label: dict.nav.about, to: href(locale, 'about') },
  ]

  const linkClass = 'text-ink/80 transition-colors hover:text-ink'

  return (
    <footer className="border-t border-border bg-salt text-ink">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-4xl leading-none">Wonderbound</p>
            <p className="eyebrow mt-2 text-[0.65rem] tracking-[0.4em] text-muted-foreground">
              Journeys
            </p>
            <p className="mt-6 font-display text-2xl italic">{dict.signature}</p>
            <InstagramLink
              href={social.agencyInstagram}
              label={dict.nav.instagram}
              className="-ml-2 mt-4"
              iconClassName="size-6"
            />
          </div>

          <nav aria-label={dict.footer.explore} className="md:col-span-3">
            <h2 className="eyebrow font-sans text-muted-foreground">{dict.footer.explore}</h2>
            <ul className="mt-5 space-y-3">
              {explore.map((item) => (
                <li key={item.to}>
                  <Link href={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow font-sans text-muted-foreground">{dict.footer.contact}</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${business.email}`} className={linkClass}>
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(dict.whatsapp.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp {business.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="text-base font-semibold text-ink md:text-lg">
            © {year} {business.tradeName} · RNT {business.rnt}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href={href(locale, 'terms')} className="hover:text-ink">
                {dict.footer.terms}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'privacy')} className="hover:text-ink">
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
