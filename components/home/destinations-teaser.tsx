import { DestinationCarousel } from '@/components/home/destination-carousel'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href } from '@/lib/site'

export function DestinationsTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { destinations } = dict.home
  return (
    <section className="py-8 sm:py-16 md:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
          <div>
            <Eyebrow>{destinations.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-4xl leading-[1.05] md:mt-5 md:text-6xl">{destinations.title}</h2>
          </div>
          <ButtonLink href={href(locale, 'destinations')} variant="dark" className="max-sm:hidden">
            {destinations.cta}
          </ButtonLink>
        </div>
        <div className="mt-6 md:mt-12">
          <DestinationCarousel locale={locale} />
        </div>
        <ButtonLink href={href(locale, 'destinations')} variant="dark" className="mt-4 sm:hidden">
          {destinations.cta}
        </ButtonLink>
      </Container>
    </section>
  )
}
