'use client'

import { useId, useState, type FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { trackPixel } from '@/lib/meta-pixel'
import { whatsappUrl } from '@/lib/site'
import type { Dictionary } from '@/lib/i18n/es'

type Booking = Dictionary['bolivia']['booking']
type FieldName = 'name' | 'origin' | 'availability' | 'companions'
type Errors = Partial<Record<FieldName, string>>

const inputClass =
  'w-full rounded-sm border border-ink/25 bg-background px-4 py-3 text-base text-ink placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-terracotta'

type ChoiceGroupProps = {
  legend: string
  name: FieldName
  options: { value: string; label: string }[]
  error?: string
  errorId: string
}

function ChoiceGroup({ legend, name, options, error, errorId }: ChoiceGroupProps) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined} data-invalid={error ? 'true' : undefined}>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input type="radio" name={name} value={option.label} className="peer sr-only" />
            <span className="inline-flex min-w-28 items-center justify-center rounded-full border border-ink/25 px-5 py-3 text-sm font-medium transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-salt peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-terracotta">
          {error}
        </p>
      )}
    </fieldset>
  )
}

export function BoliviaBookingForm({ booking }: { booking: Booking }) {
  const baseId = useId()
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (key: FieldName) => String(data.get(key) ?? '').trim()
    const values = {
      name: value('name'),
      origin: value('origin'),
      availability: value('availability'),
      companions: value('companions'),
    }

    const nextErrors: Errors = {}
    if (values.name.length < 2) nextErrors.name = booking.errors.name
    if (values.origin.length < 2) nextErrors.origin = booking.errors.origin
    if (!values.availability) nextErrors.availability = booking.errors.availability
    if (!values.companions) nextErrors.companions = booking.errors.companions
    setErrors(nextErrors)

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstInvalid) {
      event.currentTarget
        .querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus()
      return
    }

    const message = booking.message.replace(
      /\{(\w+)\}/g,
      (_, key: FieldName) => values[key] ?? '',
    )
    trackPixel('Lead', { content_name: 'bolivia-2027-booking' })
    const url = whatsappUrl(message)
    const opened = window.open(url, '_blank')
    if (opened) opened.opener = null
    else window.location.assign(url)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${baseId}-name`} className="mb-2 block text-sm font-medium">
          {booking.fields.name}
        </label>
        <input
          id={`${baseId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder={booking.fields.namePlaceholder}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id={`${baseId}-name-error`} role="alert" className="mt-2 text-sm text-terracotta">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${baseId}-origin`} className="mb-2 block text-sm font-medium">
          {booking.fields.origin}
        </label>
        <input
          id={`${baseId}-origin`}
          name="origin"
          type="text"
          autoComplete="address-level2"
          placeholder={booking.fields.originPlaceholder}
          aria-invalid={errors.origin ? 'true' : undefined}
          aria-describedby={errors.origin ? `${baseId}-origin-error` : undefined}
          className={inputClass}
        />
        {errors.origin && (
          <p id={`${baseId}-origin-error`} role="alert" className="mt-2 text-sm text-terracotta">
            {errors.origin}
          </p>
        )}
      </div>

      <ChoiceGroup
        legend={booking.fields.availability}
        name="availability"
        options={[
          { value: 'yes', label: booking.fields.yes },
          { value: 'no', label: booking.fields.no },
        ]}
        error={errors.availability}
        errorId={`${baseId}-availability-error`}
      />

      <ChoiceGroup
        legend={booking.fields.companions}
        name="companions"
        options={[
          { value: 'solo', label: booking.fields.solo },
          { value: 'accompanied', label: booking.fields.accompanied },
        ]}
        error={errors.companions}
        errorId={`${baseId}-companions-error`}
      />

      <div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-terracotta bg-terracotta px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          {booking.cta}
        </button>
        <p className="mt-3 text-sm text-muted-foreground">{booking.privacy}</p>
      </div>
    </form>
  )
}
