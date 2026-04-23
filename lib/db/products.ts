import { supabaseAdmin } from '@/lib/supabase';
import type { Category, Product } from './types';

type ProductRow = Omit<Product, 'image'>;

function hydrate(row: ProductRow): Product {
  return { ...row, image: row.images?.[0] ?? '' };
}

export async function listProducts(opts: { includeArchived?: boolean } = {}): Promise<Product[]> {
  try {
    const query = supabaseAdmin()
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (!opts.includeArchived) query.eq('archived', false);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((r) => hydrate(r as ProductRow));
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[listProducts] falling back to empty:', (err as Error).message);
    }
    return [];
  }
}

export async function listFeaturedProducts(limit = 4): Promise<Product[]> {
  try {
    const { data, error } = await supabaseAdmin()
      .from('products')
      .select('*')
      .eq('archived', false)
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map((r) => hydrate(r as ProductRow));
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[listFeaturedProducts] falling back to empty:', (err as Error).message);
    }
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin()
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? hydrate(data as ProductRow) : null;
}

export type ProductInput = {
  slug: string;
  name: string;
  category: Category;
  blurb: string;
  details: string;
  images: string[];
  sort_order?: number;
  featured?: boolean;
  archived?: boolean;
};

export async function createProduct(input: ProductInput) {
  const { error } = await supabaseAdmin().from('products').insert({
    slug: input.slug,
    name: input.name,
    category: input.category,
    blurb: input.blurb,
    details: input.details,
    images: input.images,
    sort_order: input.sort_order ?? 0,
    featured: input.featured ?? false,
    archived: input.archived ?? false,
  });
  if (error) throw error;
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const { error } = await supabaseAdmin()
    .from('products')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await supabaseAdmin().from('products').delete().eq('id', id);
  if (error) throw error;
}
