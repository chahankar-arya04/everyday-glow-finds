import Link from 'next/link';
import Image from 'next/image';

type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  tags: string[];
  demo?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>
        <p className="text-gray-700 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-brand-green font-bold">${product.price}</p>
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-brand-green text-white py-1 px-3 rounded hover:bg-green-600"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}
