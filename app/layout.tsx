import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://phenomenal-crostata-cc45ad.netlify.app'),
  title: 'Everyday Glow Finds',
  description: 'Simple beauty, wellness and lifestyle finds for a healthier everyday routine.',
  openGraph: {
    title: 'Everyday Glow Finds',
    description: 'Simple beauty, wellness and lifestyle finds for a healthier everyday routine.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Everyday Glow Finds',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Everyday Glow Finds' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@everydayglowfinds',
    title: 'Everyday Glow Finds',
    description: 'Simple beauty, wellness and lifestyle finds for a healthier everyday routine.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-cream min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
