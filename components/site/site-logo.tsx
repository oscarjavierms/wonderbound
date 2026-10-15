import Image from 'next/image'
import { cn } from '@/lib/utils'

type SiteLogoProps = {
  light?: boolean
  className?: string
}

const imageClass =
  'object-contain object-left transition-opacity duration-500 ease-out motion-reduce:transition-none'

export function SiteLogo({ light = false, className }: SiteLogoProps) {
  return (
    <span
      className={cn(
        'relative block aspect-[1000/906] h-[4.25rem] shrink-0 md:h-20',
        className,
      )}
    >
      <Image
        src="/images/logo-color.png"
        alt=""
        fill
        sizes="96px"
        loading="eager"
        className={cn(imageClass, light ? 'opacity-0' : 'opacity-100')}
      />
      <Image
        src="/images/logo-blanco.png"
        alt=""
        fill
        sizes="96px"
        loading="eager"
        className={cn(imageClass, light ? 'opacity-100' : 'opacity-0')}
      />
    </span>
  )
}
