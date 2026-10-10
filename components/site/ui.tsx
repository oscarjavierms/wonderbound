import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'light' | 'dark' | 'ink'

const variants: Record<Variant, string> = {
  primary: 'bg-terracotta text-white hover:bg-terracotta/90 border border-terracotta',
  light: 'border border-white/70 text-white hover:bg-white hover:text-ink',
  dark: 'border border-ink/30 text-ink hover:bg-ink hover:text-salt',
  ink: 'bg-ink text-salt hover:bg-ink/90 border border-ink',
}

type ButtonLinkProps = {
  href: string
  variant?: Variant
  external?: boolean
  arrow?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function ButtonLink({
  href,
  variant = 'primary',
  external,
  arrow = true,
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
    variants[variant],
    className,
  )
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      )}
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  )
}

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 md:px-8', className)}>{children}</div>
}

export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('eyebrow text-muted-foreground', className)}>{children}</p>
}

export function Signature({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('font-display text-2xl italic', className)}>{children}</p>
}
