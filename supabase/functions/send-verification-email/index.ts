import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  to: string
  subject: string
  html: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html }: EmailRequest = await req.json()

    // In a real implementation, you would use a service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // - Postmark

    // For demo purposes, we'll log the email content
    console.log('📧 Sending verification email:')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('HTML:', html)

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In production, replace this with actual email service integration
    // Example with Resend:
    /*
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EVENTRA <noreply@yourdomain.com>',
        to: [to],
        subject: subject,
        html: html,
      }),
    })

    if (!emailResponse.ok) {
      throw new Error('Failed to send email')
    }
    */

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})