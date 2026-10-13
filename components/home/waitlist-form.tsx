'use client'

import { useId, useState, type FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { trackPixel } from '@/lib/meta-pixel'
import { whatsappUrl } from '@/lib/site'
import type { Dictionary } from '@/lib/i18n/es'

type Copy = Dictionary['destinations']['waitlist']
type FieldName = 'name' | 'country' | 'phone'
type Errors = Partial<Record<FieldName, string>>

type WaitlistFormProps = {
  destination: string
  copy: Copy
  message: string
  details: string
  onSent?: () => void
}

const inputClass =
  'w-full rounded-sm border border-ink/25 bg-background px-4 py-3 text-base text-ink placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-terracotta'

const phonePattern = /^\+?[\d\s().-]{7,20}$/

export function WaitlistForm({ destination, copy, message, details, onSent }: WaitlistFormProps) {
  const baseId = useId()
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (key: FieldName) => String(data.get(key) ?? '').trim()
    const values = { name: value('name'), country: value('country'), phone: value('phone') }

    const nextErrors: Errors = {}
    if (values.name.length < 2) nextErrors.name = copy.errors.name
    if (values.country.length < 2) nextErrors.country = copy.errors.country
    if (!phonePattern.test(values.phone)) nextErrors.phone = copy.errors.phone
    setErrors(nextErrors)

    const firstInvalid = (['name', 'country', 'phone'] as const).find((key) => nextErrors[key])
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const fullMessage = [
      message.replace('{destination}', destination),
      details
        .replace('{name}', values.name)
        .replace('{country}', values.country)
        .replace('{phone}', values.phone),
    ].join(' ')

    trackPixel('Lead', { content_name: `waitlist-${destination}` })
    const url = whatsappUrl(fullMessage)
    const opened = window.open(url, '_blank')
    if (opened) opened.opener = null
    else window.location.assign(url)
    onSent?.()
  }

  const fields: { name: FieldName; label: string; placeholder: string; type: string; autoComplete: string }[] = [
    { name: 'name', label: copy.name, placeholder: copy.namePlaceholder, type: 'text', autoComplete: 'name' },
    {
      name: 'country',
      label: copy.country,
      placeholder: copy.countryPlaceholder,
      type: 'text',
      autoComplete: 'country-name',
    },
    { name: 'phone', label: copy.phone, placeholder: copy.phonePlaceholder, type: 'tel', autoComplete: 'tel' },
  ]

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {fields.map((field) => {
        const error = errors[field.name]
        const errorId = `${baseId}-${field.name}-error`
        return (
          <div key={field.name}>
            <label htmlFor={`${baseId}-${field.name}`} className="mb-2 block text-sm font-medium">
              {field.label}
            </label>
            <input
              id={`${baseId}-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              inputMode={field.name === 'phone' ? 'tel' : undefined}
              placeholder={field.placeholder}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? errorId : undefined}
              className={inputClass}
            />
            {error && (
              <p id={errorId} role="alert" className="mt-2 text-sm text-terracotta">
                {error}
              </p>
            )}
          </div>
        )
      })}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-salt transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <MessageCircle aria-hidden="true" className="size-4" />
        {copy.submit}
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">{copy.privacy}</p>
    </form>
  )
}
