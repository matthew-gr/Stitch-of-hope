'use client';

import { useState, useTransition } from 'react';
import type { Submission } from '@/lib/db/types';
import { toggleReadAction, deleteMessageAction } from './actions';

export default function MessageRow({ message }: { message: Submission }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isRead = !!message.read_at;

  const toggle = () =>
    startTransition(() => {
      toggleReadAction(message.id, !isRead);
    });

  const del = () => {
    if (!confirm('Delete this message permanently?')) return;
    startTransition(() => {
      deleteMessageAction(message.id);
    });
  };

  return (
    <li className={`p-4 ${isRead ? '' : 'bg-bone/30'}`}>
      <div className="flex items-start gap-4">
        <button onClick={() => setOpen((o) => !o)} className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-sans text-sm text-ink">
              <span className={isRead ? '' : 'font-medium'}>{message.name}</span>
              <span className="text-ink/50"> · {message.email}</span>
            </p>
            {!isRead && (
              <span className="text-[10px] uppercase tracking-luxe bg-ink text-ivory px-1.5 py-0.5">
                New
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink/60">
            {message.kind === 'product_request'
              ? `Product request${message.product_name ? ` — ${message.product_name}` : ''}`
              : 'Contact message'}
            {' · '}
            {new Date(message.received_at).toLocaleString()}
          </p>
        </button>
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={toggle}
            disabled={isPending}
            className="text-[11px] uppercase tracking-luxe text-ink/60 hover:text-ink"
          >
            Mark {isRead ? 'unread' : 'read'}
          </button>
          <button
            onClick={del}
            disabled={isPending}
            className="text-[11px] uppercase tracking-luxe text-terracotta hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 border-t border-ink/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <Field label="Name" value={message.name} />
          <Field label="Email" value={message.email} />
          {message.phone && <Field label="Phone" value={message.phone} />}
          {message.product_name && <Field label="Product" value={message.product_name} />}
          {Object.entries(message.payload).map(([k, v]) =>
            v == null || v === '' ? null : (
              <Field key={k} label={k} value={String(v)} />
            ),
          )}
          <div className="md:col-span-2 pt-2">
            <a
              href={`mailto:${message.email}?subject=${encodeURIComponent(
                message.kind === 'product_request'
                  ? `Re: your request for ${message.product_name ?? 'our products'}`
                  : 'Re: your message to Stitch of Hope',
              )}`}
              className="text-xs uppercase tracking-luxe text-ink/70 hover:text-ink border-b border-ink/20 hover:border-ink pb-0.5"
            >
              Reply via email →
            </a>
          </div>
        </div>
      )}
    </li>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="mt-1 font-sans text-sm text-ink/80 whitespace-pre-wrap break-words">{value}</p>
    </div>
  );
}
