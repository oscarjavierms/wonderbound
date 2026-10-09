'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui'
import { trackPixel } from '@/lib/meta-pixel'
import type { Dictionary, Locale } from '@/lib/i18n/config'
import { href, whatsappUrl } from '@/lib/site'
import { cn } from '@/lib/utils'

type Fields = 'name' | 'email' | 'country' | 'reason' | 'message' | 'consent'
type Status = 'idle' | 'sending' | 'success' | 'error'

const reasonKeys = ['bolivia', 'upcoming', 'general', 'other'] as const

const inputClass =
  'w-full rounded-sm border border-ink/25 bg-salt px-4 py-3 text-base text-ink placeholder:text-muted-foreground focus-visible:border-terracotta focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-terracotta aria-[invalid=true]:border-destructive'

export function ContactForm({
  locale,
  dict,
  defaultReason = 'bolivia',
}: {
  locale: Locale
  dict: Dictionary
  defaultReason?: (typeof reasonKeys)[number]
}) {
  const c = dict.contact
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      country: String(data.get('country') ?? '').trim(),
      reason: String(data.get('reason') ?? ''),
      message: String(data.get('message') ?? '').trim(),
      consent: data.get('consent') === 'on',
      website: String(data.get('website') ?? ''),
      locale,
    }

    const next: Partial<Record<Fields, string>> = {}
    if (values.name.length < 2) next.name = c.validation.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = c.validation.email
    if (values.country.length < 2) next.country = c.validation.country
    if (!reasonKeys.includes(values.reason as (typeof reasonKeys)[number]))
      next.reason = c.validation.reason
    if (values.message.length < 5) next.message = c.validation.message
    if (!values.consent) next.consent = c.validation.consent
    setErrors(next)
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('request failed')
      setStatus('success')
      trackPixel('Lead', { content_name: values.reason })
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const field = (name: Fields) => ({
    id: `${id}-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  })

  const error = (name: Fields) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-1.5 text-sm text-destructive">
        {errors[name]}
      </p>
    ) : null

  const label = 'mb-2 block text-sm font-medium'

  return (
    <section id="contacto" className="scroll-mt-24 bg-sand py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{dict.cta.reserve}</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-5xl">{c.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{c.text}</p>
          <p className="mt-8 text-sm text-muted-foreground">{c.or}</p>
          <ButtonLink
            href={whatsappUrl(dict.whatsapp.bolivia)}
            external
            variant="ink"
            className="mt-3"
          >
            {dict.cta.whatsapp}
          </ButtonLink>
        </div>

        <div className="lg:col-span-7">
          {status === 'success' ? (
            <div role="status" className="rounded-sm border border-ink/15 bg-salt p-8">
              <p className="font-display text-3xl">{c.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-6 rounded-sm bg-salt p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-name`} className={label}>
                    {c.fields.name}
                  </label>
                  <input {...field('name')} type="text" autoComplete="name" className={inputClass} />
                  {error('name')}
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className={label}>
                    {c.fields.email}
                  </label>
                  <input
                    {...field('email')}
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                  />
                  {error('email')}
                </div>
                <div>
                  <label htmlFor={`${id}-country`} className={label}>
                    {c.fields.country}
                  </label>
                  <input
                    {...field('country')}
                    type="text"
                    autoComplete="country-name"
                    className={inputClass}
                  />
                  {error('country')}
                </div>
                <div>
                  <label htmlFor={`${id}-reason`} className={label}>
                    {c.fields.reason}
                  </label>
                  <select {...field('reason')} defaultValue={defaultReason} className={inputClass}>
                    <option value="">{c.fields.reasonPlaceholder}</option>
                    {reasonKeys.map((key) => (
                      <option key={key} value={key}>
                        {c.reasons[key]}
                      </option>
                    ))}
                  </select>
                  {error('reason')}
                </div>
              </div>

              <div>
                <label htmlFor={`${id}-message`} className={label}>
                  {c.fields.message}
                </label>
                <textarea {...field('message')} rows={5} className={cn(inputClass, 'resize-y')} />
                {error('message')}
              </div>

              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor={`${id}-website`}>Website</label>
                <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    {...field('consent')}
                    type="checkbox"
                    className="mt-1 size-4 shrink-0 accent-terracotta"
                  />
                  <label htmlFor={`${id}-consent`} className="text-sm leading-relaxed">
                    {c.consent.before}
                    <Link href={href(locale, 'privacy')} className="underline underline-offset-4">
                      {c.consent.link}
                    </Link>
                    {c.consent.after}
                  </label>
                </div>
                {error('consent')}
              </div>

              <div className="flex flex-col items-start gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center rounded-full border border-terracotta bg-terracotta px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
                >
                  {status === 'sending' ? c.sending : c.submit}
                </button>
                {status === 'error' && (
                  <p role="alert" className="text-sm text-destructive">
                    {c.error}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
