import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const service = String(body.service ?? '').trim();
    const location = String(body.location ?? '').trim();

    if (!name || !phone || !service || !location) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please fill in all required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await sendContactEmail({
      name,
      phone,
      email: body.email ? String(body.email).trim() : undefined,
      service,
      location,
      message: body.message ? String(body.message).trim() : undefined,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to send your request. Please try again.';
    return new Response(JSON.stringify({ success: false, message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
