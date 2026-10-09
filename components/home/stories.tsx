import { PhotoPlaceholder } from '@/components/site/photo'
import { Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'

export function Stories({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const { stories } = dict.home
  return (
    <section className="bg-sand py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{stories.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-6xl">{stories.title}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{stories.text}</p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {stories.items.map((item) => (
            <li key={item}>
              <PhotoPlaceholder
                label={dict.photo.pending}
                caption={item}
                className="aspect-[16/10] w-full rounded-sm bg-salt"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
