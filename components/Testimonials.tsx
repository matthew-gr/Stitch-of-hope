import type { Testimonial } from '@/lib/db/types';

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const filtered = items.filter((t) => t.quote && t.quote.trim().length > 0);
  if (filtered.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24">
      <div className="text-center mb-12 md:mb-16">
        <p className="eyebrow">In their words</p>
        <h2 className="mt-3 font-display font-light text-3xl md:text-4xl text-ink">
          What our customers say.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
        {filtered.slice(0, 6).map((t, i) => (
          <figure key={i} className="reveal text-center md:text-left">
            <svg
              className="mx-auto md:mx-0 text-gold/70"
              width="28"
              height="22"
              viewBox="0 0 28 22"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.4 22H0l4-9V0h10v13l-3.6 9zm17.6 0h-10.4l4-9V0H32v13l-4 9h-.001z" transform="translate(-1.6)" />
            </svg>
            <blockquote className="mt-5 font-display font-light text-xl md:text-[22px] text-ink leading-[1.35] italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            {(t.name || t.location) && (
              <figcaption className="mt-5 eyebrow text-mist">
                {[t.name, t.location].filter(Boolean).join(' · ')}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
