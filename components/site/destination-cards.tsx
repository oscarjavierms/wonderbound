import { DestinationCard } from '@/components/site/destination-card'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { destinationCards, destinationHref } from '@/lib/site'
import { cn } from '@/lib/utils'

export function DestinationCards({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { cards } = dict.destinations
  const { destinations } = dict.home
  const lastIndex = destinationCards.length - 1

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
      {destinationCards.map((card, index) => {
        const info = cards[index]
        const isOrphan = index === lastIndex && destinationCards.length % 2 === 1
        return (
          <li
            key={card.id}
            className={cn(
              'lg:col-span-2',
              isOrphan &&
                'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.5rem)] lg:col-start-3 lg:mx-0 lg:w-full',
            )}
          >
            <DestinationCard
              href={destinationHref(locale, card.id)}
              src={card.src}
              alt={info.alt}
              name={info.name}
              tagline={info.tagline}
              badge={card.available ? destinations.availableBadge : destinations.soonBadge}
              cta={card.available ? destinations.launchCta : destinations.soonCta}
              available={card.available}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </li>
        )
      })}
    </ul>
  )
}
