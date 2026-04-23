'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [err, setErr] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setErr('');

    const body = {
      kind: 'contact' as const,
      name: String(data.get('Name') ?? ''),
      email: String(data.get('Email') ?? ''),
      phone: String(data.get('Phone') ?? ''),
      inquiry: String(data.get('Inquiry') ?? ''),
      message: String(data.get('Message') ?? ''),
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
        trackEvent('contact_submit', { inquiry_type: body.inquiry });
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

  if (status === 'sent') {
    return (
      <div className="border-t border-ink/10 pt-10">
        <p className="font-display text-2xl text-ink">Murakoze — thank you.</p>
        <p className="mt-2 font-sans text-sm text-ink/70 max-w-md">
          Your note is on its way to us. We'll reply as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <span className="eyebrow">Inquiry type</span>
          <select name="Inquiry" className="select mt-1" defaultValue="General">
            <option>General</option>
            <option>Product request</option>
            <option>Visit the shop</option>
            <option>Wholesale / bulk order</option>
            <option>Press</option>
            <option>Partnership</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="eyebrow">Message</span>
        <textarea
          required
          name="Message"
          rows={5}
          className="input mt-1 resize-none"
          placeholder="Tell us a little about what you're looking for."
        />
      </label>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={status === 'sending'} className="btn-primary">
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'error' && (
          <span className="font-sans text-xs text-terracotta">
            {err || 'Something went wrong — please try again.'}
          </span>
        )}
      </div>
    </form>
  );
}
