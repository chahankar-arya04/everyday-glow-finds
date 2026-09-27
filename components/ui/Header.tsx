import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-brand-green text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">
          Everyday Glow Finds
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/articles" className="hover:underline">Articles</Link>
        </nav>
      </div>
    </header>
  );
}
