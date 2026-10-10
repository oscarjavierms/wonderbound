import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'

export function Testimonials({ locale }: { locale: Locale }) {
  const { testimonials } = getDictionary(locale).home
  return (
    <section className="border-y border-ink/5 bg-white py-24 md:py-40">
      <Container>
        <div className="text-center">
          <Eyebrow className="text-muted-foreground">{testimonials.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-4xl leading-[1.05] md:text-6xl">{testimonials.title}</h2>
        </div>
        <ul className="mt-16 grid gap-14 md:mt-24 md:grid-cols-3 md:gap-12 lg:gap-20">
          {testimonials.items.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col items-center text-center">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-terracotta">
                  {'“'}
                </span>
                <blockquote className="mt-2 font-display text-2xl leading-snug italic md:text-[1.75rem]">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-8 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {item.name} · {item.trip}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
