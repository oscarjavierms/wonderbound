import { DestinationCards } from '@/components/site/destination-cards'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href } from '@/lib/site'

export function DestinationsTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { destinations } = dict.home
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{destinations.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{destinations.title}</h2>
          </div>
          <ButtonLink href={href(locale, 'destinations')} variant="dark">
            {destinations.cta}
          </ButtonLink>
        </div>
        <div className="mt-12 md:mt-16">
          <DestinationCards locale={locale} />
        </div>
      </Container>
    </section>
  )
}
