import { TestimonialCard } from '@/components/home/testimonial-card'
import { Carousel } from '@/components/site/carousel'
import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { testimonialAvatars } from '@/lib/site'

export function Testimonials({ locale }: { locale: Locale }) {
  const { testimonials } = getDictionary(locale).home
  return (
    <section className="bg-background py-8 sm:py-16 md:py-24">
      <Container>
        <div className="text-center">
          <Eyebrow className="text-muted-foreground">{testimonials.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-4xl leading-[1.05] md:mt-6 md:text-6xl">{testimonials.title}</h2>
        </div>
        <div className="mx-auto mt-6 max-w-6xl md:mt-12">
          <Carousel
            label={testimonials.carouselLabel}
            prevLabel={testimonials.prev}
            nextLabel={testimonials.next}
          >
            {testimonials.items.map((item, index) => (
              <li key={item.name} className="w-[88%] shrink-0 snap-start sm:w-[26rem] md:w-[calc((100%-1rem)/2)]">
                <TestimonialCard
                  name={item.name}
                  trip={item.trip}
                  quote={item.quote}
                  avatarSrc={testimonialAvatars[index] ?? null}
                  readMore={testimonials.readMore}
                  readLess={testimonials.readLess}
                />
              </li>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  )
}
