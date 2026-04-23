import { NextResponse } from 'next/server';
import { createSubmission } from '@/lib/db/submissions';

type SubmitBody = {
  kind: 'contact' | 'product_request';
  name: string;
  email: string;
  phone?: string;
  product?: string;
  website?: string; // honeypot — should always be empty
  _ts?: number; // form-load timestamp; bots submit instantly
  [k: string]: unknown;
};

// Simple in-memory rate limit — per serverless instance. Imperfect but cheap.
// Vercel rotates instances, so a determined attacker can slip through; the
// honeypot + timestamp checks catch the overwhelming majority of spam bots.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const rateLimitLog = new Map<string, number[]>();

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitLog.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  let body: SubmitBody;
  try {
    body = (await req.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || !body.kind || !body.name || !body.email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Honeypot — silently drop without telling the bot it was detected
  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Too-fast submission (bots auto-fill and POST in <2s)
  if (typeof body._ts === 'number' && body._ts > 0 && Date.now() - body._ts < 2000) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: 'Too many submissions. Please wait a moment and try again.' },
      { status: 429 },
    );
  }

  const { kind, name, email, phone, product, website: _w, _ts: _t, ...rest } = body;
  void _w;
  void _t;

  try {
    await createSubmission({
      kind,
      product_name: product ?? null,
      name,
      email,
      phone: phone ?? null,
      payload: rest,
    });
  } catch (err) {
    console.error('DB submission failed:', err);
    return NextResponse.json({ error: 'Could not save your message' }, { status: 500 });
  }

  const target = process.env.FORMSUBMIT_EMAIL;
  if (target) {
    const formData = new FormData();
    formData.append(
      '_subject',
      kind === 'product_request'
        ? `Product request: ${product ?? 'Unknown'}`
        : 'New message from stitchofhope.com',
    );
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('Name', name);
    formData.append('Email', email);
    if (phone) formData.append('Phone', phone);
    if (product) formData.append('Product', product);
    for (const [k, v] of Object.entries(rest)) {
      if (v == null) continue;
      formData.append(k, String(v));
    }
    fetch(`https://formsubmit.co/ajax/${encodeURIComponent(target)}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    }).catch((err) => console.error('FormSubmit notify failed:', err));
  }

  return NextResponse.json({ ok: true });
}
