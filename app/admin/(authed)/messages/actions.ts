'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { deleteSubmission, markRead } from '@/lib/db/submissions';

async function requireAdmin() {
  const s = await getSession();
  if (!s.admin) throw new Error('Unauthorized');
}

export async function toggleReadAction(id: string, read: boolean) {
  await requireAdmin();
  await markRead(id, read);
  revalidatePath('/admin/messages');
  revalidatePath('/admin');
}

export async function deleteMessageAction(id: string) {
  await requireAdmin();
  await deleteSubmission(id);
  revalidatePath('/admin/messages');
  revalidatePath('/admin');
}
