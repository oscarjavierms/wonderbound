import { notFound } from 'next/navigation'
import { LegalDocument } from '@/components/site/legal-document'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'privacy', 'privacy', getDictionary(lang).legal.privacy.intro)
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const { legal } = getDictionary(lang)
  return (
    <LegalDocument
      title={legal.privacy.title}
      intro={legal.privacy.intro}
      sections={legal.privacy.sections}
      draftNotice={legal.draftNotice}
      updated={legal.updated}
    />
  )
}
