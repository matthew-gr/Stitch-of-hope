import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { getProduct } from '@/lib/db/products';
import { deleteProductAction, updateProductAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const update = updateProductAction.bind(null, product.id);
  const del = deleteProductAction.bind(null, product.id);

  return (
    <div>
      <Link href="/admin/products" className="text-xs uppercase tracking-luxe text-ink/60 hover:text-ink">
        ← Products
      </Link>
      <p className="eyebrow mt-6">Edit</p>
      <h1 className="mt-2 font-display text-3xl text-ink">{product.name}</h1>

      <div className="mt-10">
        <ProductForm action={update} initial={product} onDelete={del} />
      </div>
    </div>
  );
}
