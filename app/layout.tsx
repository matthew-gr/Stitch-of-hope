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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stitch-of-hope.com';

const DESCRIPTION =
  'Premium handcrafted bags, apparel, and home goods — sewn by women artisans in Kigali, Rwanda. Visit our shop in Biryogo or request pieces online.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Stitch of Hope — Handmade Bags, Apparel & Gifts in Kigali, Rwanda',
    template: '%s · Stitch of Hope',
  },
  description: DESCRIPTION,
  applicationName: 'Stitch of Hope',
  authors: [{ name: 'Stitch of Hope LTD' }],
  keywords: [
    'Kigali sewing shop',
    'handmade bags Rwanda',
    'artisan gifts Kigali',
    'Rwanda handcrafted apparel',
    'Nyamirambo women',
    'handmade tote Rwanda',
    'ethical fashion Kigali',
    'souvenirs Rwanda',
    'Stitch of Hope',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Stitch of Hope',
    title: 'Stitch of Hope — Handmade Bags, Apparel & Gifts in Kigali, Rwanda',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stitch of Hope — Handcrafted in Kigali',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'shopping',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Open a TCP+TLS connection to the Supabase image CDN early so admin-uploaded hero/product images land faster */}
        <link rel="preconnect" href="https://supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://supabase.co" />
      </head>
      <body className="font-sans">
        <Reveal />
        {children}
      </body>
    </html>
  );
}
