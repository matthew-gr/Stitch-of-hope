import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContent } from '@/lib/db/content';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let contact = {
    instagram: 'https://www.instagram.com/stitch_of_hope_rw/',
    address_line1: 'KN 7 Ave, Biryogo',
    address_line2: 'Kigali, Rwanda',
    landmark: "Across from Nyamirambo Women's Center",
    hours: '9:00 — 18:00',
  };
  try {
    const c = await getContent();
    contact = {
      instagram: c['shop.instagram_url'],
      address_line1: c['shop.address_line1'],
      address_line2: c['shop.address_line2'],
      landmark: c['shop.landmark'],
      hours: c['shop.hours'],
    };
  } catch {
    // DB not yet configured — fall back to defaults
  }

  return (
    <>
      <Header instagramUrl={contact.instagram} />
      <main>{children}</main>
      <Footer contact={contact} />
    </>
  );
}
