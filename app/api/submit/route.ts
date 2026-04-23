import { NextResponse } from 'next/server';
import { createSubmission } from '@/lib/db/submissions';

type SubmitBody = {
  kind: 'contact' | 'product_request';
  name: string;
  email: string;
  phone?: string;
  product?: string;
  [k: string]: unknown;
};

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

  const { kind, name, email, phone, product, ...rest } = body;

  // 1. Save to DB (primary — always)
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

  // 2. Fire-and-forget email via FormSubmit (don't block response on this)
  const target = process.env.FORMSUBMIT_EMAIL;
  if (target) {
    const formData = new FormData();
    formData.append('_subject', kind === 'product_request'
      ? `Product request: ${product ?? 'Unknown'}`
      : 'New message from stitchofhope.com');
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
