'use client';

import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import type { Product, Category } from '@/lib/db/types';
import { CATEGORIES } from '@/lib/db/types';
import ProductRequestModal from './ProductRequestModal';

type Filter = 'All' | Category;

const INITIAL_VISIBLE = 6;

export default function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const [active, setActive] = useState<Product | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - visible.length;

  const filters: Filter[] = ['All', ...CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-ink/10 pb-5 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-sans text-[12px] uppercase tracking-luxe transition-colors duration-300 ${
              filter === f ? 'text-ink' : 'text-mist hover:text-ink'
            }`}
          >
            {f}
            {filter === f && <span className="ml-2 inline-block w-4 h-px bg-ink align-middle" />}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="border border-dashed border-ink/20 p-16 text-center text-sm text-ink/50">
          No products in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {visible.map((p) => (
            <article key={p.id} className="reveal group">
              <button
                onClick={() => setActive(p)}
                className="block w-full text-left"
                aria-label={`Request ${p.name}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-quiet group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
                </div>
                <div className="pt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{p.category}</p>
                    <h3 className="mt-1.5 font-display text-xl text-ink">{p.name}</h3>
                  </div>
                  <span className="mt-1 font-sans text-[11px] uppercase tracking-luxe text-ink/50 group-hover:text-ink transition-colors duration-300 whitespace-nowrap">
                    Request →
                  </span>
                </div>
                <p className="mt-3 font-sans text-sm text-ink/70 leading-relaxed max-w-md">
                  {p.blurb}
                </p>
              </button>
            </article>
          ))}
        </div>
      )}

      {hiddenCount > 0 && (
        <div className="mt-16 flex flex-col items-center gap-3">
          <button onClick={() => setShowAll(true)} className="btn-outline">
            See more ({hiddenCount})
          </button>
          <p className="eyebrow text-mist">Showing {visible.length} of {filtered.length}</p>
        </div>
      )}

      {showAll && filtered.length > INITIAL_VISIBLE && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => {
              setShowAll(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-sans text-[12px] uppercase tracking-luxe text-mist hover:text-ink transition"
          >
            Show less ↑
          </button>
        </div>
      )}

      <ProductRequestModal product={active} onClose={() => setActive(null)} />
    </div>
  );
}
