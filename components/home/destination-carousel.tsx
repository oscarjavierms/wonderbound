import { Carousel } from '@/components/site/carousel'
import { DestinationCard } from '@/components/site/destination-card'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { destinationCards, destinationHref } from '@/lib/site'

const cardSizes = '(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 78vw'

export function DestinationCarousel({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { cards } = dict.destinations
  const { destinations } = dict.home

  return (
    <Carousel
      label={destinations.carouselLabel}
      prevLabel={destinations.prev}
      nextLabel={destinations.next}
    >
      {destinationCards.map((card, index) => {
        const info = cards[index]
        return (
          <li key={card.id} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-2*1rem)/3)]">
            <DestinationCard
              href={destinationHref(locale, card.id)}
              src={card.src}
              alt={info.alt}
              name={info.name}
              tagline={info.tagline}
              badge={card.available ? destinations.availableBadge : destinations.soonBadge}
              cta={card.available ? destinations.launchCta : destinations.soonCta}
              available={card.available}
              sizes={cardSizes}
              priority={index === 0}
            />
          </li>
        )
      })}
    </Carousel>
  )
}
