import { Carousel } from '@/components/site/carousel'
import { Photo } from '@/components/site/photo'
import { Container, Eyebrow } from '@/components/site/ui'
import type { Dictionary } from '@/lib/i18n/es'
import { photos } from '@/lib/site'

const carouselPhotos = [
  photos.salarPoncho,
  photos.sunsetPurple,
  photos.salarPink,
  photos.sunsetOrange,
  photos.llama,
  photos.saltStairs,
  photos.desertRock,
  photos.stars,
]

export function BoliviaPhotoCarousel({ b }: { b: Dictionary['bolivia'] }) {
  return (
    <section aria-labelledby="bolivia-photos-title" className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{b.photos.eyebrow}</Eyebrow>
          <h2 id="bolivia-photos-title" className="mt-4 text-balance text-4xl md:text-6xl">
            {b.photos.title}
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {b.photos.text}
          </p>
        </div>
        <div className="mt-10">
          <Carousel label={b.photos.carouselLabel} prevLabel={b.photos.prev} nextLabel={b.photos.next}>
            {carouselPhotos.map((photo, index) => (
              <li key={photo.src} className="w-[72%] shrink-0 snap-start sm:w-64 md:w-72">
                <Photo
                  src={photo.src}
                  alt={b.photos.alts[index]}
                  className="aspect-[4/5] rounded-sm"
                  sizes="(min-width: 768px) 288px, 72vw"
                />
              </li>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  )
}
