'use client';

import { trackEvent } from '@/lib/analytics';

const DEFAULT_MESSAGE = "Muraho! I'm interested in learning more about Stitch of Hope.";

export default function WhatsAppButton({ number }: { number: string }) {
  const digits = (number || '').replace(/\D/g, '');
  if (!digits) return null;

  const href = `https://wa.me/${digits}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackEvent('click_whatsapp')}
      className="fixed z-40 bottom-5 right-5 md:bottom-7 md:right-7 group"
    >
      <span
        className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] hover:shadow-[0_16px_40px_-8px_rgba(37,211,102,0.75)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.06]"
      >
        {/* WhatsApp glyph */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-7 h-7 md:w-8 md:h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.64 6.02L0 24l6.17-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 21.82a9.79 9.79 0 0 1-4.99-1.37l-.36-.21-3.66.96.98-3.57-.23-.37A9.82 9.82 0 1 1 21.82 12 9.8 9.8 0 0 1 12 21.82zm5.36-7.33c-.29-.15-1.74-.86-2-.96-.27-.1-.46-.15-.66.15-.2.29-.76.96-.93 1.15-.17.2-.34.22-.63.07a7.96 7.96 0 0 1-3.92-3.43c-.3-.5.29-.47.85-1.56.1-.2.05-.37-.02-.51l-.92-2.23c-.24-.57-.49-.5-.67-.5h-.57c-.19 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.42s1.05 2.82 1.2 3.02c.14.2 2.06 3.15 5 4.42.7.3 1.25.48 1.68.61.7.22 1.35.19 1.86.12.57-.08 1.74-.71 1.99-1.4.25-.68.25-1.27.17-1.39-.07-.12-.27-.2-.56-.34z" />
        </svg>
      </span>
      {/* Pulse ring */}
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" style={{ animationDuration: '2.5s' }} />
    </a>
  );
}
