import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import FaqList from '@/components/FaqList';
import { getContent } from '@/lib/db/content';

export const revalidate = 60;

export const metadata = {
  title: 'Visit Us in Biryogo, Kigali',
  description:
    "Find our Kigali sewing shop at KN 7 Ave, Biryogo — across from the Nyamirambo Women's Center. Open 9am–6pm daily. Wholesale and press inquiries welcome.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Visit Us in Biryogo, Kigali · Stitch of Hope',
    description:
      "Find our Kigali sewing shop at KN 7 Ave, Biryogo — across from the Nyamirambo Women's Center. Open 9am–6pm daily.",
    url: '/contact',
    type: 'website' as const,
  },
};

export default async function ContactPage() {
  const c = await getContent();

  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-10">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 font-display font-light text-5xl md:text-7xl text-ink leading-[1] max-w-3xl">
          Come visit. <span className="italic">Or say hello.</span>
        </h1>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 space-y-10">
          <div className="reveal relative aspect-[4/5] overflow-hidden bg-bone">
            <Image
              src={c['shop.storefront_image_url']}
              alt="Stitch of Hope storefront in Biryogo, Kigali"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="eyebrow">Visit</p>
              <p className="mt-2 font-display text-xl text-ink leading-snug">
                {c['shop.address_line1']}<br />{c['shop.address_line2']}
              </p>
              <p className="mt-2 font-sans text-sm text-mist">{c['shop.landmark']}</p>
            </div>

            <div>
              <p className="eyebrow">Hours</p>
              <p className="mt-2 font-sans text-ink/80">{c['shop.hours']}</p>
            </div>

            <div>
              <p className="eyebrow">Reach us</p>
              <p className="mt-2 font-sans text-ink/80">
                <a href={`mailto:${c['shop.email']}`} className="underline-offset-4 hover:underline">
                  {c['shop.email']}
                </a>
              </p>
              {c['shop.whatsapp'] ? (
                <p className="mt-1 font-sans text-ink/80 text-sm">
                  WhatsApp: <a href={`https://wa.me/${c['shop.whatsapp'].replace(/\D/g, '')}`} className="underline-offset-4 hover:underline">{c['shop.whatsapp']}</a>
                </p>
              ) : (
                <p className="mt-1 font-sans text-ink/60 text-sm italic">WhatsApp: coming soon</p>
              )}
              <p className="mt-3 font-sans text-sm">
                <a
                  href={c['shop.instagram_url']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/80 hover:text-ink underline-offset-4 hover:underline"
                >
                  Follow on Instagram →
                </a>
              </p>
            </div>
          </div>

          <div className="reveal relative w-full h-[320px] overflow-hidden border border-ink/10">
            <iframe
              title="Stitch of Hope location"
              src={c['shop.map_url']}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, filter: 'grayscale(20%) contrast(0.95)' }}
            />
          </div>
        </div>

        <div id="wholesale" className="lg:col-span-7 lg:pl-12 lg:border-l border-ink/10">
          <p className="eyebrow">Send a note</p>
          <h2 className="mt-3 font-display font-light text-3xl md:text-4xl text-ink leading-tight max-w-md">
            Tell us what you're looking for.
          </h2>
          <p className="mt-4 font-sans text-sm text-ink/70 max-w-md leading-relaxed">
            For product requests, wholesale inquiries, press, or a simple hello — we
            read every message and reply as soon as we can.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <FaqList items={c.faqs} />
    </>
  );
}
