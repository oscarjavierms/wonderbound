import { Photo } from '@/components/site/photo'
import { ButtonLink, Container } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'

export function Finale({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  return (
    <section id="salidas" className="relative isolate overflow-hidden text-white">
      <Photo src={photos.salarWide.src} alt="" className="absolute inset-0 -z-10" sizes="100vw" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/50" />
      <Container className="flex min-h-[80svh] flex-col items-center justify-center py-32 text-center">
        <h2 className="max-w-3xl text-5xl leading-[0.95] md:text-8xl">{dict.home.finale.title}</h2>
        <ButtonLink
          href={href(locale, 'bolivia')}
          className="mt-12 px-10 py-4 text-base"
        >
          {dict.cta.exploreExpeditions}
        </ButtonLink>
      </Container>
    </section>
  )
}
