import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import Reveal from '@/components/Reveal';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Stitch of Hope — Handcrafted in Kigali',
  description:
    'Premium handmade apparel, bags, and home goods crafted by women artisans in Kigali, Rwanda.',
  openGraph: {
    title: 'Stitch of Hope — Handcrafted in Kigali',
    description:
      'Premium handmade apparel, bags, and home goods crafted by women artisans in Kigali, Rwanda.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <Reveal />
        {children}
      </body>
    </html>
  );
}
