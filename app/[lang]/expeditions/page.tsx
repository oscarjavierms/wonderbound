import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/site/closing-cta'
import { PageHeader } from '@/components/site/page-header'
import { Photo, PhotoPlaceholder } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { href, photos, whatsappUrl } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'expeditions', 'expeditions')
}

export default async function ExpeditionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const ex = dict.expeditions

  return (
    <>
      <PageHeader eyebrow={ex.eyebrow} title={ex.title} text={ex.intro} />

      <section className="pb-20 md:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <Photo
              src={photos.salarPoncho.src}
              alt={ex.bolivia.imageAlt}
              className="aspect-[4/3] w-full rounded-sm"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
          <div className="lg:col-span-5">
            <Eyebrow>{ex.available}</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-5xl">{ex.bolivia.title}</h2>
            <p className="mt-4 font-display text-xl italic text-muted-foreground">
              {ex.bolivia.meta}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{ex.bolivia.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href(lang, 'bolivia')}>{dict.cta.exploreExpedition}</ButtonLink>
              <ButtonLink href={whatsappUrl(dict.whatsapp.bolivia)} external variant="dark">
                {dict.cta.whatsapp}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16 md:py-20">
        <Container className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <Eyebrow>{ex.soon.label}</Eyebrow>
            <h2 className="mt-3 text-4xl">{ex.soon.title}</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{ex.soon.text}</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <ButtonLink href={href(lang, 'bolivia', 'contacto')} variant="ink">
              {dict.cta.notifyMe}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Eyebrow>{ex.past.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl">{ex.past.title}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {ex.past.items.map((item) => (
              <li key={item}>
                <PhotoPlaceholder
                  label={`${ex.past.label} · ${dict.photo.pending}`}
                  caption={item}
                  className="aspect-[16/10] w-full rounded-sm"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta locale={lang} />
    </>
  )
}
