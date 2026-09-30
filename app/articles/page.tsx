import Link from 'next/link';
import { getArticles, getSlugString } from '@/lib/sanity';
import Image from 'next/image';

export const metadata = {
  title: 'Articles & Guides – Everyday Glow Finds',
  description: 'Read natural beauty, hair care, wellness routines, and thoughtful lifestyle discovery guides.',
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
          Wellness & Beauty Guides
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Curated lifestyle tips, routine ideas, and natural ingredient breakdowns.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-stone-500">
          <p>No articles published yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => {
            const slug = getSlugString(a.slug);
            return (
              <article key={a._id} className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                {a.imageUrl && (
                  <Link href={`/articles/${slug}`} className="relative aspect-video block overflow-hidden bg-stone-100">
                    <Image
                      src={a.imageUrl}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 mb-2 hover:text-emerald-800 transition-colors">
                      <Link href={`/articles/${slug}`}>
                        {a.title}
                      </Link>
                    </h2>
                    {a.description && (
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 mb-4 leading-relaxed">
                        {a.description}
                      </p>
                    )}
                  </div>
                  <Link href={`/articles/${slug}`} className="text-xs font-semibold text-emerald-800 hover:underline">
                    Read Guide →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
