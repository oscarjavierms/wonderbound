import { notFound } from 'next/navigation'
import { TrackView } from '@/components/analytics/track-view'
import { BoliviaBookingForm } from '@/components/bolivia/booking-form'
import { BoliviaFaq } from '@/components/bolivia/faq'
import { BoliviaFit } from '@/components/bolivia/fit'
import { BoliviaHero } from '@/components/bolivia/hero'
import { BoliviaIncludes } from '@/components/bolivia/includes'
import { BoliviaInvestment } from '@/components/bolivia/investment'
import { BoliviaItinerary } from '@/components/bolivia/itinerary'
import { BoliviaPhotoCarousel } from '@/components/bolivia/photo-carousel'
import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'bolivia', 'bolivia', getDictionary(lang).bolivia.description)
}

export default async function BoliviaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const b = dict.bolivia

  return (
    <>
      <TrackView content="bolivia-2027" />
      <BoliviaHero b={b} />
      <BoliviaPhotoCarousel b={b} />
      <BoliviaItinerary b={b} />
      <BoliviaIncludes b={b} />
      <BoliviaInvestment b={b} />
      <BoliviaFit b={b} />
      <BoliviaFaq b={b} locale={lang} termsLabel={dict.footer.terms} />

      <section id="reserva" aria-labelledby="bolivia-booking-title" className="scroll-mt-24 py-16 md:py-24">
        <Container className="max-w-2xl">
          <Eyebrow>{b.booking.eyebrow}</Eyebrow>
          <h2 id="bolivia-booking-title" className="mt-4 text-balance text-4xl md:text-6xl">
            {b.booking.title}
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {b.booking.text}
          </p>
          <div className="mt-10">
            <BoliviaBookingForm booking={b.booking} />
          </div>
        </Container>
      </section>
    </>
  )
}
