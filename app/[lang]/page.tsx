import { notFound } from 'next/navigation'
import { DestinationsTeaser } from '@/components/home/destinations-teaser'
import { Hero } from '@/components/home/hero'
import { KellySection } from '@/components/home/kelly'
import { NextExpedition } from '@/components/home/next-expedition'
import { ClosingCta } from '@/components/site/closing-cta'
import { hasLocale } from '@/lib/i18n/config'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <>
      <Hero locale={lang} />
      <DestinationsTeaser locale={lang} />
      <NextExpedition locale={lang} />
      <KellySection locale={lang} />
      <ClosingCta locale={lang} />
    </>
  )
}
