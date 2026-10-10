import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
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
    <section className="bg-sand py-24 md:py-36">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5 lg:order-2">
          <Photo
            src={photos.salarVehicle.src}
            alt={next.imageAlt}
            className="aspect-[4/5] w-full rounded-sm"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
        <div className="lg:col-span-7 lg:order-1">
          <Eyebrow>{next.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{next.title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {next.description}
          </p>

          <dl className="mt-10 grid gap-6 border-y border-ink/15 py-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow text-[0.65rem] text-muted-foreground">{fact.label}</dt>
                <dd className="mt-2 font-display text-xl md:text-2xl">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={href(locale, 'bolivia')}>{dict.cta.exploreExpedition}</ButtonLink>
            <ButtonLink href={whatsappUrl(dict.whatsapp.bolivia)} external variant="dark">
              {dict.cta.whatsapp}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
