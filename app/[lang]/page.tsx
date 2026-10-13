import { notFound } from 'next/navigation'
import { BoliviaBanner } from '@/components/home/bolivia-banner'
import { BrandClosing } from '@/components/home/brand-closing'
import { DestinationsTeaser } from '@/components/home/destinations-teaser'
import { Finale } from '@/components/home/finale'
import { Gallery } from '@/components/home/gallery'
import { Hero } from '@/components/home/hero'
import { KellySection } from '@/components/home/kelly'
import { Testimonials } from '@/components/home/testimonials'
import { hasLocale } from '@/lib/i18n/config'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <Hero locale={lang} />
      <DestinationsTeaser locale={lang} />
      <KellySection locale={lang} />
      <BoliviaBanner locale={lang} />
      <Gallery locale={lang} />
      <Testimonials locale={lang} />
      <Finale locale={lang} />
      <BrandClosing locale={lang} />
    </>
  )
}
