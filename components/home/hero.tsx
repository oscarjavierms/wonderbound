import Link from 'next/link'
import { Photo } from '@/components/site/photo'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { photos } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { brand, title, text, cta, imageAlt } = dict.home.hero
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

      <h1 className="hero-title mx-auto max-w-5xl px-6 pb-56 pt-24 text-center font-display text-[3rem] font-normal italic leading-[1.02] tracking-tight sm:pb-40 sm:text-7xl md:text-8xl lg:text-9xl">
        {brand}
      </h1>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
        <div className="max-w-sm text-left">
          <p className="hero-copy text-pretty text-left text-base font-medium leading-snug sm:text-lg">
            {title}
          </p>
          <p className="hero-copy mt-2 text-pretty text-left text-sm leading-relaxed text-white/80">
            {text}
          </p>
          <Link
            href={`/${locale}/expeditions`}
            className="mt-5 inline-flex min-h-11 items-center justify-center border border-white/60 bg-black/15 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
