import Link from 'next/link';
import { InstagramIcon } from './Icons';

type Contact = {
  instagram: string;
  address_line1: string;
  address_line2: string;
  landmark: string;
  hours: string;
};

export default function Footer({ contact }: { contact: Contact }) {
  return (
    <footer className="mt-32 border-t border-ink/10 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 flex flex-col">
          <p className="font-display text-2xl text-ink">Stitch of Hope</p>
          <p className="mt-3 font-sans text-sm text-mist max-w-sm leading-relaxed">
            Handcrafted in Kigali. Designed with intention, made by women shaping
            their own futures.
          </p>
          <p className="mt-6 eyebrow">Murakoze — thank you for visiting.</p>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stitch of Hope on Instagram"
            className="mt-8 inline-flex items-center justify-center w-10 h-10 border border-ink/20 text-ink/70 hover:border-ink hover:text-ink transition-colors duration-300"
          >
            <InstagramIcon size={18} />
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4">Visit</p>
          <p className="font-sans text-sm text-ink/80 leading-relaxed">
            {contact.address_line1}<br />
            {contact.address_line2}<br />
            <span className="text-mist">{contact.landmark}</span>
          </p>
          <p className="mt-3 font-sans text-sm text-ink/80">{contact.hours}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 font-sans text-sm text-ink/80">
            <li><Link href="/" className="hover:text-ink transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-ink transition">Products</Link></li>
            <li><Link href="/contact" className="hover:text-ink transition">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-mist">
            © {new Date().getFullYear()} Stitch of Hope LTD.{' '}
            <Link href="/privacy" className="hover:text-ink transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
          </p>
          <p className="font-sans text-xs text-mist">
            Byakozwe urukundo i Kigali · Made with love in Kigali
          </p>
        </div>
      </div>
    </footer>
  );
}
