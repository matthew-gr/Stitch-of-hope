import type { Faq } from '@/lib/db/types';

export default function FaqList({ items }: { items: Faq[] }) {
  const filtered = items.filter((f) => f.q && f.q.trim());
  if (filtered.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
      <div className="border-t border-ink/10 pt-14 md:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">Good questions</p>
          <h2 className="mt-3 font-display font-light text-3xl md:text-4xl text-ink leading-tight">
            Before you ask.
          </h2>
          <p className="mt-4 font-sans text-sm text-ink/70 leading-relaxed max-w-sm">
            A few things people often want to know. If your question isn't here,
            send us a note — we reply to every message.
          </p>
        </div>

        <div className="lg:col-span-8 divide-y divide-ink/10 border-t border-ink/10">
          {filtered.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                <span className="font-display text-lg md:text-xl text-ink leading-snug">
                  {f.q}
                </span>
                <span
                  className="shrink-0 w-5 h-5 relative text-ink/60 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-current -translate-y-1/2" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-current -translate-x-1/2" />
                </span>
              </summary>
              {f.a && (
                <div className="mt-3 font-sans text-[15px] text-ink/70 leading-[1.8] max-w-2xl">
                  {f.a}
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
