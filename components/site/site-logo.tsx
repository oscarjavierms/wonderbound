import { cn } from '@/lib/utils'

type SiteLogoProps = {
  className?: string
}

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <span
      className={cn(
        'flex flex-col items-start leading-none text-current transition-colors duration-300 ease-out motion-reduce:transition-none',
        className,
      )}
    >
      <span className="font-display text-[1.75rem] font-medium tracking-tight md:text-[2rem]">
        Wonderbound
      </span>
      <span className="mt-1.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.5em] md:text-[0.6875rem]">
        Journeys
      </span>
    </span>
  )
}
