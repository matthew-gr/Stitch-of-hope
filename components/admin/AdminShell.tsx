'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const nav = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/content', label: 'Home content' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/location', label: 'Shop info' },
  { href: '/admin/messages', label: 'Messages' },
];

export default function AdminShell({
  children,
  unread = 0,
}: {
  children: React.ReactNode;
  unread?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ivory">
      <aside className="fixed inset-y-0 left-0 w-60 hidden lg:flex flex-col border-r border-ink/10 bg-bone/30 px-6 py-8">
        <div>
          <p className="eyebrow">Stitch of Hope</p>
          <p className="mt-1 font-display text-lg text-ink">Admin</p>
        </div>

        <nav className="mt-10 flex-1 space-y-1">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 text-sm font-sans transition-colors ${
                  active ? 'bg-ink text-ivory' : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                }`}
              >
                <span>{item.label}</span>
                {item.href === '/admin/messages' && unread > 0 && (
                  <span
                    className={`text-[10px] uppercase tracking-luxe px-1.5 py-0.5 ${
                      active ? 'bg-ivory text-ink' : 'bg-ink text-ivory'
                    }`}
                  >
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="block text-xs uppercase tracking-luxe text-ink/50 hover:text-ink"
          >
            View site ↗
          </Link>
          <button
            onClick={logout}
            className="text-xs uppercase tracking-luxe text-ink/50 hover:text-ink"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="lg:hidden border-b border-ink/10 px-5 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-display text-lg">
            Admin
          </Link>
          <div className="flex items-center gap-4 text-xs uppercase tracking-luxe">
            <Link href="/" target="_blank" className="text-ink/60">View site</Link>
            <button onClick={logout} className="text-ink/60">Sign out</button>
          </div>
        </header>
        <div className="lg:hidden border-b border-ink/10 overflow-x-auto">
          <nav className="flex gap-6 px-5 py-3 min-w-max">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs uppercase tracking-luxe whitespace-nowrap ${
                    active ? 'text-ink' : 'text-ink/50'
                  }`}
                >
                  {item.label}
                  {item.href === '/admin/messages' && unread > 0 && ` (${unread})`}
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="px-6 md:px-10 py-10 md:py-14 max-w-5xl">{children}</main>
      </div>
    </div>
  );
}
