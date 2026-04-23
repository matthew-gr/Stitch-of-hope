import Link from 'next/link';
import { listProducts } from '@/lib/db/products';
import { listSubmissions, unreadCount } from '@/lib/db/submissions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [products, submissions, unread] = await Promise.all([
    listProducts({ includeArchived: true }),
    listSubmissions({ limit: 5 }),
    unreadCount(),
  ]);

  const active = products.filter((p) => !p.archived).length;

  const tiles = [
    { label: 'Active products', value: active, href: '/admin/products' },
    { label: 'Total submissions', value: submissions.length > 0 ? '—' : 0, href: '/admin/messages', text: 'View inbox' },
    { label: 'Unread messages', value: unread, href: '/admin/messages' },
  ];

  return (
    <div>
      <p className="eyebrow">Dashboard</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl text-ink">Welcome back.</h1>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="block border border-ink/10 bg-bone/20 hover:bg-bone/40 transition p-6"
          >
            <p className="eyebrow">{t.label}</p>
            <p className="mt-3 font-display text-4xl text-ink">{t.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-xl text-ink">Recent messages</h2>
          <Link
            href="/admin/messages"
            className="text-xs uppercase tracking-luxe text-ink/60 hover:text-ink"
          >
            View all →
          </Link>
        </div>
        {submissions.length === 0 ? (
          <div className="border border-dashed border-ink/20 p-8 text-center text-sm text-ink/50">
            No messages yet.
          </div>
        ) : (
          <ul className="border border-ink/10 divide-y divide-ink/10">
            {submissions.map((s) => (
              <li key={s.id} className="p-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-sans text-sm text-ink">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-ink/50"> · {s.email}</span>
                  </p>
                  <p className="mt-1 text-xs text-ink/60">
                    {s.kind === 'product_request'
                      ? `Product request${s.product_name ? ` — ${s.product_name}` : ''}`
                      : 'Contact message'}
                    {' · '}
                    {new Date(s.received_at).toLocaleString()}
                  </p>
                </div>
                {!s.read_at && (
                  <span className="text-[10px] uppercase tracking-luxe bg-ink text-ivory px-1.5 py-0.5 shrink-0">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
