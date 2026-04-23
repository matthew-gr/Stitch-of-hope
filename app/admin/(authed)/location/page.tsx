import { getContent } from '@/lib/db/content';
import ImageField from '@/components/admin/ImageField';
import { saveShopInfo } from './actions';

export const dynamic = 'force-dynamic';

export default async function LocationPage() {
  const c = await getContent();

  return (
    <div>
      <p className="eyebrow">Shop info</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Address, hours & contact</h1>

      <form action={saveShopInfo} className="mt-10 space-y-8 max-w-3xl">
        <section className="border border-ink/10 p-6 md:p-8 space-y-5 bg-bone/20">
          <h2 className="font-display text-lg text-ink">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="eyebrow">Line 1</span>
              <input name="shop.address_line1" defaultValue={c['shop.address_line1']} className="input mt-1" />
            </label>
            <label className="block">
              <span className="eyebrow">Line 2</span>
              <input name="shop.address_line2" defaultValue={c['shop.address_line2']} className="input mt-1" />
            </label>
          </div>
          <label className="block">
            <span className="eyebrow">Landmark / cross-street</span>
            <input name="shop.landmark" defaultValue={c['shop.landmark']} className="input mt-1" />
          </label>
          <label className="block">
            <span className="eyebrow">Hours</span>
            <input name="shop.hours" defaultValue={c['shop.hours']} className="input mt-1" />
          </label>
        </section>

        <section className="border border-ink/10 p-6 md:p-8 space-y-5 bg-bone/20">
          <h2 className="font-display text-lg text-ink">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="eyebrow">Email</span>
              <input type="email" name="shop.email" defaultValue={c['shop.email']} className="input mt-1" />
            </label>
            <label className="block">
              <span className="eyebrow">WhatsApp</span>
              <input name="shop.whatsapp" defaultValue={c['shop.whatsapp']} placeholder="+250 ..." className="input mt-1" />
            </label>
          </div>
          <label className="block">
            <span className="eyebrow">Instagram URL</span>
            <input name="shop.instagram_url" defaultValue={c['shop.instagram_url']} className="input mt-1" />
          </label>
          <p className="text-[11px] text-ink/50">
            The email above is only displayed on the public Contact page. To change where
            form submissions are sent, update <code>FORMSUBMIT_EMAIL</code> in your environment settings.
          </p>
        </section>

        <section className="border border-ink/10 p-6 md:p-8 space-y-5 bg-bone/20">
          <h2 className="font-display text-lg text-ink">Map</h2>
          <label className="block">
            <span className="eyebrow">Google Maps embed URL</span>
            <textarea
              name="shop.map_url"
              defaultValue={c['shop.map_url']}
              rows={3}
              className="input mt-1 resize-none font-mono text-xs"
            />
            <span className="mt-1 block text-[11px] text-ink/50">
              On Google Maps: Share → Embed a map → copy ONLY the URL inside <code>src="..."</code>.
              Don't paste the whole <code>&lt;iframe&gt;</code> tag.
            </span>
          </label>
        </section>

        <section className="border border-ink/10 p-6 md:p-8 space-y-5 bg-bone/20">
          <h2 className="font-display text-lg text-ink">Storefront image</h2>
          <p className="text-xs text-ink/60">Used on the home page "Visit" card and the contact page.</p>
          <ImageField
            label="Storefront photo"
            name="shop.storefront_image_url"
            value={c['shop.storefront_image_url']}
          />
        </section>

        <div className="pt-2">
          <button type="submit" className="btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  );
}
