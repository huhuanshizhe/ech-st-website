import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ech-st.com'),
  title: {
    default: 'ECH-ST Electrics | Professional Circuit Protection & Energy Storage Solutions',
    template: '%s | ECH-ST Electrics',
  },
  description: 'ECH-ST Electrics is a leading manufacturer of circuit breakers, protection devices, and energy storage systems. Quality electrical solutions for global markets.',
  keywords: ['circuit breaker', 'MCCB', 'MCB', 'SPD', 'MOV', 'energy storage', 'microgrid', 'smart grid'],
  authors: [{ name: 'ECH-ST Electrics' }],
  creator: 'ECH-ST Electrics',
  publisher: 'ECH-ST Electrics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    url: 'https://www.ech-st.com',
    siteName: 'ECH-ST Electrics',
    title: 'ECH-ST Electrics | Professional Circuit Protection & Energy Storage Solutions',
    description: 'Leading manufacturer of circuit breakers, protection devices, and energy storage systems.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ECH-ST Electrics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECH-ST Electrics',
    description: 'Professional Circuit Protection & Energy Storage Solutions Provider',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}