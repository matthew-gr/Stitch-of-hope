import Link from 'next/link';
import Image from 'next/image';
import { listProducts } from '@/lib/db/products';

export const dynamic = 'force-dynamic';

export default async function ProductsAdminPage() {
  const products = await listProducts({ includeArchived: true });

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-2 font-display text-3xl text-ink">Products</h1>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          + New product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="border border-dashed border-ink/20 p-10 text-center text-sm text-ink/50">
          No products yet. Click "New product" to add the first one.
        </div>
      ) : (
        <div className="border border-ink/10">
          <ul className="divide-y divide-ink/10">
            {products.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <div className="relative w-16 h-16 shrink-0 bg-bone/30 overflow-hidden">
                  {p.image ? (
                    <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-sans text-sm text-ink">{p.name}</p>
                    {p.featured && (
                      <span className="text-[10px] uppercase tracking-luxe text-gold border border-gold/50 px-1.5">
                        Featured
                      </span>
                    )}
                    {p.archived && (
                      <span className="text-[10px] uppercase tracking-luxe text-mist border border-mist/40 px-1.5">
                        Archived
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink/50">
                    {p.category} · sort {p.sort_order} · /{p.slug}
                  </p>
                </div>
                <Link
                  href={`/admin/products/${p.id}`}
                  className="text-xs uppercase tracking-luxe text-ink/60 hover:text-ink"
                >
                  Edit →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-xs text-ink/50">
        {products.length} total · {products.filter((p) => !p.archived).length} active · sort order
        controls display order on the public site (lower = earlier).
      </p>
    </div>
  );
}
