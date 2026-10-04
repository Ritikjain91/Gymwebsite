import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeContext';

export const metadata: Metadata = {
  title: 'RAW FIT GYM | Premium Gym Franchise & Luxury Athletic Club',
  description:
    'Explore RAW FIT GYM premium institutional gym franchise opportunities with PRIME (₹1.80 Cr) and LUXURY (₹3.20 Cr) formats. High-retention biomechanical strength, 4°C cryo cold plunge suites, and certified master coaching.',
  keywords: [
    'gym franchise',
    'fitness franchise india',
    'raw fit gym',
    'luxury gym franchise',
    'prime gym franchise',
    'cold plunge gym',
    'fitness investment',
  ],
  authors: [{ name: 'RAW FIT GYM Corporate' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'RAW FIT GYM | Premium Gym Franchise & Luxury Athletic Club',
    description:
      'Explore RAW FIT GYM premium gym franchise opportunities with PRIME and LUXURY formats designed for athletic performance and institutional profitability.',
    url: 'https://rawfitgym.com',
    siteName: 'RAW FIT GYM',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'RAW FIT GYM Flagship Interior',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased selection:bg-[var(--gold-primary)] selection:text-black">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
