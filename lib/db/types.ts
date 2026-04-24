export type Category = 'Apparel' | 'Bags' | 'Home' | 'For Pets' | 'Toys';
export const CATEGORIES: Category[] = ['Apparel', 'Bags', 'Home', 'For Pets', 'Toys'];

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  blurb: string;
  details: string;
  images: string[];
  sort_order: number;
  archived: boolean;
  featured: boolean;
  /** Convenience — first image for the card */
  image: string;
};

export type Stat = { k: string; v: string };
export type Faq = { q: string; a: string };
export type Testimonial = { quote: string; name: string; location: string };
export type InstagramPost = { image_url: string; caption: string; link_url: string };

export type SiteContent = {
  'hero.eyebrow': string;
  'hero.heading_line1': string;
  'hero.heading_line2': string;
  'hero.subheading': string;
  'hero.image_url': string;
  'story.eyebrow': string;
  'story.heading': string;
  'story.paragraph_1': string;
  'story.paragraph_2': string;
  'story.paragraph_3': string;
  'story.image_url': string;
  stats: Stat[];
  testimonials: Testimonial[];
  faqs: Faq[];
  instagram_posts: InstagramPost[];
  'visit_cta.heading': string;
  'shop.address_line1': string;
  'shop.address_line2': string;
  'shop.landmark': string;
  'shop.hours': string;
  'shop.email': string;
  'shop.whatsapp': string;
  'shop.instagram_url': string;
  'shop.map_url': string;
  'shop.storefront_image_url': string;
};

export type ContentKey = keyof SiteContent;

export type Submission = {
  id: string;
  kind: 'contact' | 'product_request';
  product_name: string | null;
  name: string;
  email: string;
  phone: string | null;
  payload: Record<string, unknown>;
  read_at: string | null;
  received_at: string;
};
