import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/sanity';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Article Not Found – Everyday Glow Finds' };
  return {
    title: `${article.title} | Everyday Glow Finds`,
    description: article.description || 'Curated wellness routines and guides.',
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-stone-900 transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-stone-800 font-medium truncate max-w-xs">{article.title}</span>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-4">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              {article.description}
            </p>
          )}
        </header>

        {article.imageUrl && (
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-stone-100 mb-10 border border-stone-200/80">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-6">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p>
              In this guide, we explore simple, natural routines and ingredient insights for mindful self-care. Check out our curated product recommendations on the home page for simple, factual additions to your everyday routine.
            </p>
          )}
        </div>

        <div className="mt-12 pt-6 border-t border-stone-200">
          <Link href="/products" className="inline-flex items-center font-semibold text-emerald-800 hover:text-emerald-900 text-sm">
            ← Explore Curated Hair & Skin Care Products
          </Link>
        </div>
      </article>
    </div>
  );
}
