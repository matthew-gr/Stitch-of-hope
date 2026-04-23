'use client';

import { useState } from 'react';
import { CATEGORIES, type Category, type Product } from '@/lib/db/types';

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  initial?: Partial<Product>;
  onDelete?: () => void | Promise<void>;
};

export default function ProductForm({ action, initial = {}, onDelete }: Props) {
  const [images, setImages] = useState<string[]>(initial.images ?? []);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [uploadErr, setUploadErr] = useState('');

  const upload = async (file: File) => {
    setUploadStatus('uploading');
    setUploadErr('');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }
      const { url } = (await res.json()) as { url: string };
      setImages((arr) => [...arr, url]);
      setUploadStatus('idle');
    } catch (e) {
      setUploadErr(e instanceof Error ? e.message : 'Upload failed');
      setUploadStatus('error');
    }
  };

  const removeAt = (i: number) => setImages((arr) => arr.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    setImages((arr) => {
      const next = [...arr];
      const j = i + dir;
      if (j < 0 || j >= next.length) return arr;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  return (
    <form action={action} className="space-y-10 max-w-3xl">
      <section className="border border-ink/10 p-6 md:p-8 space-y-5 bg-bone/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <label className="block md:col-span-2">
            <span className="eyebrow">Name</span>
            <input name="name" defaultValue={initial.name ?? ''} required className="input mt-1" />
          </label>
          <label className="block">
            <span className="eyebrow">Category</span>
            <select
              name="category"
              defaultValue={(initial.category ?? 'Apparel') as Category}
              className="select mt-1"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="eyebrow">Slug (url-friendly, auto from name if blank)</span>
          <input name="slug" defaultValue={initial.slug ?? ''} className="input mt-1" placeholder="e.g. elephant-tote" />
        </label>

        <label className="block">
          <span className="eyebrow">Blurb (1–2 sentences, shown on the card)</span>
          <textarea name="blurb" defaultValue={initial.blurb ?? ''} rows={2} className="input mt-1 resize-none" />
        </label>

        <label className="block">
          <span className="eyebrow">Details (shown in the request modal)</span>
          <textarea name="details" defaultValue={initial.details ?? ''} rows={3} className="input mt-1 resize-none" />
        </label>
      </section>

      <section className="border border-ink/10 p-6 md:p-8 space-y-4 bg-bone/20">
        <h2 className="font-display text-lg text-ink">Images</h2>
        <p className="text-xs text-ink/60">The first image is the main photo shown on the card.</p>

        {images.length === 0 ? (
          <div className="border border-dashed border-ink/20 p-6 text-center text-xs text-ink/50">
            No images yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {images.map((url, i) => (
              <li key={`${url}-${i}`} className="flex items-center gap-3 border border-ink/10 bg-ivory p-2">
                <input type="hidden" name="images[]" value={url} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-20 h-20 object-cover bg-bone/30" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-mist break-all">{url}</p>
                  {i === 0 && <p className="text-[10px] uppercase tracking-luxe text-gold mt-1">Primary</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => move(i, -1)} className="text-xs uppercase tracking-luxe text-ink/60 hover:text-ink" disabled={i === 0}>↑</button>
                  <button type="button" onClick={() => move(i, 1)} className="text-xs uppercase tracking-luxe text-ink/60 hover:text-ink" disabled={i === images.length - 1}>↓</button>
                  <button type="button" onClick={() => removeAt(i)} className="text-xs uppercase tracking-luxe text-terracotta">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <label className="inline-block">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = '';
            }}
          />
          <span className="btn-outline text-[11px] py-2 px-4 cursor-pointer inline-block">
            {uploadStatus === 'uploading' ? 'Uploading…' : '+ Add image'}
          </span>
        </label>
        {uploadErr && <p className="mt-1 text-xs text-terracotta">{uploadErr}</p>}
      </section>

      <section className="border border-ink/10 p-6 md:p-8 space-y-5 bg-bone/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
          <label className="block">
            <span className="eyebrow">Sort order (lower = earlier)</span>
            <input
              type="number"
              name="sort_order"
              defaultValue={initial.sort_order ?? 100}
              className="input mt-1"
            />
          </label>
          <label className="flex items-center gap-3 md:pb-3">
            <input type="checkbox" name="featured" defaultChecked={initial.featured ?? false} />
            <span className="text-sm">Featured on home page</span>
          </label>
          <label className="flex items-center gap-3 md:pb-3">
            <input type="checkbox" name="archived" defaultChecked={initial.archived ?? false} />
            <span className="text-sm">Archived (hidden from public site)</span>
          </label>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4 pt-2">
        <button type="submit" className="btn-primary">Save product</button>
        {onDelete && (
          <button
            type="button"
            onClick={() => {
              if (confirm('Delete this product permanently? This cannot be undone.')) {
                onDelete();
              }
            }}
            className="text-xs uppercase tracking-luxe text-terracotta hover:underline"
          >
            Delete product
          </button>
        )}
      </div>
    </form>
  );
}
