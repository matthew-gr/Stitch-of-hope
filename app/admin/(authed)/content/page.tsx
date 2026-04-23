import { getContent } from '@/lib/db/content';
import ImageField from '@/components/admin/ImageField';
import { saveHomeContent } from './actions';

export const dynamic = 'force-dynamic';

export default async function ContentPage() {
  const c = await getContent();

  return (
    <div>
      <p className="eyebrow">Home content</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Edit the home page</h1>
      <p className="mt-2 font-sans text-sm text-ink/60 max-w-lg">
        Changes save immediately and appear on the public site within seconds.
      </p>

      <form action={saveHomeContent} className="mt-10 space-y-12 max-w-3xl">
        {/* HERO */}
        <section className="border border-ink/10 p-6 md:p-8 space-y-6 bg-bone/20">
          <h2 className="font-display text-xl text-ink">Hero</h2>

          <label className="block">
            <span className="eyebrow">Eyebrow</span>
            <input name="hero.eyebrow" defaultValue={c['hero.eyebrow']} className="input mt-1" />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="eyebrow">Heading — line 1</span>
              <input name="hero.heading_line1" defaultValue={c['hero.heading_line1']} className="input mt-1" />
            </label>
            <label className="block">
              <span className="eyebrow">Heading — line 2 (italic)</span>
              <input name="hero.heading_line2" defaultValue={c['hero.heading_line2']} className="input mt-1" />
            </label>
          </div>
          <label className="block">
            <span className="eyebrow">Subheading</span>
            <textarea name="hero.subheading" defaultValue={c['hero.subheading']} rows={2} className="input mt-1 resize-none" />
          </label>
          <ImageField label="Hero background image" name="hero.image_url" value={c['hero.image_url']} />
        </section>

        {/* STORY */}
        <section className="border border-ink/10 p-6 md:p-8 space-y-6 bg-bone/20">
          <h2 className="font-display text-xl text-ink">Our Story</h2>

          <label className="block">
            <span className="eyebrow">Eyebrow</span>
            <input name="story.eyebrow" defaultValue={c['story.eyebrow']} className="input mt-1" />
          </label>
          <label className="block">
            <span className="eyebrow">Heading</span>
            <input name="story.heading" defaultValue={c['story.heading']} className="input mt-1" />
          </label>
          {[1, 2, 3].map((i) => (
            <label className="block" key={i}>
              <span className="eyebrow">Paragraph {i}</span>
              <textarea
                name={`story.paragraph_${i}`}
                defaultValue={c[`story.paragraph_${i}` as keyof typeof c] as string}
                rows={4}
                className="input mt-1 resize-none"
              />
            </label>
          ))}
          <ImageField label="Story image" name="story.image_url" value={c['story.image_url']} />
        </section>

        {/* STATS */}
        <section className="border border-ink/10 p-6 md:p-8 space-y-6 bg-bone/20">
          <h2 className="font-display text-xl text-ink">Stats strip</h2>
          <p className="text-xs text-ink/60">Three numbers or short phrases shown after the story.</p>
          {c.stats.map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block md:col-span-1">
                <span className="eyebrow">Stat {i + 1} — number</span>
                <input name={`stat_${i}_k`} defaultValue={s.k} className="input mt-1" />
              </label>
              <label className="block md:col-span-2">
                <span className="eyebrow">Stat {i + 1} — label</span>
                <input name={`stat_${i}_v`} defaultValue={s.v} className="input mt-1" />
              </label>
            </div>
          ))}
        </section>

        {/* VISIT CTA */}
        <section className="border border-ink/10 p-6 md:p-8 space-y-6 bg-bone/20">
          <h2 className="font-display text-xl text-ink">Visit CTA (bottom of home)</h2>
          <label className="block">
            <span className="eyebrow">Heading</span>
            <input name="visit_cta.heading" defaultValue={c['visit_cta.heading']} className="input mt-1" />
          </label>
          <p className="text-xs text-ink/60">The image used here is the storefront image — edit it in "Shop info".</p>
        </section>

        <div className="flex items-center gap-4 pt-2">
          <button type="submit" className="btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  );
}
