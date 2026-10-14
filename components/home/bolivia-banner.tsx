import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos } from '@/lib/site'

export function BoliviaBanner({ locale }: { locale: Locale }) {
  const { bolivia } = getDictionary(locale).home
  return (
    <section className="py-8 sm:py-16 md:py-24" aria-labelledby="bolivia-banner-title">
      <Container>
        <div className="relative isolate overflow-hidden rounded-sm bg-ink text-white md:min-h-[34rem]">
          <Photo
            src={photos.salarVehicle.src}
            alt={bolivia.imageAlt}
            className="h-72 w-full bg-ink sm:h-80 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[62%]"
            imageClassName="object-[center_50%]"
            sizes="(min-width: 1280px) 760px, (min-width: 768px) 62vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-48 h-24 bg-gradient-to-t from-ink to-transparent sm:top-56 md:inset-y-0 md:left-[38%] md:right-auto md:h-auto md:w-[24%] md:bg-gradient-to-r"
          />
          <div className="relative flex flex-col justify-end p-6 sm:p-8 md:min-h-[34rem] md:max-w-[52%] md:p-14">
            <Eyebrow className="text-white/85">{bolivia.eyebrow}</Eyebrow>
            <h2
              id="bolivia-banner-title"
              className="mt-5 max-w-2xl text-5xl leading-[0.98] lg:text-6xl"
            >
              {bolivia.title}
            </h2>
            <p className="mt-6 max-w-lg text-lg md:max-w-md leading-relaxed text-white/90">{bolivia.text}</p>
            <ButtonLink href={href(locale, 'bolivia')} className="mt-10 self-start">
              {bolivia.cta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
