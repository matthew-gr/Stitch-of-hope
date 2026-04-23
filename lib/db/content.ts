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
