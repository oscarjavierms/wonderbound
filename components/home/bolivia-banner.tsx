import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'

export function BoliviaBanner({ locale }: { locale: Locale }) {
  const { bolivia } = getDictionary(locale).home
  return (
    <section className="pb-24 md:pb-36" aria-labelledby="bolivia-banner-title">
      <Container>
        <div className="relative isolate overflow-hidden rounded-sm text-white">
          <Photo
            src={photos.salarVehicle.src}
            alt={bolivia.imageAlt}
            className="absolute inset-0 -z-10"
            sizes="(min-width: 1280px) 1216px, 100vw"
            position="center 60%"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/5 max-md:bg-gradient-to-t max-md:from-ink/85 max-md:via-ink/40 max-md:to-ink/10"
          />
          <div className="flex min-h-[28rem] flex-col justify-end p-8 md:min-h-[32rem] md:p-14">
            <Eyebrow className="text-white/85">{bolivia.eyebrow}</Eyebrow>
            <h2
              id="bolivia-banner-title"
              className="mt-5 max-w-2xl text-5xl leading-[0.98] md:text-7xl"
            >
              {bolivia.title}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">{bolivia.text}</p>
            <ButtonLink href={href(locale, 'bolivia')} className="mt-10 self-start">
              {bolivia.cta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
