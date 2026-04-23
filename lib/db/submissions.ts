import { supabaseAdmin } from '@/lib/supabase';
import type { Submission } from './types';

export async function createSubmission(s: Omit<Submission, 'id' | 'received_at' | 'read_at'>) {
  const { error } = await supabaseAdmin().from('submissions').insert({
    kind: s.kind,
    product_name: s.product_name,
    name: s.name,
    email: s.email,
    phone: s.phone,
    payload: s.payload,
  });
  if (error) throw error;
}

export async function listSubmissions(opts: { limit?: number } = {}): Promise<Submission[]> {
  const { data, error } = await supabaseAdmin()
    .from('submissions')
    .select('*')
    .order('received_at', { ascending: false })
    .limit(opts.limit ?? 200);
  if (error) throw error;
  return (data ?? []) as Submission[];
}

export async function unreadCount(): Promise<number> {
  const { count, error } = await supabaseAdmin()
    .from('submissions')
    .select('*', { head: true, count: 'exact' })
    .is('read_at', null);
  if (error) throw error;
  return count ?? 0;
}

export async function markRead(id: string, read: boolean) {
  const { error } = await supabaseAdmin()
    .from('submissions')
    .update({ read_at: read ? new Date().toISOString() : null })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteSubmission(id: string) {
  const { error } = await supabaseAdmin().from('submissions').delete().eq('id', id);
  if (error) throw error;
}
