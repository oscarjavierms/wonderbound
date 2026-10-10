import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/site/closing-cta'
import { DestinationCards } from '@/components/site/destination-cards'
import { PageHeader } from '@/components/site/page-header'
import { Container } from '@/components/site/ui'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'destinations', 'destinations')
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const d = getDictionary(lang).destinations

  return (
    <>
      <PageHeader eyebrow={d.eyebrow} title={d.title} text={d.text} />
      <section className="pb-24 md:pb-36">
        <Container>
          <DestinationCards locale={lang} />
          <p className="mt-8 text-sm text-muted-foreground">{d.note}</p>
        </Container>
      </section>
      <ClosingCta locale={lang} />
    </>
  )
}
