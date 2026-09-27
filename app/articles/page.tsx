import Link from 'next/link';
import { getArticles } from '@/lib/sanity';
import Image from 'next/image';

export const metadata = {
  title: 'Articles – Everyday Glow Finds',
  description: 'Read natural beauty, wellness and lifestyle articles curated from Pinterest.',
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <article key={a._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
              <Link href={`/articles/${a.slug}`}> 
                <Image
                  src={a.imageUrl}
                  alt={a.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-48"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/articles/${a.slug}`} className="hover:underline">
                    {a.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{a.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
