import { Photo } from '@/components/site/photo'
import { ButtonLink, Container } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden text-white">
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
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/35"
      />
      <Container className="pb-14 pt-32 md:pb-20">
        <h1 className="max-w-3xl text-5xl leading-[1] sm:text-6xl md:text-7xl">
          {dict.home.hero.title}
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-white/90">
          {dict.home.hero.text}
        </p>
        <ButtonLink href={href(locale, 'bolivia')} className="mt-8">
          {dict.cta.discoverBolivia}
        </ButtonLink>
      </Container>
    </section>
  )
}
