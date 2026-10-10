import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'

export function KellySection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { kelly } = dict.home
  return (
    <section className="py-24 md:py-40">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-20 lg:gap-32">
        <Photo
          src={photos.salarPoncho.src}
          alt={kelly.imageAlt}
          className="aspect-[4/5] w-full"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="max-w-md">
          <Eyebrow className="text-muted-foreground">{kelly.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-5xl leading-none md:text-7xl">{kelly.title}</h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {kelly.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href={href(locale, 'about')} variant="dark" className="mt-10">
            {dict.cta.knowOurStory}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
