'use client';

import { useState } from 'react';
import type { Testimonial } from '@/lib/db/types';

export default function TestimonialsEditor({ initial }: { initial: Testimonial[] }) {
  const [rows, setRows] = useState<Testimonial[]>(
    initial.length > 0 ? initial : [{ quote: '', name: '', location: '' }],
  );

  const update = (i: number, key: keyof Testimonial, value: string) => {
    setRows((arr) => arr.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  };
  const add = () =>
    setRows((arr) => [...arr, { quote: '', name: '', location: '' }]);
  const remove = (i: number) => setRows((arr) => arr.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    setRows((arr) => {
      const next = [...arr];
      const j = i + dir;
      if (j < 0 || j >= next.length) return arr;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {rows.map((r, i) => (
        <div key={i} className="border border-ink/10 bg-ivory p-5 space-y-4">
          <input type="hidden" name="testimonial_quote" value={r.quote} />
          <input type="hidden" name="testimonial_name" value={r.name} />
          <input type="hidden" name="testimonial_location" value={r.location} />
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-mist">Testimonial {i + 1}</span>
            <div className="flex items-center gap-3 text-xs uppercase tracking-luxe text-ink/50">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="hover:text-ink disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="hover:text-ink disabled:opacity-30">↓</button>
              <button type="button" onClick={() => remove(i)} className="text-terracotta hover:underline">Remove</button>
            </div>
          </div>
          <label className="block">
            <span className="eyebrow">Quote</span>
            <textarea
              value={r.quote}
              onChange={(e) => update(i, 'quote', e.target.value)}
              rows={2}
              className="input mt-1 resize-none"
              placeholder='e.g. "Beautiful craftsmanship. Every piece tells a story."'
            />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="eyebrow">Name</span>
              <input
                value={r.name}
                onChange={(e) => update(i, 'name', e.target.value)}
                className="input mt-1"
                placeholder="e.g. Sarah M."
              />
            </label>
            <label className="block">
              <span className="eyebrow">Location</span>
              <input
                value={r.location}
                onChange={(e) => update(i, 'location', e.target.value)}
                className="input mt-1"
                placeholder="e.g. Kigali"
              />
            </label>
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-outline text-[11px] py-2 px-4">
        + Add testimonial
      </button>
    </div>
  );
}
