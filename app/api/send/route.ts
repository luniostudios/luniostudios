import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, message } = await request.json(); // Extract form data

  try {
    const { data, error } = await resend.emails.send({
      from: `LUNIO Contact Form <admin@luniostudios.com>`,
      to: ['admin@luniostudios.com'], // Replace with your admin email
      subject: `Question from ${email}`,
      react: EmailTemplate({ email, message }) as React.ReactElement, // Pass data to the template
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}