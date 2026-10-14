import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n/config'

type LanguageSwitcherProps = {
  locale: Locale
  rest: string
  label: string
  className?: string
}

const options: { code: Locale; text: string; name: string }[] = [
  { code: 'es', text: 'ES', name: 'Español' },
  { code: 'en', text: 'EN', name: 'English' },
]

export function LanguageSwitcher({ locale, rest, label, className }: LanguageSwitcherProps) {
  return (
    <div role="group" aria-label={label} className={cn('eyebrow flex items-center gap-1.5 text-xs', className)}>
      {options.map((option, index) => (
        <span key={option.code} className="flex items-center gap-1.5">
          {index > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
          <Link
            href={`/${option.code}${rest}`}
            hrefLang={option.code}
            lang={option.code}
            aria-label={option.name}
            aria-current={option.code === locale ? 'true' : undefined}
            className={cn(
              'py-1 transition-opacity',
              option.code === locale ? 'border-b border-current' : 'opacity-50 hover:opacity-100',
            )}
          >
            {option.text}
          </Link>
        </span>
      ))}
    </div>
  )
}
