import Link from "next/link";

import { getProducts } from "@/lib/sanity";
import ProductCard from "@/components/ui/ProductCard";

export const metadata = {
  title: "Everyday Glow Finds – Home",
  description: "Discover natural beauty, wellness and lifestyle products curated from Pinterest.",
};

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 4);
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/products" className="text-brand-green hover:underline">
            View All Products →
          </Link>
        </div>
      </section>
    </div>
  );
}
