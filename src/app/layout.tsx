import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeContext';


export const metadata: Metadata = {
  metadataBase: new URL('https://fitandfab.com'),
  title: 'FIT&FAB | Human Performance Sanctuary • Feeling Good Being Fit',
  description:
    'Being fit is the new sexy in this century. At FIT&FAB, we offer you the best & experienced trainers, Olympic calibrated iron, 4°C cryo contrast recovery, and permanent physical transformation.',
  keywords: [
    'fit and fab',
    'fit&fab gym',
    'gym franchise',
    'fitness athlete',
    'feeling good being fit',
    'luxury gym',
    'cold plunge gym',
  ],
  authors: [{ name: 'FIT&FAB Performance' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'FIT&FAB | Human Performance Sanctuary • Feeling Good Being Fit',
    description:
      'Being fit is the new sexy in this century. At FIT&FAB, experience elite athletic training and 3D equipment showroom.',
    url: 'https://fitandfab.com',
    siteName: 'FIT&FAB',
    images: [
      {
        url: '/fitfab-hero-athlete.jpg',
        width: 1200,
        height: 675,
        alt: 'FIT&FAB Hero Athlete',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Syne:wght@700;800&family=Outfit:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[var(--gold-primary)] selection:text-black">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

