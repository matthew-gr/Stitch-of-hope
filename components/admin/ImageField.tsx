'use client';

import { useRef, useState } from 'react';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange?: (url: string) => void;
};

export default function ImageField({ label, name, value: initial, onChange }: Props) {
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [err, setErr] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setStatus('uploading');
    setErr('');
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }
      const { url } = (await res.json()) as { url: string };
      setValue(url);
      onChange?.(url);
      setStatus('idle');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Upload failed';
      setErr(msg);
      setStatus('error');
    }
  };

  return (
    <div>
      <span className="eyebrow">{label}</span>
      <input type="hidden" name={name} value={value} />
      <div className="mt-2 flex items-start gap-4">
        <div className="relative w-28 h-28 shrink-0 border border-ink/15 bg-bone/30 overflow-hidden">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-luxe text-mist">
              No image
            </div>
          )}
        </div>
        <div className="flex-1">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={status === 'uploading'}
            className="btn-outline text-[11px] py-2 px-4"
          >
            {status === 'uploading' ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => {
                setValue('');
                onChange?.('');
              }}
              className="ml-3 text-xs uppercase tracking-luxe text-mist hover:text-ink"
            >
              Remove
            </button>
          )}
          {err && <p className="mt-2 text-xs text-terracotta">{err}</p>}
          <p className="mt-2 text-[11px] text-mist break-all">{value || '—'}</p>
        </div>
      </div>
    </div>
  );
}
