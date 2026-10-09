import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'
import { cn } from '@/lib/utils'

const sources = [photos.llama.src, photos.desertRock.src, photos.stars.src, photos.saltStairs.src]
const shapes = ['aspect-[4/5]', 'aspect-[4/5] lg:mt-12', 'aspect-[4/5]', 'aspect-[4/5] lg:mt-12']

export function DestinationsTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { destinations } = dict.home
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{destinations.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-5xl leading-[1.02] md:text-6xl">{destinations.title}</h2>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:col-span-5">
            {destinations.text}
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {sources.map((src, index) => (
            <li key={src}>
              <figure>
                <Photo
                  src={src}
                  alt={destinations.alts[index]}
                  className={cn('w-full rounded-sm', shapes[index])}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
                <figcaption className="mt-3 font-display text-xl">
                  {destinations.captions[index]}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <ButtonLink href={href(locale, 'destinations')} variant="dark">
            {dict.cta.exploreDestinations}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
