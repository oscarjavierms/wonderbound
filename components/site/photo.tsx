import Image from 'next/image'
import { Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

type PhotoProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  position?: string
  imageClassName?: string
}

export function Photo({
  src,
  alt,
  className,
  sizes = '100vw',
  priority,
  position,
  imageClassName,
}: PhotoProps) {
  return (
    <div className={cn('relative overflow-hidden bg-sand', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-cover', imageClassName)}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  )
}

export function PhotoPlaceholder({
  label,
  caption,
  className,
}: {
  label: string
  caption?: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-sand text-center text-muted-foreground',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-sm border border-dashed border-ink/25"
      />
      <Camera aria-hidden="true" className="size-6" />
      <span className="eyebrow">{label}</span>
      {caption && <figcaption className="font-display text-xl text-ink">{caption}</figcaption>}
    </figure>
  )
}
