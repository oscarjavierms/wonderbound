'use client'

import { useId, useRef } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { WaitlistForm } from '@/components/home/waitlist-form'
import { Photo } from '@/components/site/photo'
import type { Dictionary } from '@/lib/i18n/es'

type WaitlistCardProps = {
  src: string
  alt: string
  name: string
  tagline: string
  badge: string
  sizes: string
  copy: Dictionary['destinations']['waitlist']
  message: string
  details: string
}

export function WaitlistCard({
  src,
  alt,
  name,
  tagline,
  badge,
  sizes,
  copy,
  message,
  details,
}: WaitlistCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="group relative isolate block aspect-[4/5] w-full overflow-hidden rounded-sm text-left text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <Photo
          src={src}
          alt={alt}
          className="absolute inset-0 -z-10 transition-transform duration-700 ease-out group-hover:scale-105"
          sizes={sizes}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink shadow-md sm:left-5 sm:top-5">
          {badge}
        </span>
        <span className="flex h-full flex-col justify-end p-5 sm:p-6">
          <span className="font-display text-4xl leading-none">{name}</span>
          <span className="mt-2 text-sm text-white/85">{tagline}</span>
          <span className="mt-4 inline-flex items-center gap-2 self-start border-b border-white pb-1 text-xs font-medium uppercase tracking-[0.18em]">
            {copy.cta}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
        className="m-auto w-[min(92vw,28rem)] rounded-sm bg-salt p-0 text-ink backdrop:bg-ink/60"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 id={titleId} className="text-3xl leading-tight">
              {copy.title.replace('{destination}', name)}
            </h3>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={copy.close}
              className="-mr-2 -mt-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.text}</p>
          <div className="mt-6">
            <WaitlistForm
              destination={name}
              copy={copy}
              message={message}
              details={details}
              onSent={() => dialogRef.current?.close()}
            />
          </div>
        </div>
      </dialog>
    </>
  )
}
