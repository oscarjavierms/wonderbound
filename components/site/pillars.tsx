import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function Pillars({
  locale,
  title,
  className,
}: {
  locale: Locale
  title?: string
  className?: string
}) {
  const { pillars } = getDictionary(locale).home
  return (
    <section className={cn('py-20 md:py-28', className)}>
      <Container>
        <Eyebrow>{pillars.eyebrow}</Eyebrow>
        {title && <h2 className="mt-4 text-4xl md:text-5xl">{title}</h2>}
        <ol className="mt-12 grid gap-x-10 gap-y-12 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.items.map((item, index) => (
            <li key={item.title}>
              <span aria-hidden="true" className="font-display text-lg italic text-terracotta">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-3xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
