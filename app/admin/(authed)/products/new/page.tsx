import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';
import { createProductAction } from '../actions';

export const dynamic = 'force-dynamic';

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin/products" className="text-xs uppercase tracking-luxe text-ink/60 hover:text-ink">
        ← Products
      </Link>
      <p className="eyebrow mt-6">New product</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Add a product</h1>

      <div className="mt-10">
        <ProductForm action={createProductAction} />
      </div>
    </div>
  );
}
