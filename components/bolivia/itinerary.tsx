import { Accordion, type AccordionItem } from '@/components/site/accordion'
import { Photo } from '@/components/site/photo'
import { Container, Eyebrow } from '@/components/site/ui'
import type { Dictionary } from '@/lib/i18n/es'
import { photos } from '@/lib/site'

const dayPhotos = [
  { photo: photos.laPaz, position: 'center 40%' },
  { photo: photos.valleLuna, position: 'center' },
  { photo: photos.saltStairs, position: 'center' },
  { photo: photos.stars, position: 'center' },
  { photo: photos.geiseres, position: 'center' },
  { photo: photos.laPaz, position: 'center 70%' },
  { photo: photos.sunsetOrange, position: 'center' },
]

export function BoliviaItinerary({ b }: { b: Dictionary['bolivia'] }) {
  const items: AccordionItem[] = b.itinerary.days.map((day, index) => {
    const { photo, position } = dayPhotos[index]
    return {
      id: `day-${index + 1}`,
      heading: (
        <span className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
          <span className="eyebrow shrink-0 text-terracotta">
            {b.itinerary.dayLabel} {index + 1}
          </span>
          <span>
            <span className="block font-display text-2xl leading-tight md:text-3xl">{day.title}</span>
            <span className="mt-1 block text-sm text-muted-foreground md:text-base">{day.subtitle}</span>
          </span>
        </span>
      ),
      content: (
        <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
          <Photo
            src={photo.src}
            alt={day.imageAlt}
            position={position}
            className="aspect-[4/5] w-full max-w-sm rounded-sm md:col-span-4"
            sizes="(min-width: 768px) 30vw, 90vw"
          />
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:col-span-8">
            {day.text}
          </p>
        </div>
      ),
    }
  })

  return (
    <section aria-labelledby="bolivia-itinerary-title" className="bg-sand/60 py-16 md:py-24">
      <Container className="max-w-4xl">
        <Eyebrow>{b.itinerary.eyebrow}</Eyebrow>
        <h2 id="bolivia-itinerary-title" className="mt-4 text-4xl md:text-6xl">
          {b.itinerary.title}
        </h2>
        <Accordion items={items} defaultOpenId="day-1" className="mt-10" />
      </Container>
    </section>
  )
}
