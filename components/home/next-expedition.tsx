import { Photo } from '@/components/site/photo'
import { ButtonLink, Container } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos, whatsappUrl } from '@/lib/site'

export function NextExpedition({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { next } = dict.home
  const facts = [
    { label: next.labels.dates, value: next.dates },
    { label: next.labels.duration, value: next.duration },
    { label: next.labels.price, value: next.price },
  ]
  return (
    <section className="bg-ink py-20 text-salt md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <p className="eyebrow text-[oklch(0.78_0.12_50)]">{next.eyebrow}</p>
          <h2 className="mt-5 text-5xl leading-[1.02] md:text-6xl">{next.title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-salt/80">{next.description}</p>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-salt/15 py-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow text-[0.65rem] text-salt/55">{fact.label}</dt>
                <dd className="mt-2 font-display text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-salt/65">
            {next.group}. {next.deposit}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={href(locale, 'bolivia')}>{dict.cta.exploreExpedition}</ButtonLink>
            <ButtonLink href={whatsappUrl(dict.whatsapp.bolivia)} external variant="light">
              {dict.cta.whatsapp}
            </ButtonLink>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Photo
            src={photos.salarVehicle.src}
            alt={next.imageAlt}
            className="aspect-[4/5] w-full rounded-sm"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Container>
    </section>
  )
}
