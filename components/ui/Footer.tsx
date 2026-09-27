import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cream text-gray-700 py-6 mt-8 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Everyday Glow Finds. All rights reserved.</p>
        <p className="mt-2">
          <Link href="https://www.pinterest.com/RootedInGlow/" target="_blank" className="hover:underline">
            Follow us on Pinterest
          </Link>
        </p>
      </div>
    </footer>
  );
}
