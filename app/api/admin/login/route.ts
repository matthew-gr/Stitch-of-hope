import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const expectedRaw = process.env.ADMIN_PASSWORD;

  if (!expectedRaw) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD is not configured on the server.' },
      { status: 500 },
    );
  }

  const expected = expectedRaw.trim();
  const submitted = (password ?? '').trim();

  if (!submitted || submitted !== expected) {
    if (process.env.NODE_ENV !== 'production') {
      // Dev-only log to help debug common setup issues. Never logs actual values.
      console.log(
        `[admin/login] mismatch — expected length ${expected.length}, submitted length ${submitted.length}`,
      );
    }
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const session = await getSession();
  session.admin = true;
  await session.save();
  return NextResponse.json({ ok: true });
}
