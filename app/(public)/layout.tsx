import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import { getContent } from '@/lib/db/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stitch-of-hope.com';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let contact = {
    instagram: 'https://www.instagram.com/stitch_of_hope_rw/',
    address_line1: 'KN 7 Ave, Biryogo',
    address_line2: 'Kigali, Rwanda',
    landmark: "Across from Nyamirambo Women's Center",
    hours: '9:00 — 18:00',
    email: 'Dalton.hardage@yahoo.com',
    whatsapp: '',
    storefront: '/images/Store Front.jpeg',
  };
  try {
    const c = await getContent();
    contact = {
      instagram: c['shop.instagram_url'],
      address_line1: c['shop.address_line1'],
      address_line2: c['shop.address_line2'],
      landmark: c['shop.landmark'],
      hours: c['shop.hours'],
      email: c['shop.email'],
      whatsapp: c['shop.whatsapp'],
      storefront: c['shop.storefront_image_url'],
    };
  } catch {
    // DB not yet configured — fall back to defaults
  }

  // LocalBusiness / ClothingStore structured data
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${SITE_URL}#shop`,
    name: 'Stitch of Hope',
    legalName: 'Stitch of Hope LTD',
    description:
      'Handcrafted apparel, bags, and home goods sewn by women artisans in Kigali, Rwanda.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/Logo.jpg`,
    image: [
      `${SITE_URL}/opengraph-image`,
      contact.storefront.startsWith('http')
        ? contact.storefront
        : `${SITE_URL}${encodeURI(contact.storefront)}`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address_line1,
      addressLocality: 'Kigali',
      addressCountry: 'RW',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.964801,
      longitude: 30.062424,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    email: contact.email,
    sameAs: [contact.instagram].filter(Boolean),
    areaServed: { '@type': 'Country', name: 'Rwanda' },
    priceRange: '$$',
  };
  if (contact.whatsapp && contact.whatsapp.trim()) {
    jsonLd.telephone = contact.whatsapp;
  }

  return (
    <>
      <Header instagramUrl={contact.instagram} />
      <main>{children}</main>
      <Footer
        contact={{
          instagram: contact.instagram,
          address_line1: contact.address_line1,
          address_line2: contact.address_line2,
          landmark: contact.landmark,
          hours: contact.hours,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Analytics />
    </>
  );
}
