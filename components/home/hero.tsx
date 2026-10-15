import { Photo } from '@/components/site/photo'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { photos } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { brand, title, text, imageAlt } = dict.home.hero
  return (
    <section className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden text-white">
      <Photo
        src={photos.sunsetPurple.src}
        alt={imageAlt}
        className="absolute inset-0 -z-30"
        imageClassName="object-[center_30%] md:object-[center_32%]"
        sizes="100vw"
        priority
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-t from-black/60 via-black/30 to-black/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.35),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center">
        <h1 className="hero-copy text-balance font-display text-[2.75rem] font-medium leading-[1.02] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
          {brand}
        </h1>
        <p className="hero-copy mt-8 max-w-md text-balance text-center text-lg leading-snug sm:mt-10 sm:text-2xl">
          {title}
        </p>
        <p className="hero-copy mt-5 max-w-md text-balance text-center text-base leading-relaxed text-white/90">
          {text}
        </p>
      </div>
    </section>
  )
}
