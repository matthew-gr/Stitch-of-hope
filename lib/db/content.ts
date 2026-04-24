import { cache } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import type { ContentKey, SiteContent } from './types';

const DEFAULTS: SiteContent = {
  'hero.eyebrow': 'Muraho — welcome',
  'hero.heading_line1': 'Made by hand.',
  'hero.heading_line2': 'Made with purpose.',
  'hero.subheading': 'Premium apparel, bags, and home goods — crafted in Kigali by women shaping their own futures.',
  'hero.image_url': '/images/Store Front.jpeg',
  'story.eyebrow': 'Our Story',
  'story.heading': 'A workshop in Biryogo, a mission in every stitch.',
  'story.paragraph_1': '',
  'story.paragraph_2': '',
  'story.paragraph_3': '',
  'story.image_url': '/images/Store Front.jpeg',
  stats: [
    { k: '[X]', v: 'Women employed' },
    { k: '[X]', v: 'Pieces handcrafted' },
    { k: '2 yrs', v: 'Sewing stories in Kigali' },
  ],
  testimonials: [
    {
      quote: 'Beautiful craftsmanship. Every piece tells a story.',
      name: '[Placeholder — replace]',
      location: 'Kigali',
    },
    {
      quote: "I've bought three bags and they all get compliments every single time.",
      name: '[Placeholder — replace]',
      location: 'London',
    },
    {
      quote: 'Supporting an incredible mission, and the quality is genuinely top-notch.',
      name: '[Placeholder — replace]',
      location: 'Nairobi',
    },
  ],
  faqs: [
    {
      q: 'Do you ship internationally?',
      a: 'Yes — we ship worldwide from our Kigali workshop. Rates and timing depend on your destination; we share a quote with every request so there are no surprises.',
    },
    {
      q: 'Can I request custom sizes or colours?',
      a: "Absolutely. Note your preference in the request form for any product and we'll tailor it to you.",
    },
    {
      q: 'Do you offer wholesale or bulk orders?',
      a: "Yes. For hotels, NGOs, conferences, and gifting programs, please use the Wholesale option on our contact form — we'll respond within 48 hours.",
    },
    {
      q: 'How long does a piece take to make?',
      a: 'Each piece is sewn by hand in our workshop. Most items ship within 1–2 weeks of order confirmation; intricate pieces or larger batches take a little longer.',
    },
    {
      q: 'Can I visit the workshop?',
      a: "We'd love that. Our shop at KN 7 Ave, Biryogo is open every day from 9am to 6pm. Drop in — we'll pour you a coffee.",
    },
  ],
  instagram_posts: [],
  'visit_cta.heading': 'Come say muraho in Biryogo.',
  'shop.address_line1': 'KN 7 Ave, Biryogo',
  'shop.address_line2': 'Kigali, Rwanda',
  'shop.landmark': "Across from the Nyamirambo Women's Center",
  'shop.hours': 'Monday — Sunday · 9:00 – 18:00',
  'shop.email': 'Dalton.hardage@yahoo.com',
  'shop.whatsapp': '',
  'shop.instagram_url': 'https://www.instagram.com/stitch_of_hope_rw/',
  'shop.map_url': 'https://www.google.com/maps?q=Nyamirambo+Women%27s+Center+Kigali&output=embed',
  'shop.storefront_image_url': '/images/Store Front.jpeg',
};

export const getContent = cache(async (): Promise<SiteContent> => {
  try {
    const { data, error } = await supabaseAdmin()
      .from('site_content')
      .select('key, value');
    if (error) throw error;

    const out: Partial<SiteContent> = {};
    for (const row of data ?? []) {
      (out as Record<string, unknown>)[row.key] = row.value;
    }
    return { ...DEFAULTS, ...(out as Partial<SiteContent>) } as SiteContent;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[getContent] falling back to defaults:', (err as Error).message);
    }
    return DEFAULTS;
  }
});

export async function updateContent(updates: Partial<SiteContent>) {
  const now = new Date().toISOString();
  const rows = Object.entries(updates).map(([key, value]) => ({
    key,
    value: value as unknown,
    updated_at: now,
  }));
  if (rows.length === 0) return;
  const { error } = await supabaseAdmin()
    .from('site_content')
    .upsert(rows, { onConflict: 'key' });
  if (error) throw error;
}

export async function setContent<K extends ContentKey>(key: K, value: SiteContent[K]) {
  await updateContent({ [key]: value } as Partial<SiteContent>);
}
