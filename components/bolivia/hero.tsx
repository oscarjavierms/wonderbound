import { Banknote, Calendar, Camera, Users } from 'lucide-react'
import { Photo } from '@/components/site/photo'
import { ButtonLink, Container } from '@/components/site/ui'
import type { Dictionary } from '@/lib/i18n/es'
import { photos } from '@/lib/site'

export function BoliviaHero({ b }: { b: Dictionary['bolivia'] }) {
  const facts = [
    { icon: Calendar, text: b.facts.dates },
    { icon: Camera, text: b.facts.photos },
    { icon: Banknote, text: b.facts.price },
  ]

  return (
    <section className="relative isolate overflow-hidden text-white">
      <Photo
        src={photos.salarWide.src}
        alt={b.hero.imageAlt}
        className="absolute inset-0 -z-10"
        sizes="100vw"
        priority
        position="center 35%"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/30" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/70 to-transparent"
      />
      <Container className="flex min-h-svh flex-col justify-end pb-10 pt-36 md:pb-14">
        <ul className="flex flex-wrap gap-2">
          <li className="eyebrow rounded-full border border-white/40 bg-white/15 px-4 py-2 text-white backdrop-blur-sm">
            {b.eyebrow}
          </li>
          <li className="eyebrow flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-white backdrop-blur-sm">
            <Users aria-hidden="true" className="size-3.5" />
            {b.maxTravelers}
          </li>
        </ul>
        <h1 className="mt-6 max-w-4xl text-balance text-5xl leading-[1.02] md:text-8xl">
          {b.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/90 md:text-xl">
          {b.hero.subtitle}
        </p>
        <div className="mt-8">
          <ButtonLink href="#reserva">{b.hero.cta}</ButtonLink>
        </div>

        <ul
          aria-label={b.facts.label}
          className="mt-10 flex flex-col gap-3 border-t border-white/30 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3"
        >
          {facts.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-base font-medium">
              <Icon aria-hidden="true" className="size-5 shrink-0 text-white/80" />
              {text}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
