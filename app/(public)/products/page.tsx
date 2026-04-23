import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Ornament from '@/components/Ornament';
import { listProducts } from '@/lib/db/products';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stitch-of-hope.com';

export const metadata = {
  title: 'Products — Handmade Bags, Apparel & Home Goods',
  description:
    'Shop our Kigali-handcrafted collection — totes, cardigans, pillows, and more. Each piece sewn by women artisans in Rwanda. Request items directly from our workshop.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Products — Handmade in Kigali · Stitch of Hope',
    description:
      'Shop our Kigali-handcrafted collection — totes, cardigans, pillows, and more. Each piece sewn by women artisans in Rwanda.',
    url: '/products',
    type: 'website' as const,
  },
};

export default async function ProductsPage() {
  const products = await listProducts();

  const wholesaleImage = products.find((p) => p.slug === 'bag-lady-silhouette')?.image
    ?? products.find((p) => p.category === 'Bags')?.image
    ?? products[0]?.image
    ?? '/images/Bag (Lady Shillouette).PNG';

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stitch of Hope — Products',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.blurb,
        category: p.category,
        image: p.image
          ? p.image.startsWith('http')
            ? p.image
            : `${SITE_URL}${encodeURI(p.image)}`
          : undefined,
        brand: { '@type': 'Brand', name: 'Stitch of Hope' },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'RWF',
          url: `${SITE_URL}/products`,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-10 md:pb-14">
        <p className="eyebrow">Our Collection</p>
        <h1 className="mt-4 font-display font-light text-5xl md:text-7xl text-ink leading-[1] max-w-3xl">
          Made to be <span className="italic">kept.</span>
        </h1>
        <p className="mt-6 font-sans text-base text-ink/70 max-w-xl leading-relaxed">
          Every piece is handcrafted in our Kigali workshop. Find something you love,
          tell us your size or colour, and we'll prepare it for you.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <Suspense fallback={null}>
          <ProductGrid products={products} />
        </Suspense>
      </section>

      <Ornament className="my-16 md:my-20" />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <div className="relative overflow-hidden bg-bone/50 border border-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[320px] md:min-h-[440px]">
              <Image
                src={wholesaleImage}
                alt="Handcrafted totes ready for wholesale orders"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center">
              <p className="eyebrow">Bulk &amp; Wholesale</p>
              <h2 className="mt-4 font-display font-light text-3xl md:text-4xl text-ink leading-tight max-w-md">
                Buying for a hotel, NGO, or gifting program?
              </h2>
              <p className="mt-5 font-sans text-sm md:text-base text-ink/70 leading-relaxed max-w-md">
                We regularly produce custom batches for hospitality groups, embassies,
                conferences, and corporate gifting. Tell us your quantity and timeline —
                we'll craft a quote within 48 hours.
              </p>
              <div className="mt-8">
                <Link href="/contact#wholesale" className="btn-outline">
                  Request a wholesale quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
