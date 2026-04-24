'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { updateContent } from '@/lib/db/content';
import type { Faq, InstagramPost, SiteContent, Stat, Testimonial } from '@/lib/db/types';

async function requireAdmin() {
  const s = await getSession();
  if (!s.admin) throw new Error('Unauthorized');
}

function zipRows<T>(formData: FormData, fields: { [K in keyof T]: string }): T[] {
  const keys = Object.keys(fields) as (keyof T)[];
  const cols: Record<string, string[]> = {};
  for (const k of keys) {
    cols[k as string] = formData.getAll(fields[k]).map((v) => String(v ?? ''));
  }
  const len = Math.max(0, ...keys.map((k) => cols[k as string].length));
  const rows: T[] = [];
  for (let i = 0; i < len; i++) {
    const obj = {} as T;
    for (const k of keys) {
      (obj as Record<string, string>)[k as string] = (cols[k as string][i] ?? '').trim();
    }
    rows.push(obj);
  }
  return rows;
}

export async function saveHomeContent(formData: FormData) {
  await requireAdmin();

  const stats: Stat[] = [0, 1, 2].map((i) => ({
    k: String(formData.get(`stat_${i}_k`) ?? '').trim(),
    v: String(formData.get(`stat_${i}_v`) ?? '').trim(),
  }));

  const testimonials = zipRows<Testimonial>(formData, {
    quote: 'testimonial_quote',
    name: 'testimonial_name',
    location: 'testimonial_location',
  }).filter((t) => t.quote);

  const faqs = zipRows<Faq>(formData, {
    q: 'faq_q',
    a: 'faq_a',
  }).filter((f) => f.q);

  const instagram_posts = zipRows<InstagramPost>(formData, {
    image_url: 'ig_image',
    caption: 'ig_caption',
    link_url: 'ig_link',
  }).filter((p) => p.image_url);

  const updates: Partial<SiteContent> = {
    'hero.eyebrow': String(formData.get('hero.eyebrow') ?? ''),
    'hero.heading_line1': String(formData.get('hero.heading_line1') ?? ''),
    'hero.heading_line2': String(formData.get('hero.heading_line2') ?? ''),
    'hero.subheading': String(formData.get('hero.subheading') ?? ''),
    'hero.image_url': String(formData.get('hero.image_url') ?? ''),
    'story.eyebrow': String(formData.get('story.eyebrow') ?? ''),
    'story.heading': String(formData.get('story.heading') ?? ''),
    'story.paragraph_1': String(formData.get('story.paragraph_1') ?? ''),
    'story.paragraph_2': String(formData.get('story.paragraph_2') ?? ''),
    'story.paragraph_3': String(formData.get('story.paragraph_3') ?? ''),
    'story.image_url': String(formData.get('story.image_url') ?? ''),
    stats,
    testimonials,
    faqs,
    instagram_posts,
    'visit_cta.heading': String(formData.get('visit_cta.heading') ?? ''),
  };

  await updateContent(updates);
  revalidatePath('/', 'layout');
}
