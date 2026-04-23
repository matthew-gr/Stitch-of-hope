import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { supabaseAdmin, STORAGE_BUCKET } from '@/lib/supabase';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }

  const ext = (file.name.split('.').pop() || 'bin').toLowerCase();
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : 'bin';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const { error } = await supabaseAdmin()
    .storage.from(STORAGE_BUCKET)
    .upload(filename, bytes, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });
  if (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin().storage.from(STORAGE_BUCKET).getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}
