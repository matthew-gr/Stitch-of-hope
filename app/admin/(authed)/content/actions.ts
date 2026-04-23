'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { updateContent } from '@/lib/db/content';
import type { SiteContent, Stat } from '@/lib/db/types';

async function requireAdmin() {
  const s = await getSession();
  if (!s.admin) throw new Error('Unauthorized');
}

export async function saveHomeContent(formData: FormData) {
  await requireAdmin();

  const stats: Stat[] = [0, 1, 2].map((i) => ({
    k: String(formData.get(`stat_${i}_k`) ?? '').trim(),
    v: String(formData.get(`stat_${i}_v`) ?? '').trim(),
  }));

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
    'visit_cta.heading': String(formData.get('visit_cta.heading') ?? ''),
  };

  await updateContent(updates);
  revalidatePath('/', 'layout');
}
