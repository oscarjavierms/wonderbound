import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { WaitlistCard } from '@/components/home/waitlist-card'
import { Carousel } from '@/components/site/carousel'
import { Photo } from '@/components/site/photo'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { destinationCards, href } from '@/lib/site'

const cardSizes = '(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 78vw'

export function DestinationCarousel({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { cards, waitlist } = dict.destinations
  const { destinations } = dict.home

  return (
    <Carousel
      label={destinations.carouselLabel}
      prevLabel={destinations.prev}
      nextLabel={destinations.next}
    >
      {destinationCards.map((card, index) => {
        const info = cards[index]
        const isAvailable = card.id === 'bolivia'
        return (
          <li key={card.id} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2*1rem)/3)]">
            {isAvailable ? (
              <Link
                href={href(locale, 'bolivia')}
                className="group relative isolate block aspect-[4/5] overflow-hidden rounded-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <Photo
                  src={card.src}
                  alt={info.alt}
                  className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes={cardSizes}
                  priority={index === 0}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent"
                />
                <span className="absolute left-4 top-4 rounded-full bg-terracotta px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white shadow-md sm:left-5 sm:top-5">
                  {destinations.availableBadge}
                </span>
                <div className="flex h-full flex-col justify-end p-5 sm:p-6">
                  <h3 className="text-4xl leading-none">{info.name}</h3>
                  <p className="mt-2 text-sm text-white/85">{info.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-2 self-start border-b border-white pb-1 text-xs font-medium uppercase tracking-[0.18em]">
                    {destinations.launchCta}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ) : (
              <WaitlistCard
                src={card.src}
                alt={info.alt}
                name={info.name}
                tagline={info.tagline}
                badge={destinations.soonBadge}
                sizes={cardSizes}
                copy={waitlist}
                message={dict.whatsapp.waitlist}
                details={dict.whatsapp.waitlistDetails}
              />
            )}
          </li>
        )
      })}
    </Carousel>
  )
}
