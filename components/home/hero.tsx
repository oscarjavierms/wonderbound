import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Signature } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden text-white">
      <Photo
        src={photos.sunsetPurple.src}
        alt={dict.home.hero.imageAlt}
        className="absolute inset-0 -z-10"
        sizes="100vw"
        priority
        position="center 60%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40"
      />
      <Container className="pb-16 pt-32 md:pb-24">
        <h1 className="max-w-4xl text-5xl leading-[0.98] sm:text-6xl md:text-8xl">
          {dict.home.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
          {dict.home.hero.text}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={href(locale, 'bolivia')}>{dict.cta.discoverBolivia}</ButtonLink>
          <ButtonLink href={href(locale, 'about')} variant="light">
            {dict.cta.meetWonderbound}
          </ButtonLink>
        </div>
        <Signature className="mt-10 text-white/80">{dict.signature}</Signature>
      </Container>
    </section>
  )
}
