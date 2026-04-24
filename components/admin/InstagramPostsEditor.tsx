'use client';

import { useRef, useState } from 'react';
import type { InstagramPost } from '@/lib/db/types';

const MAX_POSTS = 4;

export default function InstagramPostsEditor({ initial }: { initial: InstagramPost[] }) {
  const [rows, setRows] = useState<InstagramPost[]>(
    initial.length > 0
      ? initial
      : [{ image_url: '', caption: '', link_url: '' }],
  );
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadErr, setUploadErr] = useState('');
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const update = (i: number, key: keyof InstagramPost, value: string) => {
    setRows((arr) => arr.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
  };
  const add = () => {
    if (rows.length >= MAX_POSTS) return;
    setRows((arr) => [...arr, { image_url: '', caption: '', link_url: '' }]);
  };
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

  const upload = async (i: number, file: File) => {
    setUploadingIndex(i);
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
      update(i, 'image_url', url);
    } catch (e) {
      setUploadErr(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {rows.map((r, i) => (
        <div key={i} className="border border-ink/10 bg-ivory p-5">
          <input type="hidden" name="ig_image" value={r.image_url} />
          <input type="hidden" name="ig_caption" value={r.caption} />
          <input type="hidden" name="ig_link" value={r.link_url} />
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="eyebrow text-mist">Post {i + 1}</span>
            <div className="flex items-center gap-3 text-xs uppercase tracking-luxe text-ink/50">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="hover:text-ink disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="hover:text-ink disabled:opacity-30">↓</button>
              <button type="button" onClick={() => remove(i)} className="text-terracotta hover:underline">Remove</button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="shrink-0">
              <div className="relative w-32 h-32 border border-ink/15 bg-bone/30 overflow-hidden">
                {r.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-luxe text-mist">
                    No image
                  </div>
                )}
              </div>
              <input
                ref={(el) => { fileRefs.current[i] = el; }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(i, f);
                  e.target.value = '';
                }}
              />
              <button
                type="button"
                onClick={() => fileRefs.current[i]?.click()}
                disabled={uploadingIndex === i}
                className="btn-outline text-[11px] py-2 px-4 mt-3 w-32"
              >
                {uploadingIndex === i
                  ? 'Uploading…'
                  : r.image_url
                    ? 'Replace'
                    : 'Upload'}
              </button>
            </div>

            <div className="flex-1 space-y-3">
              <label className="block">
                <span className="eyebrow">Caption (optional, shown on hover)</span>
                <input
                  value={r.caption}
                  onChange={(e) => update(i, 'caption', e.target.value)}
                  className="input mt-1"
                  placeholder="A short caption"
                />
              </label>
              <label className="block">
                <span className="eyebrow">Instagram post URL (optional)</span>
                <input
                  value={r.link_url}
                  onChange={(e) => update(i, 'link_url', e.target.value)}
                  className="input mt-1"
                  placeholder="https://www.instagram.com/p/..."
                />
              </label>
            </div>
          </div>
        </div>
      ))}

      {uploadErr && <p className="text-xs text-terracotta">{uploadErr}</p>}

      {rows.length < MAX_POSTS && (
        <button
          type="button"
          onClick={add}
          className="btn-outline text-[11px] py-2 px-4"
        >
          + Add post ({rows.length}/{MAX_POSTS})
        </button>
      )}

      <p className="text-xs text-mist">
        Up to {MAX_POSTS} posts displayed on the home page. Leave empty to hide the section entirely.
      </p>
    </div>
  );
}
