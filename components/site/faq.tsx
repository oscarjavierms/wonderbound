import { Plus } from 'lucide-react'
import { Container, Eyebrow } from '@/components/site/ui'
import { cn } from '@/lib/utils'

type FaqProps = {
  eyebrow: string
  title: string
  items: { q: string; a: string }[]
  className?: string
  footer?: React.ReactNode
}

export function Faq({ eyebrow, title, items, className, footer }: FaqProps) {
  return (
    <section className={cn('py-20 md:py-28', className)}>
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl">{title}</h2>
          {footer && <div className="mt-6 text-muted-foreground">{footer}</div>}
        </div>
        <div className="lg:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-2xl marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    aria-hidden="true"
                    className="size-5 shrink-0 text-terracotta transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
