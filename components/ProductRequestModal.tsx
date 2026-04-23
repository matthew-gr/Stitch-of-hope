'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Product } from '@/lib/db/types';
import { trackEvent } from '@/lib/analytics';

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductRequestModal({ product, onClose }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [err, setErr] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setErr('');
      trackEvent('product_modal_open', { product: product.name, category: product.category });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product || !mounted) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setErr('');

    const body = {
      kind: 'product_request' as const,
      product: product.name,
      name: String(data.get('Name') ?? ''),
      email: String(data.get('Email') ?? ''),
      phone: String(data.get('Phone') ?? ''),
      quantity: String(data.get('Quantity') ?? ''),
      notes: String(data.get('Notes') ?? ''),
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        trackEvent('product_request', { product: product.name, category: product.category });
      } else {
        const data = await res.json().catch(() => ({}));
        setErr(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErr('Network error');
      setStatus('error');
    }
  };

  // Render via Portal to escape the main element's stacking context,
  // ensuring the modal and its close button sit above the sticky site header.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button at true viewport level — always visible */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="fixed top-4 right-4 z-[110] w-11 h-11 rounded-full flex items-center justify-center bg-ivory/95 hover:bg-white text-ink border border-ink/15 shadow-md transition"
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-ivory grid grid-cols-1 md:grid-cols-2 max-h-[92vh] overflow-y-auto"
      >
        <div className="relative aspect-[4/5] md:aspect-auto bg-bone">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="p-8 md:p-10">
          <p className="eyebrow">{product.category}</p>
          <h2 className="mt-2 font-display text-3xl text-ink">{product.name}</h2>
          <p className="mt-4 font-sans text-sm text-ink/70 leading-relaxed">{product.blurb}</p>
          {product.details && (
            <p className="mt-3 font-sans text-sm text-ink/70 leading-relaxed">{product.details}</p>
          )}

          {status === 'sent' ? (
            <div className="mt-8 border-t border-ink/10 pt-8">
              <p className="font-display text-xl text-ink">Murakoze — thank you.</p>
              <p className="mt-2 font-sans text-sm text-ink/70">
                Your request is on its way. We'll be in touch shortly.
              </p>
              <button onClick={onClose} className="mt-6 btn-outline">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 border-t border-ink/10 pt-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="eyebrow">Name</span>
                  <input required name="Name" className="input mt-1" placeholder="Your full name" />
                </label>
                <label className="block">
                  <span className="eyebrow">Email</span>
                  <input
                    required
                    type="email"
                    name="Email"
                    className="input mt-1"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Phone (optional)</span>
                  <input name="Phone" className="input mt-1" placeholder="+250 ..." />
                </label>
                <label className="block">
                  <span className="eyebrow">Quantity</span>
                  <input
                    name="Quantity"
                    type="number"
                    min={1}
                    defaultValue={1}
                    className="input mt-1"
                  />
                </label>
              </div>

              <label className="block">
                <span className="eyebrow">Notes — colour, size, anything else</span>
                <textarea
                  name="Notes"
                  rows={3}
                  className="input mt-1 resize-none"
                  placeholder="e.g. size M, prefer the red colourway"
                />
              </label>

              <div className="flex items-center gap-4 pt-2">
                <button type="submit" disabled={status === 'sending'} className="btn-primary">
                  {status === 'sending' ? 'Sending…' : 'Send Request'}
                </button>
                {status === 'error' && (
                  <span className="font-sans text-xs text-terracotta">
                    {err || 'Something went wrong — please try again.'}
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
