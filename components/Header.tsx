'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { InstagramIcon } from './Icons';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ instagramUrl }: { instagramUrl: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-ink/10 transition-shadow duration-500 ease-quiet ${
        scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.04)]' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/Logo.jpg"
            alt="Stitch of Hope"
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="font-display text-lg tracking-wide text-ink hidden sm:block">
            Stitch of Hope
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-[12px] uppercase tracking-luxe text-ink/70 hover:text-ink transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stitch of Hope on Instagram"
            className="text-ink/60 hover:text-ink transition-colors duration-300"
          >
            <InstagramIcon size={18} />
          </a>
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-ink"
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M0 1h22M0 7h22M0 13h22" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-white">
          <nav className="flex flex-col px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 font-sans text-sm uppercase tracking-luxe text-ink/80"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stitch of Hope on Instagram"
              className="py-3 flex items-center gap-3 font-sans text-sm uppercase tracking-luxe text-ink/80"
            >
              <InstagramIcon size={18} />
              <span>Instagram</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
