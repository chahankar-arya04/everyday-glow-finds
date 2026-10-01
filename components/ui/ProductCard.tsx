import Link from 'next/link';
import Image from 'next/image';
import { Product, getDestinationUrl, getSlugString, getCategoryTitle } from '@/lib/sanity';

export default function ProductCard({ product }: { product: Product }) {
  const destinationUrl = getDestinationUrl(product);
  const slug = getSlugString(product.slug);
  const categoryTitle = getCategoryTitle(product.category);

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image Link */}
      <Link href={`/products/${slug}`} className="relative block aspect-square bg-[#FDFBF7] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
            No image
          </div>
        )}
        {product.subcategory && (
          <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-sm text-white text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full">
            {product.subcategory}
          </span>
        )}
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-1.5">
          <span>{product.brand || 'Featured Pick'}</span>
          {product.size && (
            <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium normal-case">
              {product.size}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-stone-900 line-clamp-2 mb-2 group-hover:text-emerald-800 transition-colors">
          <Link href={`/products/${slug}`}>
            {product.title}
          </Link>
        </h3>

        {product.description && (
          <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed flex-1">
            {product.description}
          </p>
        )}

        <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5 mt-auto">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Category: {categoryTitle}</span>
            <Link href={`/products/${slug}`} className="text-stone-700 hover:text-emerald-800 font-medium underline underline-offset-2">
              Details →
            </Link>
          </div>

          <a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs py-2.5 px-4 rounded-xl shadow-sm transition-colors duration-200"
          >
            Check Price & Reviews
          </a>
        </div>
      </div>
    </article>
  );
}
