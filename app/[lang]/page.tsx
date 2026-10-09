import { notFound } from 'next/navigation'
import { Approach } from '@/components/home/approach'
import { DestinationsTeaser } from '@/components/home/destinations-teaser'
import { Hero } from '@/components/home/hero'
import { KellySection } from '@/components/home/kelly'
import { NextExpedition } from '@/components/home/next-expedition'
import { Stories } from '@/components/home/stories'
import { ClosingCta } from '@/components/site/closing-cta'
import { Faq } from '@/components/site/faq'
import { Pillars } from '@/components/site/pillars'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { href, whatsappUrl } from '@/lib/site'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <>
      <Hero locale={lang} />
      <Approach locale={lang} />
      <NextExpedition locale={lang} />
      <Pillars locale={lang} />
      <KellySection locale={lang} />
      <DestinationsTeaser locale={lang} />
      <Stories locale={lang} />
      <Faq
        eyebrow={dict.home.faq.eyebrow}
        title={dict.home.faq.title}
        items={dict.home.faq.items}
        footer={
          <p>
            {dict.home.faq.more}{' '}
            <a
              href={whatsappUrl(dict.whatsapp.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-4"
            >
              WhatsApp
            </a>
            {' · '}
            <a href={href(lang, 'bolivia', 'contacto')} className="text-ink underline underline-offset-4">
              {dict.contact.fields.email}
            </a>
          </p>
        }
      />
      <ClosingCta locale={lang} />
    </>
  )
}
