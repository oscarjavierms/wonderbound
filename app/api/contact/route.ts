import { business } from '@/lib/site'

const reasons = ['bolivia', 'upcoming', 'general', 'other'] as const

type Payload = {
  name?: unknown
  email?: unknown
  country?: unknown
  reason?: unknown
  message?: unknown
  consent?: unknown
  website?: unknown
  locale?: unknown
}

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(request: Request) {
  let body: Payload
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  // Campo trampa para bots: se responde como éxito sin enviar nada.
  if (text(body.website, 100)) return Response.json({ ok: true })

  const name = text(body.name, 120)
  const email = text(body.email, 160)
  const country = text(body.country, 80)
  const reason = text(body.reason, 20)
  const message = text(body.message, 3000)
  const locale = body.locale === 'en' ? 'en' : 'es'

  const valid =
    name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    country.length >= 2 &&
    (reasons as readonly string[]).includes(reason) &&
    message.length >= 5 &&
    body.consent === true

  if (!valid) return Response.json({ ok: false }, { status: 422 })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY no está configurada; la consulta no se pudo entregar.')
    return Response.json({ ok: false }, { status: 503 })
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Wonderbound Journeys <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL ?? business.email],
      reply_to: email,
      subject: `Nueva consulta web (${reason}) — ${name}`,
      html: `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
<p><strong>Correo:</strong> ${escapeHtml(email)}</p>
<p><strong>País:</strong> ${escapeHtml(country)}</p>
<p><strong>Motivo:</strong> ${escapeHtml(reason)}</p>
<p><strong>Idioma:</strong> ${locale}</p>
<p><strong>Mensaje:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
<p><em>El remitente aceptó la política de privacidad para responder a esta consulta.</em></p>`,
    }),
  })

  if (!response.ok) {
    console.error('[contact] Resend respondió con estado', response.status)
    return Response.json({ ok: false }, { status: 502 })
  }
  return Response.json({ ok: true })
}
