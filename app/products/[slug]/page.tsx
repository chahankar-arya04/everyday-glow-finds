import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, getDestinationUrl, getSlugString, getCategoryTitle } from '@/lib/sanity';
import ProductCard from '@/components/ui/ProductCard';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found – Everyday Glow Finds' };
  
  const title = `${product.title}${product.brand ? ` by ${product.brand}` : ''} | Everyday Glow Finds`;
  const description = product.description || 'Explore curated natural beauty and hair-care discovery recommendations.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const destinationUrl = getDestinationUrl(product);
  const categoryTitle = getCategoryTitle(product.category);

  // Related products from collection
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => getSlugString(p.slug) !== params.slug)
    .slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-stone-900 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-stone-800 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Product Visual Container */}
        <div className="lg:col-span-6 bg-[#FDFBF7] rounded-3xl p-6 md:p-8 border border-stone-200/70 shadow-sm">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/60">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                Product Image
              </div>
            )}
          </div>
        </div>

        {/* Product Content Details */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {product.brand && (
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3 py-1 rounded-full">
                {product.brand}
              </span>
            )}
            {product.subcategory && (
              <span className="text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                {product.subcategory}
              </span>
            )}
            {product.size && (
              <span className="text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                Size: {product.size}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-4">
            {product.title}
          </h1>

          {product.description && (
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Primary CTA Box */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 mb-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Available On Merchant
                </span>
                <span className="text-sm font-medium text-stone-800">
                  Live Pricing & Stock on Amazon
                </span>
              </div>
              <a
                href={destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-colors duration-200 text-center"
              >
                Check Price & Reviews →
              </a>
            </div>
          </div>

          {/* Key Product Highlights */}
          {product.keyInfo && product.keyInfo.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-3">
                Key Product Highlights
              </h2>
              <ul className="space-y-2.5">
                {product.keyInfo.map((info, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-stone-700">
                    <span className="text-emerald-700 mr-2.5 font-bold">✓</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Editorial Description */}
          {product.detailedDescription && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
                Overview & Context
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.detailedDescription}
              </p>
            </div>
          )}

          {/* Product Metadata Specs */}
          <div className="border-t border-stone-200 pt-4 mb-6">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-stone-600">
              {product.category && (
                <div>
                  <dt className="text-stone-400">Category</dt>
                  <dd className="font-medium text-stone-800">{categoryTitle}</dd>
                </div>
              )}
              {product.asin && (
                <div>
                  <dt className="text-stone-400">ASIN Identifier</dt>
                  <dd className="font-mono text-stone-700">{product.asin}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Affiliate Disclosure */}
          <div className="bg-stone-100/70 border border-stone-200/60 rounded-xl p-3.5 text-[11px] text-stone-500 leading-relaxed">
            <p>
              <strong className="font-semibold text-stone-600">Disclosure:</strong> Some links on this page may be affiliate links. If you purchase through a qualifying link, we may earn a commission at no additional cost to you. Product pricing, availability, and merchant specifications are managed directly on the retailer website.
            </p>
          </div>
        </div>
      </div>

      {/* Related / Collection Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-stone-200 pt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                More Thoughtful Everyday Picks
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Explore more curated skincare, hair-care, and lifestyle recommendations.
              </p>
            </div>
            <Link href="/products" className="text-xs font-semibold text-emerald-800 hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct._id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
