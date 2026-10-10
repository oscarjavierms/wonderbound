import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'

export function Testimonials({ locale }: { locale: Locale }) {
  const { testimonials } = getDictionary(locale).home
  return (
    <section className="bg-background py-24 md:py-40">
      <Container>
        <div className="text-center">
          <Eyebrow className="text-muted-foreground">{testimonials.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-4xl leading-[1.05] md:text-6xl">{testimonials.title}</h2>
        </div>
        <ul className="mx-auto mt-16 grid max-w-6xl gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
          {testimonials.items.map((item) => (
            <li key={item.name} className="flex">
              <figure className="flex w-full flex-col rounded-2xl border border-ink/10 bg-card p-8 md:p-12">
                <span aria-hidden="true" className="font-display text-7xl leading-none text-terracotta">
                  {'“'}
                </span>
                <blockquote className="mt-2 flex-1 font-display text-xl leading-relaxed text-ink md:text-2xl md:leading-relaxed">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-10 border-t border-ink/10 pt-6">
                  <p className="font-display text-2xl text-ink">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.trip}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
