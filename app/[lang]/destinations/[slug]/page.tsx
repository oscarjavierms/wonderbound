import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { WaitlistForm } from '@/components/home/waitlist-form'
import { ClosingCta } from '@/components/site/closing-cta'
import { PageHeader } from '@/components/site/page-header'
import { Photo } from '@/components/site/photo'
import { Container } from '@/components/site/ui'
import { getDictionary, hasLocale, locales } from '@/lib/i18n/config'
import { destinationCards, href } from '@/lib/site'
import { cn } from '@/lib/utils'

type Params = Promise<{ lang: string; slug: string }>

const waitlistAnchor = 'lista-de-espera'

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
  const { gallery } = found.card
  const hasGallery = gallery.length > 0
  const fill = (text: string) => text.replace('{destination}', info.name)

  return (
    <>
      <PageHeader eyebrow={d.detail.galleryEyebrow} title={info.name} text={info.tagline} />

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="mb-10 flex flex-col items-start gap-5 md:mb-14">
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {fill(d.detail.intro)}
            </p>
            <a
              href={`#${waitlistAnchor}`}
              className="eyebrow border-b border-current py-1 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {d.waitlist.cta}
            </a>
          </div>

          {hasGallery ? (
            <>
              <h2 className="sr-only">{fill(d.detail.galleryTitle)}</h2>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:[grid-auto-flow:dense]">
                {gallery.map((photo, index) => (
                  <li key={photo.src} className={cn('md:col-span-1', photo.wide && 'md:col-span-2')}>
                    <Photo
                      src={photo.src}
                      alt={fill(d.detail.galleryAlt).replace('{n}', String(index + 1))}
                      className={cn('w-full rounded-sm', photo.wide ? 'aspect-[3/2]' : 'aspect-[4/5]')}
                      sizes={photo.wide ? '(min-width: 1024px) 1100px, 100vw' : '(min-width: 1024px) 540px, (min-width: 768px) 50vw, 100vw'}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <Photo
                src={found.card.src}
                alt={info.alt}
                className="aspect-[4/5] w-full rounded-sm"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                {fill(d.detail.noGallery)}
              </p>
            </div>
          )}
        </Container>
      </section>

      <section id={waitlistAnchor} className="scroll-mt-24 pb-24 md:pb-36">
        <Container>
          <div className="mx-auto w-full max-w-xl rounded-sm border border-ink/10 bg-card p-6 md:p-8">
            <h2 className="text-2xl">{fill(d.waitlist.title)}</h2>
            <p className="mb-6 mt-2 text-sm leading-relaxed text-muted-foreground">{d.waitlist.text}</p>
            <WaitlistForm
              destination={info.name}
              copy={d.waitlist}
              message={dict.whatsapp.waitlist}
              details={dict.whatsapp.waitlistDetails}
            />
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <Link
              href={href(lang, 'destinations')}
              className="eyebrow border-b border-current py-1 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {d.detail.back}
            </Link>
            <p className="text-sm text-muted-foreground">{d.note}</p>
          </div>
        </Container>
      </section>

      <ClosingCta locale={lang} />
    </>
  )
}
