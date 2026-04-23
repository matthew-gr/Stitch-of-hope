# Stitch of Hope — Website

Premium marketing site for Stitch of Hope, a Kigali-based artisan sewing shop. Includes a built-in CMS at `/admin`.

## Stack
- **Next.js 14** (app router, TypeScript)
- **Supabase** — Postgres database + image storage (free tier)
- **Tailwind CSS** for styling
- **Fraunces** (display) + **Inter** (sans) via `next/font`
- **iron-session** — encrypted cookie sessions for admin auth
- **FormSubmit.co** — email notifications (complements DB inbox)

## First-time setup

👉 **Full step-by-step guide: [SETUP.md](SETUP.md)**

Quick version:
1. Create a Supabase project, run `supabase/schema.sql` in its SQL editor.
2. Copy `.env.example` → `.env.local`, fill in the Supabase + admin values.
3. `npm install && npm run dev`.
4. Public site → http://localhost:3000 · Admin → http://localhost:3000/admin/login.

## What the CMS lets you do

All content is editable at `/admin` — no code deploys required.

- **Home content** — headings, story paragraphs, stats, hero + story images
- **Shop info** — address, hours, contact email, WhatsApp, Instagram URL, Google Maps embed, storefront photo
- **Products** — add / edit / archive / delete, upload images, reorder, feature on home
- **Messages** — inbox of all form submissions (contact + product requests), mark read/unread, reply via email

Edits appear on the public site within ~60 seconds (or instantly after you save — changes trigger a revalidation).

## Google Maps — how to update the pin

Admin → Shop info → Google Maps embed URL.

1. Open [Google Maps](https://www.google.com/maps), find your shop pin.
2. Click **Share** → **Embed a map** → **Copy HTML**. Google gives you a snippet like:
   ```html
   <iframe src="https://www.google.com/maps/embed?pb=!1m14!..." ...></iframe>
   ```
3. **Copy ONLY the URL** between the first pair of quotes — the part starting with `https://`. Do NOT paste the whole `<iframe>` tag.
4. Paste that URL into the "Google Maps embed URL" field in admin and save.

## Deploying to Vercel

See [SETUP.md § 8](SETUP.md#8--deploying-to-vercel).

---

<details>
<summary>Legacy: editing content directly in code (before CMS was added)</summary>

These files are no longer the source of truth — the admin panel is. Kept here for reference.

- **Map defaults:** `lib/db/content.ts` — to update the pin without a CMS edit:
  1. Open [Google Maps](https://www.google.com/maps), search for your exact shop location, and drop/find the pin.
  2. Click **Share** → **Embed a map** → choose size → **Copy HTML**. Google gives you a full snippet like:
     ```html
     <iframe src="https://www.google.com/maps/embed?pb=!1m14!..." width="600" height="450" ...></iframe>
     ```
  3. **Copy ONLY the URL** between the first pair of quotes (the part starting with `https://...`). Do NOT paste the whole `<iframe>` tag.
  4. Paste that URL into the `src="..."` of the existing `<iframe>` in `app/contact/page.tsx` — replace the value, keep the quotes.
  5. (Optional) If the shop isn't yet on Google Maps, add it first via [Google Business Profile](https://business.google.com/), then embed once the listing is live.
- **Colors / fonts:** `tailwind.config.ts` + `app/globals.css`.

## Deploying

Recommended: push to a GitHub repo, then import into [Vercel](https://vercel.com/new) — zero-config. Custom domain can be attached in Vercel's project settings.

</details>

## File map

```
app/
  layout.tsx                         Root layout — html/body + fonts only
  globals.css                        Global styles + Tailwind + texture overlays
  icon.jpg                           Favicon (logo)
  (public)/
    layout.tsx                       Public shell — Header, Footer (DB-driven contact info)
    page.tsx                         Home — DB-driven
    products/page.tsx                Products listing — DB-driven
    contact/page.tsx                 Contact + map — DB-driven
  api/
    submit/route.ts                  Public form endpoint — writes to DB + fires email
    admin/
      login/route.ts                 Admin password login
      logout/route.ts                Admin logout
      upload/route.ts                Protected image upload → Supabase Storage
  admin/
    login/page.tsx                   Admin login screen
    (authed)/
      layout.tsx                     Session gate + admin shell
      page.tsx                       Dashboard
      content/                       Home page editor
      products/                      Product manager (list + new + edit)
      location/                      Shop info editor (address, hours, map)
      messages/                      Form submission inbox
components/
  Header.tsx                         Sticky site header
  Footer.tsx                         Footer
  Icons.tsx                          Instagram SVG
  Ornament.tsx                       Decorative hairline divider
  ProductGrid.tsx                    Filterable, "See more" product grid (client)
  ProductRequestModal.tsx            Per-product request form modal
  ContactForm.tsx                    General contact form with wholesale dropdown
  Reveal.tsx                         Scroll-reveal animation helper
  admin/
    AdminShell.tsx                   Sidebar / topbar + nav + logout
    ImageField.tsx                   Single-image uploader with preview
    ProductForm.tsx                  Shared create/edit product form
lib/
  supabase.ts                        Supabase admin client
  session.ts                         iron-session config
  db/
    types.ts                         Shared types (Product, SiteContent, Submission)
    content.ts                       Site content get/update
    products.ts                      Product CRUD
    submissions.ts                   Submissions CRUD + unread count
supabase/
  schema.sql                         Tables, seeds, storage bucket — run once
public/
  images/                            Seeded product & shop photography
```
