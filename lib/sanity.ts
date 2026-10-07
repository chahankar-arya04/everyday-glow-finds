import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import fs from 'fs';
import path from 'path';

export type Product = {
  _id: string;
  title: string;
  slug: string | { current: string };
  brand?: string;
  size?: string;
  asin?: string;
  category?: string | { title: string };
  subcategory?: string;
  description?: string;
  detailedDescription?: string;
  keyInfo?: string[];
  imageUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  price?: number;
  merchantProductUrl?: string;
  affiliateUrl?: string;
  affiliateLink?: string;
  tags?: string[];
  demo?: boolean;
};

export type Article = {
  _id: string;
  title: string;
  slug: string | { current: string };
  description?: string;
  content?: string;
  imageUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  publishedAt?: string;
  category?: string | { title: string };
  tags?: string[];
  demo?: boolean;
};

export const CATEGORIES = [
  { name: 'All', slug: 'all' },
  { name: 'Hair Care', slug: 'hair-care' },
  { name: 'Skin Care', slug: 'skin-care' },
  { name: 'Wellness', slug: 'wellness' },
  { name: 'Style', slug: 'style' },
  { name: 'Useful Finds', slug: 'useful-finds' },
] as const;

export type CategorySlug = typeof CATEGORIES[number]['slug'];

// Sanity config
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ueb7w6y5';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => {
  if (!source || !projectId) return '';
  try {
    const builder = imageUrlBuilder(sanityClient);
    return builder.image(source).url();
  } catch {
    return '';
  }
};

/** Helper: fetch JSON mock data directly from filesystem or fetch fallback */
export async function fetchMock<T>(fileName: string): Promise<T[]> {
  try {
    const localPath = path.join(process.cwd(), 'mock-data', fileName);
    if (fs.existsSync(localPath)) {
      const fileData = fs.readFileSync(localPath, 'utf8');
      return JSON.parse(fileData) as T[];
    }
  } catch {
    // Fall back to HTTP fetch
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const res = await fetch(`${baseUrl}/mock-data/${fileName}`);
    if (res.ok) {
      return (await res.json()) as T[];
    }
  } catch {
    // Ignore fetch error
  }
  return [];
}

/** Helper to extract string slug */
export function getSlugString(slug: string | { current: string } | undefined): string {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  return slug.current || '';
}

/** Helper to get normalized category string */
export function getCategoryTitle(category: string | { title: string } | undefined): string {
  if (!category) return 'General';
  if (typeof category === 'string') return category;
  return category.title || 'General';
}

/** Helper to get category slug */
export function getCategorySlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Helper to resolve destination CTA url: affiliateUrl if present, else fallback to merchantProductUrl or affiliateLink */
export function getDestinationUrl(product: Product): string {
  if (product.affiliateUrl && product.affiliateUrl.trim().length > 0) {
    return product.affiliateUrl.trim();
  }
  if (product.merchantProductUrl && product.merchantProductUrl.trim().length > 0) {
    return product.merchantProductUrl.trim();
  }
  return product.affiliateLink || '#';
}

export async function getProducts(): Promise<Product[]> {
  // Fetch from Sanity CMS
  let sanityProducts: Product[] = [];
  try {
    if (projectId) {
      const query = `*[_type == "product" && !(_id in path("drafts.*"))] | order(_createdAt desc)`;
      const result = await sanityClient.fetch<Product[]>(query);
      if (Array.isArray(result) && result.length > 0) {
        sanityProducts = result.map((p) => ({
          ...p,
          slug: getSlugString(p.slug),
          imageUrl: p.imageUrl || (p.image ? urlFor(p.image) : '/images/products/wishcare-serum-20ml.svg'),
        }));
      }
    }
  } catch {
    // Graceful fallback
  }

  // Always load mock products and merge with Sanity products.
  // Mock products whose slug already exists in Sanity are skipped (Sanity is authoritative).
  const mockProducts = await fetchMock<Product>('products.json');
  const normalizedMock = mockProducts.map((p) => ({
    ...p,
    slug: getSlugString(p.slug),
  }));

  const sanitySlugSet = new Set(sanityProducts.map((p) => getSlugString(p.slug)));
  const extraMockProducts = normalizedMock.filter(
    (p) => !sanitySlugSet.has(getSlugString(p.slug))
  );

  return [...sanityProducts, ...extraMockProducts];
}

export async function getProductsByCategory(categorySlug?: string): Promise<Product[]> {
  const allProducts = await getProducts();
  if (!categorySlug || categorySlug === 'all') {
    return allProducts;
  }
  const normalizedQuery = categorySlug.toLowerCase().trim();
  return allProducts.filter((product) => {
    const catTitle = getCategoryTitle(product.category);
    const catSlug = getCategorySlug(catTitle);
    return catSlug === normalizedQuery || catSlug.includes(normalizedQuery) || normalizedQuery.includes(catSlug);
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (projectId) {
      const query = `*[_type == "product" && (slug.current == $slug || slug == $slug)][0]`;
      const result = await sanityClient.fetch<Product>(query, { slug });
      if (result) {
        return {
          ...result,
          slug: getSlugString(result.slug),
          imageUrl: result.imageUrl || (result.image ? urlFor(result.image) : '/images/products/wishcare-serum-20ml.svg'),
        };
      }
    }
  } catch {
    // Graceful fallback
  }
  const all = await getProducts();
  return all.find((p) => getSlugString(p.slug) === slug) ?? null;
}

export async function getArticles(): Promise<Article[]> {
  try {
    if (projectId) {
      const query = `*[_type == "article" && !(_id in path("drafts.*"))] | order(_createdAt desc)`;
      const result = await sanityClient.fetch<Article[]>(query);
      if (Array.isArray(result) && result.length > 0) {
        return result.map((a) => ({
          ...a,
          slug: getSlugString(a.slug),
          imageUrl: a.imageUrl || (a.image ? urlFor(a.image) : ''),
        }));
      }
    }
  } catch {
    // Fallback
  }
  return fetchMock<Article>('articles.json');
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    if (projectId) {
      const query = `*[_type == "article" && (slug.current == $slug || slug == $slug)][0]`;
      const result = await sanityClient.fetch<Article>(query, { slug });
      if (result) {
        return {
          ...result,
          slug: getSlugString(result.slug),
          imageUrl: result.imageUrl || (result.image ? urlFor(result.image) : ''),
        };
      }
    }
  } catch {
    // Fallback
  }
  const all = await getArticles();
  return all.find((a) => getSlugString(a.slug) === slug) ?? null;
}
