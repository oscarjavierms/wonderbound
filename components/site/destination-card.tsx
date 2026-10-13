import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Photo } from '@/components/site/photo'
import { cn } from '@/lib/utils'

type DestinationCardProps = {
  href: string
  src: string
  alt: string
  name: string
  tagline: string
  badge: string
  cta: string
  available: boolean
  sizes: string
  priority?: boolean
}

export function DestinationCard({
  href,
  src,
  alt,
  name,
  tagline,
  badge,
  cta,
  available,
  sizes,
  priority,
}: DestinationCardProps) {
  return (
    <Link
      href={href}
      className="group relative isolate block aspect-[4/5] overflow-hidden rounded-sm text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <Photo
        src={src}
        alt={alt}
        className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={sizes}
        priority={priority}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"
      />
      <span
        className={cn(
          'absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] shadow-md sm:left-5 sm:top-5',
          available ? 'bg-terracotta text-white' : 'bg-white/90 text-ink',
        )}
      >
        {badge}
      </span>
      <div className="flex h-full flex-col justify-end p-5 sm:p-6">
        <h3 className="text-4xl leading-none">{name}</h3>
        <p className="mt-3 text-sm leading-snug text-white/90">{tagline}</p>
        <span className="mt-4 inline-flex items-center gap-2 self-start border-b border-white pb-1 text-xs font-medium uppercase tracking-[0.18em]">
          {cta}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
