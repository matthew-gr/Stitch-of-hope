import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _admin: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (_admin) return _admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Supabase env missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local',
    );
  }
  _admin = createClient(url, key, { auth: { persistSession: false } });
  return _admin;
}

export const STORAGE_BUCKET = 'site-images';

export function publicImageUrl(path: string): string {
  return supabaseAdmin().storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
