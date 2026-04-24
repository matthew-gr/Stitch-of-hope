-- Stitch of Hope — Supabase schema & seed
-- Run this in Supabase → SQL Editor (one-click). Safe to re-run (idempotent).

-- ============ TABLES ============

create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  blurb text not null default '',
  details text not null default '',
  images text[] not null default '{}',
  sort_order int not null default 0,
  archived boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_sort_idx on products (archived, sort_order, created_at);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','product_request')),
  product_name text,
  name text not null,
  email text not null,
  phone text,
  payload jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  received_at timestamptz not null default now()
);

create index if not exists submissions_received_idx on submissions (received_at desc);
create index if not exists submissions_unread_idx on submissions (read_at) where read_at is null;

-- ============ STORAGE BUCKET ============

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- Allow public read of images from the bucket
drop policy if exists "Public read site-images" on storage.objects;
create policy "Public read site-images"
  on storage.objects for select
  using (bucket_id = 'site-images');

-- ============ SEED SITE CONTENT ============

insert into site_content (key, value) values
  ('hero.eyebrow', to_jsonb('Muraho — welcome'::text)),
  ('hero.heading_line1', to_jsonb('Made by hand.'::text)),
  ('hero.heading_line2', to_jsonb('Made with purpose.'::text)),
  ('hero.subheading', to_jsonb('Premium apparel, bags, and home goods — crafted in Kigali by women shaping their own futures.'::text)),
  ('hero.image_url', to_jsonb('/images/Store Front.jpeg'::text)),

  ('story.eyebrow', to_jsonb('Our Story'::text)),
  ('story.heading', to_jsonb('A workshop in Biryogo, a mission in every stitch.'::text)),
  ('story.paragraph_1', to_jsonb('Alicia and Dalton Hardage moved to Kigali two years ago with a simple idea: train talented women in the craft of sewing, and build a place where that craft could pay a living wage.'::text)),
  ('story.paragraph_2', to_jsonb('Today, Stitch of Hope is that place. A small workshop in Biryogo, just across from the Nyamirambo Women''s Center, where each bag, pillow, and jacket is cut, sewn, and finished by hand — by women who are rewriting their own stories.'::text)),
  ('story.paragraph_3', to_jsonb('Every piece we make is built to last. Every purchase becomes part of someone''s new beginning.'::text)),
  ('story.image_url', to_jsonb('/images/Store Front.jpeg'::text)),

  ('stats', '[{"k":"[X]","v":"Women employed"},{"k":"[X]","v":"Pieces handcrafted"},{"k":"2 yrs","v":"Sewing stories in Kigali"}]'::jsonb),

  ('testimonials', '[
    {"quote":"Beautiful craftsmanship. Every piece tells a story.","name":"[Placeholder]","location":"Kigali"},
    {"quote":"I''ve bought three bags and they all get compliments every single time.","name":"[Placeholder]","location":"London"},
    {"quote":"Supporting an incredible mission, and the quality is genuinely top-notch.","name":"[Placeholder]","location":"Nairobi"}
  ]'::jsonb),

  ('faqs', '[
    {"q":"Do you ship internationally?","a":"Yes — we ship worldwide from our Kigali workshop. Rates and timing depend on your destination; we share a quote with every request so there are no surprises."},
    {"q":"Can I request custom sizes or colours?","a":"Absolutely. Note your preference in the request form for any product and we''ll tailor it to you."},
    {"q":"Do you offer wholesale or bulk orders?","a":"Yes. For hotels, NGOs, conferences, and gifting programs, please use the Wholesale option on our contact form — we''ll respond within 48 hours."},
    {"q":"How long does a piece take to make?","a":"Each piece is sewn by hand in our workshop. Most items ship within 1–2 weeks of order confirmation; intricate pieces or larger batches take a little longer."},
    {"q":"Can I visit the workshop?","a":"We''d love that. Our shop at KN 7 Ave, Biryogo is open every day from 9am to 6pm. Drop in — we''ll pour you a coffee."}
  ]'::jsonb),

  ('instagram_posts', '[]'::jsonb),

  ('visit_cta.heading', to_jsonb('Come say muraho in Biryogo.'::text)),

  ('shop.address_line1', to_jsonb('KN 7 Ave, Biryogo'::text)),
  ('shop.address_line2', to_jsonb('Kigali, Rwanda'::text)),
  ('shop.landmark', to_jsonb('Across from the Nyamirambo Women''s Center'::text)),
  ('shop.hours', to_jsonb('Monday — Sunday · 9:00 – 18:00'::text)),
  ('shop.email', to_jsonb('Dalton.hardage@yahoo.com'::text)),
  ('shop.whatsapp', to_jsonb(''::text)),
  ('shop.instagram_url', to_jsonb('https://www.instagram.com/stitch_of_hope_rw/'::text)),
  ('shop.map_url', to_jsonb('https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249.21703876941203!2d30.062424341061387!3d-1.964801074529436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2srw!4v1776943117964!5m2!1sen!2srw'::text)),
  ('shop.storefront_image_url', to_jsonb('/images/Store Front.jpeg'::text))
