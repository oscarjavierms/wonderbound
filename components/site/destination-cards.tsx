import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Photo } from '@/components/site/photo'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { destinationCards } from '@/lib/site'
import { cn } from '@/lib/utils'

export function DestinationCards({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { cards } = dict.destinations

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
      {destinationCards.map((card, index) => {
        const info = cards[index]
        return (
          <li
            key={card.id}
            className={cn(
              'col-span-1 lg:col-span-2',
              index === 0 && 'col-span-2 sm:col-span-1',
              index === 3 && 'lg:col-start-2',
              index === destinationCards.length - 1 && 'max-lg:col-span-2 max-lg:mx-auto max-lg:w-[calc(50%-0.375rem)]',
            )}
          >
            <Link
              href={`/${locale}/destinations/${card.id}`}
              className="group relative isolate block aspect-[4/5] overflow-hidden rounded-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <Photo
                src={card.src}
                alt={info.alt}
                className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent"
              />
              <div className="flex h-full flex-col justify-end p-4 sm:p-6">
                <h3 className="text-3xl leading-none sm:text-4xl">{info.name}</h3>
                <p className="mt-2 flex items-center justify-between gap-3 text-xs text-white/85 sm:text-sm">
                  {info.tagline}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 translate-y-1 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  />
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
