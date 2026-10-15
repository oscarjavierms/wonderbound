import Image from 'next/image'
import { HeroStage } from '@/components/home/hero-stage'
import { Photo } from '@/components/site/photo'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { photos } from '@/lib/site'

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { brand, title, text, imageAlt } = dict.home.hero
  return (
    <HeroStage className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden text-white">
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="hero-emblem w-[125%] max-w-[1000px] opacity-40">
          <Image
            src="/images/emblema-montanas.png"
            alt=""
            width={1774}
            height={887}
            sizes="(min-width: 1024px) 1000px, 125vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-16 pt-28 text-center">
        <div className="font-display text-[2.75rem] italic leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl">
          <h1 className="hero-title">{brand}</h1>
          <div aria-hidden="true" className="pointer-events-none h-[0.9em] select-none overflow-hidden">
            <p className="hero-reflection">{brand}</p>
          </div>
        </div>
        <h2 className="hero-copy mt-6 max-w-md text-lg leading-snug sm:text-2xl">{title}</h2>
        <p className="hero-copy mt-4 max-w-md text-base leading-relaxed text-white/90">{text}</p>
      </div>
    </HeroStage>
  )
}
