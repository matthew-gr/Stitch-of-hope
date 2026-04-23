/**
 * GA4 event tracking helper. Safe to call from anywhere — no-ops on the server
 * or when gtag isn't loaded yet.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag === 'function') {
    w.gtag('event', name, params);
  }
}
