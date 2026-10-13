import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { WaitlistForm } from '@/components/home/waitlist-form'
import { ClosingCta } from '@/components/site/closing-cta'
import { PageHeader } from '@/components/site/page-header'
import { Photo } from '@/components/site/photo'
import { Container } from '@/components/site/ui'
import { getDictionary, hasLocale, locales } from '@/lib/i18n/config'
import { destinationCards, href } from '@/lib/site'

type Params = Promise<{ lang: string; slug: string }>

export function generateStaticParams() {
  return locales.flatMap((lang) => destinationCards.map((card) => ({ lang, slug: card.id })))
}

function findDestination(slug: string) {
  const index = destinationCards.findIndex((card) => card.id === slug)
  return index === -1 ? null : { index, card: destinationCards[index] }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { lang, slug } = await params
  const found = findDestination(slug)
  if (!hasLocale(lang) || !found) return {}
  const info = getDictionary(lang).destinations.cards[found.index]
  return { title: `${info.name} | Wonderbound Journeys`, description: info.tagline }
}

export default async function DestinationPage({ params }: { params: Params }) {
  const { lang, slug } = await params
  const found = findDestination(slug)
  if (!hasLocale(lang) || !found) notFound()
  if (found.card.id === 'bolivia') redirect(href(lang, 'bolivia'))
  const dict = getDictionary(lang)
  const d = dict.destinations
  const info = d.cards[found.index]

  return (
    <>
      <PageHeader eyebrow={d.detail.galleryEyebrow} title={info.name} text={info.tagline} />
      <section className="pb-24 md:pb-36">
        <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Photo
            src={found.card.src}
            alt={info.alt}
            className="aspect-[4/5] w-full rounded-sm lg:col-span-5"
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
          />
          <div className="lg:col-span-7">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {d.detail.soon.replace('{destination}', info.name)}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="w-full max-w-md rounded-sm border border-ink/10 bg-card p-6 md:p-8">
                <h2 className="text-2xl">{d.waitlist.title.replace('{destination}', info.name)}</h2>
                <p className="mb-6 mt-2 text-sm leading-relaxed text-muted-foreground">{d.waitlist.text}</p>
                <WaitlistForm
                  destination={info.name}
                  copy={d.waitlist}
                  message={dict.whatsapp.waitlist}
                  details={dict.whatsapp.waitlistDetails}
                />
              </div>
              <Link
                href={href(lang, 'destinations')}
                className="eyebrow border-b border-current py-1 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {d.detail.back}
              </Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">{d.note}</p>
          </div>
        </Container>
      </section>
      <ClosingCta locale={lang} />
    </>
  )
}
