import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { MetaPixel } from '@/components/analytics/meta-pixel'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { getDictionary, hasLocale, locales } from '@/lib/i18n/config'
import { href, siteUrl } from '@/lib/site'
import '../globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: '/es', en: '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      images: [{ url: '/images/sunset-purple.jpg' }],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#14162b',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-salt"
        >
          {dict.nav.skip}
        </a>
        <Header locale={lang} labels={dict.nav} />
        <main id="main">{children}</main>
        <Footer locale={lang} />
        <WhatsAppButton label={dict.whatsapp.floatingLabel} messages={dict.whatsapp} />
        <MetaPixel locale={lang} privacyHref={href(lang, 'privacy')} labels={dict.consent} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yycq2cotuz");
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K57NX0ZEMP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K57NX0ZEMP', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}
