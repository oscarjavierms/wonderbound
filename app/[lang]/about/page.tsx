import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/site/closing-cta'
import { Photo } from '@/components/site/photo'
import { Pillars } from '@/components/site/pillars'
import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { photos } from '@/lib/site'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'about', 'about')
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const a = dict.about

  return (
    <>
      <section className="pb-20 pt-36 md:pb-28 md:pt-44">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-5xl leading-[1.02] md:text-7xl">{a.title}</h1>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
              {a.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-10 border-l-2 border-terracotta pl-6 font-display text-3xl italic leading-snug">
              {a.emphasis}
            </p>
          </div>
          <div className="lg:col-span-5">
            <Photo
              src={photos.salarWide.src}
              alt={a.imageAlt}
              className="aspect-[4/5] w-full rounded-sm"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="bg-ink py-16 text-salt md:py-20">
        <Container>
          <dl className="grid gap-10 sm:grid-cols-3">
            {a.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-display text-7xl text-terracotta">{stat.value}</span>
                  <span className="mt-2 block max-w-[16rem] text-salt/80">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Pillars locale={lang} title={a.pillarsTitle} />
      <ClosingCta locale={lang} />
    </>
  )
}
