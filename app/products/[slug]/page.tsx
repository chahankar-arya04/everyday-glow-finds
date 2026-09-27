import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/sanity';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Image src={product.imageUrl} alt={product.title} width={600} height={400} className="object-cover" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="mb-4 text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-brand-green mb-4">${product.price}</p>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-green text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Buy Now
          </a>
        </div>
      </div>
      <div className="mt-6">
        <Link href="/products" className="text-brand-green hover:underline">← Back to Products</Link>
      </div>
    </div>
  );
}
