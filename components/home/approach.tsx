import { Photo } from '@/components/site/photo'
import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { photos } from '@/lib/site'

export function Approach({ locale }: { locale: Locale }) {
  const { approach } = getDictionary(locale).home
  return (
    <section className="py-20 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-5xl leading-[1.02] md:text-6xl">{approach.title}</h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {approach.text}
          </p>
        </div>
        <div className="lg:col-span-6">
          <Photo
            src={photos.salarPoncho.src}
            alt={approach.imageAlt}
            className="aspect-[4/5] w-full rounded-sm"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Container>
    </section>
  )
}
