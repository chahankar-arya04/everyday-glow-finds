import Link from "next/link";
import { getProducts } from "@/lib/sanity";
import ProductCard from "@/components/ui/ProductCard";

export const metadata = {
  title: "Everyday Glow Finds – Natural Beauty & Wellness Discoveries",
  description: "Discover curated natural beauty, hair care, wellness routines, and thoughtful everyday lifestyle picks.",
};

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Editorial Hero Banner */}
      <section className="text-center max-w-3xl mx-auto mb-14">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full mb-4">
          Pinterest-Curated Lifestyle & Wellness
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
          Thoughtful Finds for Natural Daily Routines
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
          Explore genuine, low-ingredient formulations, simple hair-care essentials, and mindful everyday products discovered for real daily living.
        </p>
      </section>

      {/* Featured Collection Section */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-1">
              Curated Hair-Care Routine
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Simple Hair-Care Picks on a Budget
            </h2>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <p className="text-xs sm:text-sm text-stone-500">
              Factual, low-fuss selections for your routine
            </p>
            <Link href="/products" className="text-xs font-semibold text-emerald-800 hover:underline">
              View All →
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Footer affiliate disclosure note */}
        <div className="mt-12 p-4 bg-stone-50 rounded-2xl border border-stone-200/70 text-center text-xs text-stone-500 max-w-2xl mx-auto">
          <p>
            <strong>Editorial Disclosure:</strong> We recommend items based on ingredient simplicity and factual utility. Links to retailer product pages allow you to verify current pricing, customer ratings, and merchant availability directly.
          </p>
        </div>
      </section>
    </div>
  );
}
