import { getProducts } from '@/lib/sanity';
import ProductCard from '@/components/ui/ProductCard';

export const metadata = {
  title: 'All Curated Products – Everyday Glow Finds',
  description: 'Browse natural beauty, hair care, and wellness products curated from Pinterest.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
          All Curated Products
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Discover verified hair care, skincare, and natural wellness finds.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-stone-500">
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
