'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CTASection({ locale }: { locale: string }) {
  const t = useTranslations('home.cta');

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-700 via-primary-800 to-secondary-900">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            {t('subtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors group"
          >
            {t('button')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}