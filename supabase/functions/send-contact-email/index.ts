import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    const { name, email, phone, subject, message } = await req.json()

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not set')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Medina Villas HOA <noreply@medinavillas.org>',
        to: ['board2024@medinavillas.org'],
        reply_to: email,
        subject: `[HOA Contact Form] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2b1459; border-bottom: 2px solid #9b6fc7; padding-bottom: 12px;">
              New Contact Form Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top;"><strong>Name</strong></td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Email</strong></td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Phone</strong></td>
                <td style="padding: 8px 0; color: #333;">${phone}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Subject</strong></td>
                <td style="padding: 8px 0; color: #333;">${subject}</td>
              </tr>
            </table>
            <div style="background: #f8f6f2; border-left: 4px solid #9b6fc7; padding: 16px 20px; border-radius: 2px;">
              <strong style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</strong>
              <p style="color: #333; margin: 8px 0 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">
              Sent via the Medina Villas HOA website contact form.
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Resend error: ${err}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
