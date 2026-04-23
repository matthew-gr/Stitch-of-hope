'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { updateContent } from '@/lib/db/content';
import type { SiteContent } from '@/lib/db/types';

async function requireAdmin() {
  const s = await getSession();
  if (!s.admin) throw new Error('Unauthorized');
}

export async function saveShopInfo(formData: FormData) {
  await requireAdmin();
  const updates: Partial<SiteContent> = {
    'shop.address_line1': String(formData.get('shop.address_line1') ?? ''),
    'shop.address_line2': String(formData.get('shop.address_line2') ?? ''),
    'shop.landmark': String(formData.get('shop.landmark') ?? ''),
    'shop.hours': String(formData.get('shop.hours') ?? ''),
    'shop.email': String(formData.get('shop.email') ?? ''),
    'shop.whatsapp': String(formData.get('shop.whatsapp') ?? ''),
    'shop.instagram_url': String(formData.get('shop.instagram_url') ?? ''),
    'shop.map_url': String(formData.get('shop.map_url') ?? ''),
    'shop.storefront_image_url': String(formData.get('shop.storefront_image_url') ?? ''),
  };
  await updateContent(updates);
  revalidatePath('/', 'layout');
}
