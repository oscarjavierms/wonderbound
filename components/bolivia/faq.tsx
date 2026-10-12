import Link from 'next/link'
import { Accordion, type AccordionItem } from '@/components/site/accordion'
import { Container, Eyebrow } from '@/components/site/ui'
import type { Dictionary } from '@/lib/i18n/es'
import type { Locale } from '@/lib/i18n/config'
import { href } from '@/lib/site'

type BoliviaFaqProps = {
  b: Dictionary['bolivia']
  locale: Locale
  termsLabel: string
}

export function BoliviaFaq({ b, locale, termsLabel }: BoliviaFaqProps) {
  const items: AccordionItem[] = b.faq.items.map((item, index) => ({
    id: `faq-${index}`,
    heading: <span className="font-display text-xl leading-snug md:text-2xl">{item.q}</span>,
    content: <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{item.a}</p>,
  }))

  return (
    <section aria-labelledby="bolivia-faq-title" className="bg-sand/60 py-16 md:py-24">
      <Container className="max-w-4xl">
        <Eyebrow>{b.faq.eyebrow}</Eyebrow>
        <h2 id="bolivia-faq-title" className="mt-4 text-4xl md:text-6xl">
          {b.faq.title}
        </h2>
        <Accordion items={items} className="mt-10" />
        <p className="mt-6 text-sm">
          <Link
            href={href(locale, 'terms')}
            className="underline underline-offset-4 hover:text-terracotta"
          >
            {termsLabel}
          </Link>
        </p>
      </Container>
    </section>
  )
}
