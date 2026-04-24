import Image from 'next/image';
import type { InstagramPost } from '@/lib/db/types';

export default function InstagramGrid({
  posts,
  profileUrl,
}: {
  posts: InstagramPost[];
  profileUrl: string;
}) {
  const visible = posts.filter((p) => p.image_url && p.image_url.trim());
  if (visible.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-24">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
        <div>
          <p className="eyebrow">From the workshop</p>
          <h2 className="mt-3 font-display font-light text-3xl md:text-4xl text-ink">
            On Instagram.
          </h2>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex font-sans text-[12px] uppercase tracking-luxe text-ink/70 hover:text-ink transition border-b border-ink/30 hover:border-ink pb-1"
        >
          @stitch_of_hope_rw →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {visible.slice(0, 4).map((p, i) => {
          const Wrapper: React.ElementType = p.link_url ? 'a' : 'div';
          const wrapperProps = p.link_url
            ? { href: p.link_url, target: '_blank', rel: 'noopener noreferrer' }
            : {};
          return (
            <Wrapper
              key={i}
              {...wrapperProps}
              className="group block relative aspect-square overflow-hidden bg-bone"
              aria-label={p.caption || `Instagram post ${i + 1}`}
            >
              <Image
                src={p.image_url}
                alt={p.caption || 'Stitch of Hope on Instagram'}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              {p.caption && (
                <div className="absolute inset-x-0 bottom-0 p-4 text-ivory text-xs leading-relaxed translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 line-clamp-3">
                  {p.caption}
                </div>
              )}
            </Wrapper>
          );
        })}
      </div>

      <div className="mt-8 sm:hidden text-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex font-sans text-[12px] uppercase tracking-luxe text-ink/70 hover:text-ink transition border-b border-ink/30 pb-1"
        >
          @stitch_of_hope_rw →
        </a>
      </div>
    </section>
  );
}
