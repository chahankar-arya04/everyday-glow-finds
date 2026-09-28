/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Sanity config – will be populated from environment variables after auth.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-01-01'; // use a UTC date string

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // If no projectId is set (local mock mode), the client will be a no‑op.
});

export const urlFor = (source: any) => {
  if (!projectId) return '';
  const builder = imageUrlBuilder(sanityClient);
  return builder.image(source).url();
};

/** Helper: fetch JSON mock data when Sanity vars are missing */
export async function fetchMock<T>(path: string): Promise<T[]> {
  if (projectId) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/mock-data/${path}`);
  if (!res.ok) return [];
  const data: T[] = await res.json();
  return data;
}

export async function getProducts() {
  if (projectId) {
    const query = `*[_type == "product" && !(_id in path("drafts."*))] | order(_createdAt desc)`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await sanityClient.fetch<any[]>(query);
    return result;
  }
  // fallback to mock data
  return fetchMock<any>('products.json');
}

export async function getProductBySlug(slug: string) {
  if (projectId) {
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    return sanityClient.fetch<any>(query, { slug });
  }
  const all = await fetchMock<any>('products.json');
  return all.find(p => p.slug === slug) ?? null;
}

export async function getArticles() {
  if (projectId) {
    const query = `*[_type == "article" && !(_id in path("drafts."*))] | order(_createdAt desc)`;
    return sanityClient.fetch<any[]>(query);
  }
  return fetchMock<any>('articles.json');
}

export async function getArticleBySlug(slug: string) {
  if (projectId) {
    const query = `*[_type == "article" && slug.current == $slug][0]`;
    return sanityClient.fetch<any>(query, { slug });
  }
  const all = await fetchMock<any>('articles.json');
  return all.find(a => a.slug === slug) ?? null;
}

