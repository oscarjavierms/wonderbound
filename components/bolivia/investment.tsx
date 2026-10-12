import { Container, Eyebrow } from '@/components/site/ui'
import type { Dictionary } from '@/lib/i18n/es'

export function BoliviaInvestment({ b }: { b: Dictionary['bolivia'] }) {
  const { investment } = b

  return (
    <section aria-labelledby="bolivia-investment-title" className="pb-16 md:pb-24">
      <Container>
        <div className="rounded-sm bg-ink p-6 text-salt md:p-12">
          <Eyebrow className="text-salt/70">{investment.eyebrow}</Eyebrow>
          <h2 id="bolivia-investment-title" className="mt-4 max-w-2xl text-balance text-4xl md:text-5xl">
            {investment.title}
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="eyebrow text-salt/70">{investment.totalLabel}</p>
              <p className="mt-2 font-display text-6xl leading-none md:text-7xl">{investment.total}</p>
              <p className="mt-3 text-salt/80">{investment.per}</p>
            </div>

            <ol aria-label={investment.stepsLabel} className="divide-y divide-salt/20 border-y border-salt/20 md:col-span-7">
              {investment.steps.map((step, index) => (
                <li key={step.label} className="flex items-center gap-4 py-5">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-salt/40 font-display text-lg"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{step.label}</p>
                    <p className="text-sm text-salt/70">{step.when}</p>
                  </div>
                  <p className="font-display text-2xl md:text-3xl">{step.amount}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-salt/70">{investment.note}</p>
        </div>
      </Container>
    </section>
  )
}
