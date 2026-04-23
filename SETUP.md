# Stitch of Hope — Setup Guide

This site uses **Supabase** (free tier) as its database, auth-less image storage, and source of content for the `/admin` CMS. Follow the steps below once and you're done.

---

## 1 · Create a Supabase project (free)

1. Go to [supabase.com](https://supabase.com) and sign up (GitHub login is easiest).
2. Click **New project**.
   - Name: `stitch-of-hope`
   - Database password: generate a strong one and save it somewhere safe.
   - Region: **eu-west-3** (Paris) or **af-south-1** (Cape Town) — whichever is closest.
3. Wait ~2 minutes while it provisions.

## 2 · Run the schema & seed

1. In your new Supabase project, open the left sidebar → **SQL Editor** → **+ New query**.
2. Open [`supabase/schema.sql`](supabase/schema.sql) in this project. Copy the entire file.
3. Paste it into the Supabase SQL editor and click **Run**.
4. You should see `Success. No rows returned` — this creates the tables, seeds 10 products, and creates the image storage bucket.

## 3 · Grab your credentials

In Supabase: sidebar → **Project Settings** → **API**. You need two values:

- **Project URL** (looks like `https://abcdefgh.supabase.co`)
- **service_role** key under "Project API keys" — click the eye icon to reveal, then copy

> ⚠️ The `service_role` key bypasses all security. Keep it server-side only (it goes in `.env.local`, never in client code, never in git).

## 4 · Create `.env.local`

In the project root, copy `.env.example` to a new file called `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

```ini
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<paste the service_role key from step 3>

ADMIN_PASSWORD=<pick a strong password — this is how you sign into /admin>

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=<paste the generated 64-character hex string>

FORMSUBMIT_EMAIL=Dalton.hardage@yahoo.com
```

Generate `SESSION_SECRET` by running this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 5 · Install & run

```bash
npm install
npm run dev
```

- Public site → [http://localhost:3000](http://localhost:3000)
- Admin login → [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Sign in with the `ADMIN_PASSWORD` you set.

## 6 · First-time admin walkthrough

Once signed in:

1. **Home content** → edit the eyebrow, headings, story paragraphs, stats. Save. Refresh the home page in another tab.
2. **Shop info** → update address, hours, WhatsApp number, Instagram URL, Google Maps embed. Upload the storefront photo.
3. **Products** → view the 10 seeded products. Click **Edit** on any to update photos, blurb, details, category. Click **+ New product** to add one.
4. **Messages** → empty for now. Once the site is live and someone submits a form, their message appears here and an email copy goes to `FORMSUBMIT_EMAIL`.

---

## 7 · Activating email notifications (one-time)

The form emails go through [FormSubmit.co](https://formsubmit.co) — zero setup, free. When the first submission comes in from the deployed site, FormSubmit sends a one-time confirmation email to `FORMSUBMIT_EMAIL`. Click the activation link inside. After that, all submissions arrive automatically.

---

## 8 · Deploying to Vercel

When you're ready for the world:

1. Push this project to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. In the Vercel project's **Settings → Environment Variables**, add all five from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `FORMSUBMIT_EMAIL`
4. Click **Deploy**. Vercel gives you a temporary URL like `stitch-of-hope.vercel.app`.
5. When you have a custom domain, add it under **Settings → Domains** — Vercel issues a free SSL certificate automatically.

---

## 9 · Troubleshooting

**"Supabase env missing" error**
→ `.env.local` isn't loaded. Restart `npm run dev` after editing it.

**"Unauthorized" when saving in admin**
→ Your session expired. Sign in again at `/admin/login`.

**Images show broken on the public site after upload**
→ Confirm the `site-images` Supabase Storage bucket is marked **Public**. The schema SQL does this, but you can verify in Supabase → Storage → site-images → gear icon → "Make public".

**Map shows "page can't be loaded in a frame"**
→ You probably pasted the whole `<iframe>` tag instead of only the URL. In admin → Shop info, paste just the URL between `src="..."` from Google's embed snippet.

**Site still shows old content after an admin save**
→ Public pages cache for 60 seconds and revalidate on admin save. Hard-refresh (Ctrl/Cmd+Shift+R) if impatient.
