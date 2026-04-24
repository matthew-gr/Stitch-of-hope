'use client';

import { useState } from 'react';
import type { Faq } from '@/lib/db/types';

export default function FaqsEditor({ initial }: { initial: Faq[] }) {
  const [rows, setRows] = useState<Faq[]>(
    initial.length > 0 ? initial : [{ q: '', a: '' }],
  );

  const update = (i: number, key: keyof Faq, value: string) => {
    setRows((arr) => arr.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  };
  const add = () => setRows((arr) => [...arr, { q: '', a: '' }]);
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
          <input type="hidden" name="faq_q" value={r.q} />
          <input type="hidden" name="faq_a" value={r.a} />
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-mist">Question {i + 1}</span>
            <div className="flex items-center gap-3 text-xs uppercase tracking-luxe text-ink/50">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="hover:text-ink disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="hover:text-ink disabled:opacity-30">↓</button>
              <button type="button" onClick={() => remove(i)} className="text-terracotta hover:underline">Remove</button>
            </div>
          </div>
          <label className="block">
            <span className="eyebrow">Question</span>
            <input
              value={r.q}
              onChange={(e) => update(i, 'q', e.target.value)}
              className="input mt-1"
              placeholder="e.g. Do you ship internationally?"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Answer</span>
            <textarea
              value={r.a}
              onChange={(e) => update(i, 'a', e.target.value)}
              rows={3}
              className="input mt-1 resize-none"
              placeholder="Write the answer..."
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={add} className="btn-outline text-[11px] py-2 px-4">
        + Add question
      </button>
    </div>
  );
}
