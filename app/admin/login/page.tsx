'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [err, setErr] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErr('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setErr(data.error || 'Login failed');
        setStatus('error');
      }
    } catch {
      setErr('Network error');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-mist">Stitch of Hope</p>
        <h1 className="mt-3 font-display text-3xl text-ink">Admin</h1>
        <p className="mt-2 font-sans text-sm text-ink/60">Sign in to manage the site.</p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <label className="block">
            <span className="eyebrow">Password</span>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input mt-1"
              placeholder="Enter shared password"
            />
          </label>

          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
            {status === 'sending' ? 'Signing in…' : 'Sign in'}
          </button>

          {err && <p className="font-sans text-xs text-terracotta">{err}</p>}
        </form>
      </div>
    </div>
  );
}
