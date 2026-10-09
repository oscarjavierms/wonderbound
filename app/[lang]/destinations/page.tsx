import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/site/closing-cta'
import { PageHeader } from '@/components/site/page-header'
import { Photo, PhotoPlaceholder } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, hasLocale } from '@/lib/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { href, photos } from '@/lib/site'
import { cn } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  return pageMetadata(lang, 'destinations', 'destinations')
}

const gallery = [
  { src: photos.salarPink.src, shape: 'aspect-[4/5]' },
  { src: photos.sunsetOrange.src, shape: 'aspect-[4/5]' },
  { src: photos.llama.src, shape: 'aspect-[4/5]' },
  { src: photos.desertRock.src, shape: 'aspect-[4/5]' },
  { src: photos.stars.src, shape: 'aspect-[4/5]' },
  { src: photos.saltStairs.src, shape: 'aspect-[4/5]' },
]

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const d = dict.destinations

  return (
    <>
      <PageHeader eyebrow={d.eyebrow} title={d.title} text={d.text} />

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/15 pb-6">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow rounded-full bg-terracotta px-3 py-1 text-[0.65rem] text-white">
                  {d.tags.next}
                </span>
              </div>
              <h2 className="mt-4 text-5xl md:text-6xl">{d.bolivia.name}</h2>
              <p className="mt-3 max-w-xl text-lg text-muted-foreground">{d.bolivia.text}</p>
            </div>
            <ButtonLink href={href(lang, 'bolivia')} variant="dark">
              {d.bolivia.cta}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
            {gallery.map((item, index) => (
              <li key={item.src} className={cn(index % 3 === 1 && 'lg:mt-10')}>
                <figure>
                  <Photo
                    src={item.src}
                    alt={d.bolivia.gallery[index].alt}
                    className={cn('w-full rounded-sm', item.shape)}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                  <figcaption className="mt-3 font-display text-xl">
                    {d.bolivia.gallery[index].caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <h2 className="text-4xl md:text-5xl">{d.others.title}</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {d.others.items.map((item) => (
              <li key={item.name}>
                <PhotoPlaceholder
                  label={dict.photo.pending}
                  caption={item.name}
                  className="aspect-[16/10] w-full rounded-sm bg-salt"
                />
                <div className="mt-4 flex items-center gap-3">
                  <span className="eyebrow rounded-full border border-ink/25 px-3 py-1 text-[0.65rem]">
                    {d.tags.visited}
                  </span>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">{d.note}</p>
        </Container>
      </section>

      <ClosingCta locale={lang} />
    </>
  )
}
