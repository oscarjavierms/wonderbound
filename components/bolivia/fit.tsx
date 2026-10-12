import { Check, X } from 'lucide-react'
import { Container, Eyebrow } from '@/components/site/ui'
import type { Dictionary } from '@/lib/i18n/es'

export function BoliviaFit({ b }: { b: Dictionary['bolivia'] }) {
  return (
    <section aria-labelledby="bolivia-fit-title" className="pb-16 md:pb-24">
      <Container>
        <Eyebrow>{b.fit.eyebrow}</Eyebrow>
        <h2 id="bolivia-fit-title" className="mt-4 text-4xl md:text-6xl">
          {b.fit.title}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-sm bg-[oklch(0.95_0.04_150)] p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl">{b.fit.yes.title}</h3>
            <ul className="mt-6 space-y-4">
              {b.fit.yes.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-[oklch(0.42_0.12_150)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm bg-sand p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl">{b.fit.no.title}</h3>
            <ul className="mt-6 space-y-4">
              {b.fit.no.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <X aria-hidden="true" className="mt-1 size-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
