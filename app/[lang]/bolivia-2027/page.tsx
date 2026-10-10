import { Check, X } from 'lucide-react'
import { notFound } from 'next/navigation'
import { TrackView } from '@/components/analytics/track-view'
import { ContactForm } from '@/components/site/contact-form'
import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { href, photos, whatsappUrl } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'bolivia', 'bolivia', getDictionary(lang).bolivia.hero.paragraphs[0])
}

const galleryPhotos = [photos.sunsetPurple, photos.llama, photos.salarVehicle, photos.stars]

export default async function BoliviaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const b = dict.bolivia
  const facts = [b.facts.dates, b.facts.duration, b.facts.price, b.facts.group]

  return (
    <>
      <TrackView content="bolivia-2027" />

      <section className="relative isolate overflow-hidden text-white">
        <Photo
          src={photos.salarWide.src}
          alt={b.hero.imageAlt}
          className="absolute inset-0 -z-10"
          sizes="100vw"
          priority
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/30"
        />
        <Container className="flex min-h-[44rem] flex-col justify-end pb-16 pt-40 md:pb-24">
          <p className="eyebrow text-white/80">{b.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] md:text-8xl">{b.hero.title}</h1>
          <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-white/90">
            {b.hero.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contacto">{dict.cta.reserve}</ButtonLink>
            <ButtonLink href={whatsappUrl(dict.whatsapp.bolivia)} external variant="light">
              {dict.cta.whatsapp}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-label={b.name} className="border-b border-ink/15 bg-salt">
        <Container>
          <dl className="grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow text-terracotta">{fact.label}</dt>
                <dd className="mt-2 font-display text-2xl md:text-3xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Eyebrow>{b.route.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-4xl md:text-6xl">{b.route.title}</h2>
          <ol className="mt-12 grid gap-x-10 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {b.route.items.map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true" className="font-display text-lg italic text-terracotta">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-3xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-2xl rounded-sm bg-sand px-6 py-4 text-sm text-muted-foreground">
            {b.route.pending}
          </p>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl">{b.includes.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{b.includes.note}</p>
            <ul className="mt-8 space-y-4">
              {b.includes.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-terracotta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl">{b.excludes.title}</h2>
            <ul className="mt-8 space-y-4">
              {b.excludes.items.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <X aria-hidden="true" className="mt-1 size-5 shrink-0 text-ink/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Eyebrow>{b.payments.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-4xl md:text-6xl">{b.payments.title}</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {b.payments.steps.map((step) => (
              <li key={step.label} className="rounded-sm border border-ink/15 p-8">
                <p className="eyebrow text-terracotta">{step.label}</p>
                <p className="mt-4 font-display text-5xl">{step.amount}</p>
                <p className="mt-3 text-muted-foreground">{step.when}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {b.payments.note}{' '}
            <a href={href(lang, 'terms')} className="text-ink underline underline-offset-4">
              {dict.footer.terms}
            </a>
          </p>
        </Container>
      </section>

      <section className="bg-ink py-20 text-salt md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 className="text-4xl md:text-5xl lg:col-span-4">{b.important.title}</h2>
          <ul className="space-y-4 lg:col-span-8">
            {b.important.items.map((item) => (
              <li key={item} className="border-b border-salt/15 pb-4 text-salt/85">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-28" aria-label={b.name}>
        <Container>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
              <li key={photo.src}>
                <Photo
                  src={photo.src}
                  alt={b.gallery.alts[index]}
                  className="aspect-[3/4] w-full rounded-sm"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactForm locale={lang} dict={dict} />
    </>
  )
}
