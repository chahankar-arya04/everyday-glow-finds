import { getProductsByCategory, CATEGORIES } from '@/lib/sanity';
import ProductCard from '@/components/ui/ProductCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import Link from 'next/link';

export const metadata = {
  title: 'All Curated Products – Everyday Glow Finds',
  description: 'Browse natural hair care, skincare, wellness, and lifestyle products curated for real daily living.',
};

interface ProductsPageProps {
  searchParams?: {
    category?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const currentCategorySlug = searchParams?.category || 'all';
  const products = await getProductsByCategory(currentCategorySlug);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === currentCategorySlug);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Curated Discovery Catalogue
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
          {currentCategorySlug === 'all' ? 'All Curated Products' : `${activeCategoryName} Discoveries`}
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Discover verified hair care, skincare, and natural wellness finds selected for quality and simplicity.
        </p>
      </div>

      {/* Category Navigation Pills */}
      <CategoryFilter activeCategory={currentCategorySlug} basePath="/products" />

      {/* Products Grid or Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-200/80 max-w-xl mx-auto shadow-sm my-8">
          <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
            ✨
          </div>
          <h2 className="text-lg font-bold text-stone-900 mb-2">
            No products in {activeCategoryName} yet
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
            We only list real, verified finds. We are actively curating new recommendations for this category.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Bottom Disclosure */}
      <div className="mt-16 p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200/70 text-center text-xs text-stone-500 max-w-2xl mx-auto">
        <p>
          <strong>Disclosure:</strong> Some links on this page may be affiliate links. If you purchase through a qualifying link, we may earn a commission at no additional cost to you.
        </p>
      </div>
    </div>
  );
}
