import { PhotoPlaceholder } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href } from '@/lib/site'

export function KellySection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { kelly } = dict.home
  const [greeting, ...rest] = kelly.paragraphs
  return (
    <section className="bg-sand py-20 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <PhotoPlaceholder
            label={dict.photo.kellyPending}
            caption="Kelly Vega"
            className="aspect-[4/5] w-full rounded-sm bg-salt"
          />
        </div>
        <div className="lg:col-span-7">
          <Eyebrow>{kelly.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-5xl leading-[1.02] md:text-6xl">{kelly.title}</h2>
          <p className="mt-8 font-display text-3xl italic">{greeting}</p>
          <div className="mt-4 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            {rest.map((paragraph) => (
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
