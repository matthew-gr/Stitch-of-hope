import Image from 'next/image';
import Link from 'next/link';
import { listFeaturedProducts } from '@/lib/db/products';
import { getContent } from '@/lib/db/content';
import Ornament from '@/components/Ornament';

export const revalidate = 60;

export default async function Home() {
  const [c, featured] = await Promise.all([getContent(), listFeaturedProducts(4)]);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[82vh] min-h-[560px] w-full overflow-hidden">
          <Image
            src={c['hero.image_url']}
            alt="Stitch of Hope — handcrafted in Kigali"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Stronger ivory wash on mobile for text legibility; subtler on desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/40 to-ivory md:from-ivory/25 md:via-ivory/10 md:to-ivory/90" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-16 md:pb-24">
              <p className="eyebrow text-ink/70">{c['hero.eyebrow']}</p>
              <h1 className="mt-4 font-display font-light text-5xl md:text-7xl lg:text-8xl text-ink leading-[0.98] tracking-tight max-w-4xl">
                {c['hero.heading_line1']}<br />
                <span className="italic">{c['hero.heading_line2']}</span>
              </h1>
              <p className="mt-6 font-sans text-base md:text-lg text-ink/70 max-w-xl leading-relaxed">
                {c['hero.subheading']}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary">Shop our products</Link>
                <Link href="/contact" className="btn-outline">Visit the shop</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ornament className="pt-20 md:pt-24" />

      {/* STORY */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-5 reveal">
          <div className="relative aspect-[4/5] overflow-hidden bg-bone">
            <Image
              src={c['story.image_url']}
              alt="The Stitch of Hope workshop in Kigali"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-7 reveal">
          <p className="eyebrow">{c['story.eyebrow']}</p>
          <h2 className="mt-4 font-display font-light text-4xl md:text-5xl leading-tight text-ink max-w-xl">
            {c['story.heading']}
          </h2>
          <div className="mt-8 space-y-5 font-sans text-[15px] md:text-base text-ink/75 leading-[1.8] max-w-xl">
            {[c['story.paragraph_1'], c['story.paragraph_2'], c['story.paragraph_3']]
              .filter(Boolean)
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-ink/10 bg-bone/40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center">
          {c.stats.map((s) => (
            <div key={s.v} className="reveal">
              <p className="font-display text-5xl md:text-6xl text-ink font-light">{s.k}</p>
              <p className="mt-3 eyebrow">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-28">
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="eyebrow">The Collection</p>
              <h2 className="mt-3 font-display font-light text-4xl md:text-5xl text-ink">
                A few favourites.
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex font-sans text-[12px] uppercase tracking-luxe text-ink/70 hover:text-ink transition border-b border-ink/30 hover:border-ink pb-1"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 md:gap-x-8 gap-y-12">
            {featured.map((p) => (
              <Link key={p.id} href="/products" className="group reveal">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] ease-quiet group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <p className="mt-4 eyebrow">{p.category}</p>
                <h3 className="mt-1.5 font-display text-lg md:text-xl text-ink">{p.name}</h3>
              </Link>
            ))}
          </div>

          <div className="mt-12 sm:hidden">
            <Link href="/products" className="btn-outline w-full">View all products</Link>
          </div>
        </section>
      )}

      {/* VISIT CTA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-8">
        <div className="relative overflow-hidden bg-ink text-ivory">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
              <p className="eyebrow text-ivory/50">Find us</p>
              <h2 className="mt-4 font-display font-light text-4xl md:text-5xl leading-tight">
                {c['visit_cta.heading']}
              </h2>
              <p className="mt-6 font-sans text-sm text-ivory/75 leading-relaxed max-w-md">
                {c['shop.address_line1']} — {c['shop.landmark']}. Open {c['shop.hours']}.
              </p>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-ivory/40 hover:bg-ivory hover:text-ink text-ivory px-7 py-3.5 text-sm tracking-luxe uppercase transition-all duration-500 ease-quiet"
                >
                  Plan your visit
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px] md:min-h-[420px]">
              <Image
                src={c['shop.storefront_image_url']}
                alt="Stitch of Hope storefront"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
