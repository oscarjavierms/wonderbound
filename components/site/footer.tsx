import Link from 'next/link'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { business, href, whatsappUrl } from '@/lib/site'
import { Container, ButtonLink } from '@/components/site/ui'

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const year = new Date().getFullYear()

  const explore = [
    { label: dict.nav.home, to: href(locale, 'home') },
    { label: dict.nav.expeditions, to: href(locale, 'expeditions') },
    { label: dict.nav.destinations, to: href(locale, 'destinations') },
    { label: dict.nav.about, to: href(locale, 'about') },
  ]

  return (
    <footer className="bg-ink text-salt">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl leading-none">Wonderbound</p>
            <p className="eyebrow mt-2 text-[0.65rem] tracking-[0.4em] text-salt/70">Journeys</p>
            <p className="mt-6 max-w-xs text-salt/75">{dict.footer.tagline}</p>
            <p className="mt-6 font-display text-2xl italic text-salt">{dict.signature}</p>
            <ButtonLink href={href(locale, 'bolivia')} className="mt-8">
              {dict.cta.discoverBolivia}
            </ButtonLink>
          </div>

          <nav aria-label={dict.footer.explore} className="md:col-span-2">
            <h2 className="eyebrow font-sans text-salt/60">{dict.footer.explore}</h2>
            <ul className="mt-5 space-y-3">
              {explore.map((item) => (
                <li key={item.to}>
                  <Link href={item.to} className="text-salt/90 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={href(locale, 'bolivia')}
                  className="text-salt/90 transition-colors hover:text-white"
                >
                  {dict.nav.bolivia}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-5">
            <h2 className="eyebrow font-sans text-salt/60">{dict.footer.contact}</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="text-salt/90 transition-colors hover:text-white"
                >
                  {business.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(dict.whatsapp.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-salt/90 transition-colors hover:text-white"
                >
                  WhatsApp {business.whatsappDisplay}
                </a>
              </li>
            </ul>

            <h2 className="eyebrow mt-10 font-sans text-salt/60">{dict.footer.legal}</h2>
            <dl className="mt-5 space-y-1.5 text-sm text-salt/75">
              <div className="flex gap-2">
                <dt className="sr-only">{dict.footer.legalName}</dt>
                <dd>{business.tradeName}</dd>
              </div>
              <div className="flex gap-2">
                <dt>{dict.footer.representative}:</dt>
                <dd>{business.legalRepresentative}</dd>
              </div>
              <div className="flex gap-2">
                <dt>NIT</dt>
                <dd>{business.nit}</dd>
                <dt>· RNT</dt>
                <dd>{business.rnt}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">{dict.footer.address}</dt>
                <dd className="max-w-sm text-pretty">{business.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-salt/15 pt-6 text-sm text-salt/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.tradeName}. {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={href(locale, 'terms')} className="hover:text-white">
                {dict.footer.terms}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'privacy')} className="hover:text-white">
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
