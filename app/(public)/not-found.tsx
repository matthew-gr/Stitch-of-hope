import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="min-h-[72vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 font-display font-light text-5xl md:text-6xl text-ink leading-[1.05]">
          This thread <span className="italic">unravelled.</span>
        </h1>
        <p className="mt-6 font-sans text-ink/70 leading-relaxed">
          The page you were looking for doesn't exist or may have moved. Let us stitch
          you back to something beautiful.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Back home</Link>
          <Link href="/products" className="btn-outline">Shop our products</Link>
        </div>
      </div>
    </section>
  );
}
