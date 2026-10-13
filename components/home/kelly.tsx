import { InstagramLink } from '@/components/site/instagram-link'
import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos, social } from '@/lib/site'

export function KellySection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { kelly } = dict.home
  return (
    <section className="py-8 sm:py-16 md:py-24">
      <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-20 lg:gap-32">
        <Photo
          src={photos.founder.src}
          alt={kelly.imageAlt}
          className="aspect-[4/5] w-full"
          sizes="(min-width: 768px) 50vw, 100vw"
          position="center 20%"
        />
        <div className="max-w-lg">
          <Eyebrow className="text-muted-foreground">{kelly.eyebrow}</Eyebrow>
          <div className="mt-6 flex items-center gap-4">
            <h2 className="text-5xl leading-none md:text-7xl">{kelly.title}</h2>
            <InstagramLink
              href={social.founderInstagram}
              label={kelly.instagramLabel}
              className="shrink-0 rounded-full border border-ink/20 text-ink"
            />
          </div>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {kelly.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href={href(locale, 'about')} variant="dark" arrow={false} className="mt-10">
            {dict.cta.knowOurStory}
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
