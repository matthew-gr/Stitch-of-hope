import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { unreadCount } from '@/lib/db/submissions';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AuthedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.admin) {
    redirect('/admin/login');
  }

  let unread = 0;
  try {
    unread = await unreadCount();
  } catch {
    // If DB not configured yet, fall back quietly
    unread = 0;
  }

  return <AdminShell unread={unread}>{children}</AdminShell>;
}
