import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/config/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://ech-st.com'),
  title: {
    default: 'ECH-ST Electrics | Professional Circuit Protection & Energy Storage Solutions',
    template: '%s | ECH-ST Electrics',
  },
  description: 'ECH-ST Electrics is a leading manufacturer of circuit breakers, protection devices, and energy storage systems. Quality electrical solutions for global markets.',
  keywords: ['circuit breaker', 'MCCB', 'MCB', 'SPD', 'energy storage', 'electrical protection', '断路器', '储能系统'],
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
    url: 'https://ech-st.com',
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
    description: 'Professional Circuit Protection & Energy Storage Solutions',
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
  alternates: {
    canonical: 'https://ech-st.com',
    languages: {
      'en-US': 'https://ech-st.com/en',
      'zh-CN': 'https://ech-st.com/zh',
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <ChatWidget locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}