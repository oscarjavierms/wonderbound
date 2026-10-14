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
        imageClassName="object-[center_30%] md:object-[center_32%]"
        sizes="100vw"
        priority
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/25"
      />
      <Container className="pb-28 pt-32 md:pb-20">
        <div className="max-w-sm">
          <h1 className="font-display text-5xl italic leading-[0.98] sm:text-6xl">
            {dict.home.hero.brand}
          </h1>
          <h2 className="mt-5 text-xl leading-snug sm:text-2xl">{dict.home.hero.title}</h2>
          <p className="mt-4 text-left text-base leading-relaxed text-white/90">
            {dict.home.hero.text}
          </p>
        </div>
      </Container>
    </section>
  )
}
