import { notFound } from 'next/navigation'
import { LegalDocument } from '@/components/site/legal-document'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'terms', 'terms', getDictionary(lang).legal.terms.intro)
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const { legal } = getDictionary(lang)
  return (
    <LegalDocument
      title={legal.terms.title}
      intro={legal.terms.intro}
      sections={legal.terms.sections}
      draftNotice={legal.draftNotice}
      updated={legal.updated}
    />
  )
}
