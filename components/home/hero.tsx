import { Photo } from '@/components/site/photo'
import { Container } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { photos } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  return (
    <section className="relative isolate flex min-h-screen w-full items-end overflow-hidden text-white">
      <Photo
        src={photos.sunsetPurple.src}
        alt={dict.home.hero.imageAlt}
        className="absolute inset-0 -z-10"
        sizes="100vw"
        priority
        position="center 25%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/20"
      />
      <Container className="pb-16 pt-32 md:pb-24">
        <h1 className="font-display text-6xl italic leading-[0.95] sm:text-8xl md:text-9xl">
          {dict.home.hero.brand}
        </h1>
        <h2 className="mt-6 max-w-3xl text-2xl leading-tight sm:text-4xl md:text-5xl">
          {dict.home.hero.title}
        </h2>
        <p className="mt-6 max-w-sm text-left text-xs uppercase leading-relaxed tracking-[0.22em] text-white/85">
          {dict.home.hero.text}
        </p>
      </Container>
    </section>
  )
}
