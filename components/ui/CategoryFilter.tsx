import Link from 'next/link';
import { CATEGORIES } from '@/lib/sanity';

interface CategoryFilterProps {
  activeCategory?: string;
  basePath?: string;
}

export default function CategoryFilter({
  activeCategory = 'all',
  basePath = '/products',
}: CategoryFilterProps) {
  const currentSlug = activeCategory.toLowerCase().trim() || 'all';

  return (
    <div className="w-full overflow-x-auto pb-3 mb-8 no-scrollbar">
      <nav className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max px-2" aria-label="Product Categories">
        {CATEGORIES.map((category) => {
          const isActive = currentSlug === category.slug;
          const href = category.slug === 'all' 
            ? basePath 
            : `${basePath}?category=${category.slug}`;

          return (
            <Link
              key={category.slug}
              href={href}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-800/20'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
