import { Photo } from '@/components/site/photo'
import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { photos } from '@/lib/site'
import { cn } from '@/lib/utils'

const tiles = [
  { src: photos.stars.src, aspect: 'aspect-[2/3]' },
  { src: photos.salarPink.src, aspect: 'aspect-square' },
  { src: photos.llama.src, aspect: 'aspect-[4/5]' },
  { src: photos.saltStairs.src, aspect: 'aspect-[3/4]' },
  { src: photos.desertRock.src, aspect: 'aspect-[4/3]' },
  { src: photos.sunsetOrange.src, aspect: 'aspect-[4/5]' },
]

export function Gallery({ locale }: { locale: Locale }) {
  const { gallery } = getDictionary(locale).home
  return (
    <section className="py-24 md:py-40">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="text-muted-foreground">{gallery.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-4xl leading-[1.05] md:text-6xl">{gallery.title}</h2>
        </div>
        <ul className="mt-16 columns-2 gap-3 md:mt-24 md:columns-3 md:gap-5">
          {tiles.map((tile, index) => (
            <li key={tile.src} className="mb-3 break-inside-avoid overflow-hidden md:mb-5">
              <Photo
                src={tile.src}
                alt={gallery.alts[index]}
                className={cn(
                  'w-full transition-transform duration-700 ease-out hover:scale-105',
                  tile.aspect,
                )}
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
