'use client'

import { useRef, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type CarouselProps = {
  children: ReactNode
  label: string
  prevLabel: string
  nextLabel: string
  className?: string
}

export function Carousel({ children, label, prevLabel, nextLabel, className }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)

  function scrollTrack(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div>
      <ul
        ref={trackRef}
        aria-label={label}
        className={cn(
          'scrollbar-none -mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:mx-0 md:scroll-px-0 md:px-0',
          className,
        )}
      >
        {children}
      </ul>
      <div className="mt-4 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scrollTrack(-1)}
          aria-label={prevLabel}
          className="flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollTrack(1)}
          aria-label={nextLabel}
          className="flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  )
}
