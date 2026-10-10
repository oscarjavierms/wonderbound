import { ArrowUpRight } from 'lucide-react'
import { Photo } from '@/components/site/photo'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { destinationCards, whatsappUrl } from '@/lib/site'

export function DestinationCards({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { cards } = dict.destinations

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {destinationCards.map((card, index) => {
        const info = cards[index]
        return (
          <li key={card.id}>
            <a
              href={whatsappUrl(dict.whatsapp.destination.replace('{destination}', info.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative isolate block aspect-[4/5] overflow-hidden rounded-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <Photo
                src={card.src}
                alt={info.alt}
                className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent"
              />
              <div className="flex h-full flex-col justify-end p-6">
                <h3 className="text-4xl leading-none">{info.name}</h3>
                <p className="mt-2 flex items-center justify-between gap-3 text-sm text-white/85">
                  {info.tagline}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 translate-y-1 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  />
                </p>
              </div>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
