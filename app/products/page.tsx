/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import { getProducts } from '@/lib/sanity';
import ProductCard from '@/components/ui/ProductCard';

export const metadata = {
  title: 'Products – Everyday Glow Finds',
  description: 'Browse natural beauty and wellness products curated from Pinterest.',
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

