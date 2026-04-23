'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { createProduct, deleteProduct, updateProduct, type ProductInput } from '@/lib/db/products';
import type { Category } from '@/lib/db/types';
import { CATEGORIES } from '@/lib/db/types';

async function requireAdmin() {
  const s = await getSession();
  if (!s.admin) throw new Error('Unauthorized');
}

function parseCategory(v: FormDataEntryValue | null): Category {
  const s = String(v ?? '');
  return (CATEGORIES.includes(s as Category) ? s : 'Apparel') as Category;
}

function parseImages(formData: FormData): string[] {
  const raw = formData.getAll('images[]').map(String).filter(Boolean);
  return raw;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function extractFields(formData: FormData): ProductInput {
  const name = String(formData.get('name') ?? '').trim();
  const slugInput = String(formData.get('slug') ?? '').trim();
  const slug = slugInput || slugify(name);
  return {
    slug,
    name,
    category: parseCategory(formData.get('category')),
    blurb: String(formData.get('blurb') ?? '').trim(),
    details: String(formData.get('details') ?? '').trim(),
    images: parseImages(formData),
    sort_order: Number(formData.get('sort_order') ?? 0) || 0,
    featured: formData.get('featured') === 'on',
    archived: formData.get('archived') === 'on',
  };
}

export async function createProductAction(formData: FormData) {
  await requireAdmin();
  const input = extractFields(formData);
  if (!input.name || !input.slug) throw new Error('Name and slug are required');
  await createProduct(input);
  revalidatePath('/', 'layout');
  redirect('/admin/products');
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin();
  const input = extractFields(formData);
  await updateProduct(id, input);
  revalidatePath('/', 'layout');
  redirect('/admin/products');
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  await deleteProduct(id);
  revalidatePath('/', 'layout');
  redirect('/admin/products');
}
