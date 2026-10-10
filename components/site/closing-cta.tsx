import { Photo } from '@/components/site/photo'
import { ButtonLink, Container } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { photos, whatsappUrl } from '@/lib/site'

type Props = {
  locale: Locale
  title?: string
  text?: string
  message?: string
}

export function ClosingCta({ locale, title, text, message }: Props) {
  const dict = getDictionary(locale)
  return (
    <section className="relative isolate overflow-hidden text-white">
      <Photo
        src={photos.salarWide.src}
        alt=""
        className="absolute inset-0 -z-10"
        sizes="100vw"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />
      <Container className="flex flex-col items-center py-28 text-center md:py-40">
        <h2 className="max-w-2xl text-4xl leading-[1.05] md:text-6xl">
          {title ?? dict.home.closing.title}
        </h2>
        <p className="mt-5 max-w-md text-lg text-white/85">{text ?? dict.home.closing.text}</p>
        <ButtonLink
          href={whatsappUrl(message ?? dict.whatsapp.general)}
          external
          className="mt-10"
        >
          {dict.cta.whatsapp}
        </ButtonLink>
      </Container>
    </section>
  )
}
