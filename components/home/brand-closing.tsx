import { Container } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'

export function BrandClosing({ locale }: { locale: Locale }) {
  const { signature } = getDictionary(locale)
  return (
    <section className="bg-[#FBFBFB] py-20 md:py-32" aria-label={signature}>
      <Container className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="h-px w-12 bg-ink/30" />
        <p className="mt-8 font-display text-4xl italic leading-tight text-ink md:text-6xl">{signature}</p>
      </Container>
    </section>
  )
}
