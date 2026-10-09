import { Photo } from '@/components/site/photo'
import { ButtonLink, Container, Signature } from '@/components/site/ui'
import { getDictionary, type Locale } from '@/lib/i18n/config'
import { href, photos, whatsappUrl } from '@/lib/site'

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
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/65" />
      <Container className="flex flex-col items-center py-24 text-center md:py-36">
        <h2 className="max-w-3xl text-5xl md:text-7xl">{title ?? dict.home.closing.title}</h2>
        <p className="mt-6 max-w-xl text-lg text-white/85">{text ?? dict.home.closing.text}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={href(locale, 'bolivia')}>{dict.cta.discoverBolivia}</ButtonLink>
          <ButtonLink
            href={whatsappUrl(message ?? dict.whatsapp.general)}
            external
            variant="light"
          >
            {dict.cta.whatsapp}
          </ButtonLink>
        </div>
        <Signature className="mt-12 text-white/90">{dict.signature}</Signature>
      </Container>
    </section>
  )
}
