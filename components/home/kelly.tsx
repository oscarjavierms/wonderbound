import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'

export function KellySection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { kelly } = dict.home
  return (
    <section className="py-24 md:py-36">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <Photo
            src={photos.salarPoncho.src}
            alt={kelly.imageAlt}
            className="aspect-[4/5] w-full rounded-sm"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
        <div className="lg:col-span-7">
          <Eyebrow>{kelly.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{kelly.title}</h2>
          <div className="mt-8 max-w-md space-y-4 text-lg leading-relaxed text-muted-foreground">
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
