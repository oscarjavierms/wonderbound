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
        className="absolute inset-0 -z-20 bg-gradient-to-t from-black/65 via-black/25 to-black/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.3),transparent_70%)]"
      />

      <h1 className="hero-title mx-auto max-w-5xl px-6 pb-32 pt-24 text-center font-display text-[3rem] font-normal italic leading-[1.02] tracking-tight sm:pb-24 sm:text-7xl md:text-8xl lg:text-9xl">
        {brand}
      </h1>

      <div className="absolute inset-x-0 bottom-0 pb-8 pl-6 pr-24 sm:px-10 sm:pb-12 lg:px-16">
        <div className="max-w-sm text-left">
          <p className="hero-copy text-pretty text-left text-base font-medium leading-snug sm:text-lg">
            {title}
          </p>
          <p className="hero-copy mt-2 text-pretty text-left text-sm leading-relaxed text-white/80">
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
