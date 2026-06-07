export const prerender = false;  // api dinamica
import type { APIRoute } from 'astro';
import { emailAdapter } from '../../lib/email/index';

// Rate limit en memoria — se resetea al reiniciar el servidor
const rateLimit = new Map<string, { count: number; reset: number }>();
const MAX_PER_HOUR = 3;

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const now = Date.now();

  // Rate limit
  const record = rateLimit.get(ip);
  if (record && now < record.reset) {
    if (record.count >= MAX_PER_HOUR) {
      return new Response(JSON.stringify({ ok: false, error: 'Demasiados intentos. Vuelve a intentarlo más tarde.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    record.count++;
  } else {
    rateLimit.set(ip, { count: 1, reset: now + 60 * 60 * 1000 });
  }

  const body = await request.json();
  const { nombre, email, mensaje, website } = body;

  // Honeypot — si viene relleno es un bot
  if (website) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 }); // silencioso
  }

  // Validación básica
  if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: 'Faltan campos obligatorios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const result = await emailAdapter.send({ nombre, email, mensaje });

  return new Response(JSON.stringify(result), {
    status: result.ok ? 200 : 500,
    headers: { 'Content-Type': 'application/json' }
  });
};