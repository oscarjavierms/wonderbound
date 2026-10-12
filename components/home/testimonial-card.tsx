'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type TestimonialCardProps = {
  name: string
  trip: string
  quote: string
  avatarSrc: string | null
  readMore: string
  readLess: string
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((part) => part.replace(/[^\p{L}]/gu, '')[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function TestimonialCard({ name, trip, quote, avatarSrc, readMore, readLess }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false)
  const quoteId = useId()

  return (
    <figure className="flex w-full flex-col rounded-2xl border border-ink/10 bg-card p-6 md:p-8">
      <div className="flex items-center gap-4">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt=""
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-full object-cover ring-2 ring-terracotta/40 ring-offset-2 ring-offset-card"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-terracotta/10 font-display text-2xl text-terracotta ring-2 ring-terracotta/40 ring-offset-2 ring-offset-card"
          >
            {initialsOf(name)}
          </span>
        )}
        <figcaption>
          <p className="font-display text-2xl leading-tight text-ink">{name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{trip}</p>
        </figcaption>
      </div>
      <blockquote className="mt-6 font-display text-lg leading-relaxed text-ink">
        <p id={quoteId} className={cn(!expanded && 'line-clamp-4')}>
          {quote}
        </p>
      </blockquote>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={quoteId}
        className="mt-4 self-start border-b border-terracotta py-1 text-xs font-medium uppercase tracking-[0.18em] text-terracotta focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {expanded ? readLess : readMore}
      </button>
    </figure>
  )
}
