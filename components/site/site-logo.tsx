import { cn } from '@/lib/utils'

type SiteLogoProps = {
  className?: string
}

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <span
      className={cn(
        'flex items-center gap-2 text-current transition-colors duration-300 ease-out motion-reduce:transition-none md:gap-3',
        className,
      )}
    >
      <span aria-hidden="true" className="site-emblem h-[2.0125rem] w-[4.025rem] shrink-0 md:h-8 md:w-16" />
      <span className="flex flex-col items-start leading-none">
        <span className="font-display text-[1.75rem] font-medium tracking-tight md:text-[2rem]">
          Wonderbound
        </span>
        <span className="mt-1.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.5em] md:text-[0.6875rem]">
          Journeys
        </span>
      </span>
    </span>
  )
}
