import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/site/closing-cta'
import { Photo } from '@/components/site/photo'
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
    <div className="bg-[#FBFBFB]">
      <section className="pb-20 pt-36 md:pb-28 md:pt-48">
        <Container>
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[1.02] md:text-8xl">{a.title}</h1>
          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12">
            <div className="space-y-7 text-lg leading-relaxed text-muted-foreground lg:col-span-7 lg:col-start-5 md:text-xl">
              {a.manifesto.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="border-l-2 border-terracotta pl-6 font-display text-3xl italic leading-snug text-ink md:text-4xl">
                {a.manifesto.emphasis}
              </p>
              <p className="font-display text-3xl italic text-ink">{dict.signature}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink/10 py-20 md:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Photo
              src={photos.salarWide.src}
              alt={a.founder.imageAlt}
              className="aspect-[4/5] w-full rounded-sm"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
          <div className="lg:col-span-7">
            <Eyebrow>{a.founder.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-4xl leading-[1.05] md:text-6xl">{a.founder.title}</h2>
            <p className="mt-8 font-display text-4xl italic">{a.founder.lead}</p>
            <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
              {a.founder.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ClosingCta locale={lang} />
    </div>
  )
}