on conflict (key) do nothing;

-- ============ SEED PRODUCTS ============

insert into products (slug, name, category, blurb, details, images, sort_order, featured) values
  ('golden-african-jacket', 'Golden African Jacket', 'Apparel',
   'A statement jacket cut from rich golden fabric — tailored in Kigali to drape beautifully through every season.',
   'Hand-finished seams, lightweight lining, and a silhouette designed to move from the market to an evening out. Please note preferred size and fit in your request.',
   array['/images/Golden African Jacket.PNG'], 10, true),
  ('short-sleeved-cardigan', 'Short-Sleeved Cardigan', 'Apparel',
   'An everyday essential in a seasonless weight. Available in multiple colourways — classic, warm red, and black with pink trim.',
   'Open front, short sleeves, finished collar. Let us know your preferred colour and size in your request.',
   array['/images/Short sleeved cardigan.PNG','/images/Short sleeved cardigan (red).PNG','/images/Short sleeved cardigan (Black Pink).PNG'], 20, false),
  ('bag-elephant', 'Elephant Tote', 'Bags',
   'A roomy tote featuring our signature elephant silhouette — a quiet nod to East Africa, stitched by hand.',
   'Reinforced straps, inner pocket, sized for daily essentials or a weekend market haul.',
   array['/images/Bag (Elephant).PNG'], 30, true),
  ('bag-africa-outline', 'Africa Outline Tote', 'Bags',
   'A clean, graphic tote featuring the outline of the continent — a minimal tribute to home.',
   'Durable canvas body with contrast stitching. Carries a laptop, a notebook, and then some.',
   array['/images/Bag (Africa Outline).PNG'], 40, false),
  ('bag-lady-silhouette', 'Lady Silhouette Tote', 'Bags',
   'A celebration of the women who made it — silhouetted in thread, carried in confidence.',
   'Structured body, comfortable straps, ideal as a gift that tells a story.',
   array['/images/Bag (Lady Shillouette).PNG'], 50, false),
  ('handmade-pouch', 'Handmade Pouch', 'Bags',
   'A versatile zipped pouch — for cosmetics, cables, or carrying small treasures home.',
   'Fully lined, metal zip, a palm-sized reminder that small things can be beautifully made.',
   array['/images/Handmade Pouch (Ad).PNG'], 60, false),
  ('artisan-pillow', 'Artisan Pillow', 'Home',
   'A handmade accent pillow to bring warmth, texture, and story into your living space.',
   'Removable cover, hidden zip, standard insert sizing. Please specify preferred print in your request.',
   array['/images/Artisan Pillow (Ad).PNG'], 70, true),
  ('cat-bed', 'The Cat Bed', 'For Pets',
   'Because your cat deserves artisan-made too. A plush, structured bed sewn to last nap after nap.',
   'Removable, washable cover. Cat not included.',
   array['/images/Cat in Cat Bed (Top).PNG','/images/Cat in Cat Bed (Side).PNG'], 80, false),
  ('crinkle-toy-elephant', 'Crinkle Toy — Elephant', 'Toys',
   'A soft crinkle toy for little hands — bright colours, gentle fabrics, and the sweetest elephant.',
   'Made from child-safe materials. A thoughtful gift for new parents.',
   array['/images/Crinkle Toy (Elephant).PNG'], 90, false),
  ('crinkle-toy-giraffe', 'Crinkle Toy — Giraffe', 'Toys',
   'Meet the giraffe of the set — cheerful, crinkly, and ready for play.',
   'Made from child-safe materials. Pairs beautifully with the elephant.',
   array['/images/Crinkle Toy (Giraff).PNG'], 100, true)
on conflict (slug) do nothing;
