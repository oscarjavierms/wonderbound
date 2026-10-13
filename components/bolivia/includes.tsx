import { Check, Plane, X } from 'lucide-react'
import { Container } from '@/components/site/ui'
import type { Dictionary } from '@/lib/i18n/es'

export function BoliviaIncludes({ b }: { b: Dictionary['bolivia'] }) {
  return (
    <section aria-label={b.includes.title} className="py-16 md:py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-sm border border-ink/10 bg-card p-6 md:p-10">
            <h2 className="text-3xl md:text-4xl">{b.includes.title}</h2>
            <ul className="mt-6 space-y-4">
              {b.includes.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-terracotta" />
                  {item}
                </li>
              ))}
              <li className="flex gap-3 leading-relaxed">
                <Plane aria-hidden="true" className="mt-1 size-5 shrink-0 text-terracotta" />
                {b.includes.flightsAdvice}
              </li>
            </ul>
          </div>
          <div className="rounded-sm border border-ink/10 bg-card p-6 md:p-10">
            <h2 className="text-3xl md:text-4xl">{b.excludes.title}</h2>
            <ul className="mt-6 space-y-4">
              {b.excludes.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <X aria-hidden="true" className="mt-1 size-5 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {b.importantNote}
        </p>
      </Container>
    </section>
  )
}
