'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Battery, Zap, Factory, Sun } from 'lucide-react';

const solutions = [
  {
    key: 'energy',
    icon: Battery,
    image: '/images/solutions/energy-storage.jpg',
    href: '/solutions/energy-storage',
    color: 'from-green-600 to-emerald-700',
  },
  {
    key: 'smart',
    icon: Zap,
    image: '/images/solutions/smart-grid.jpg',
    href: '/solutions/smart-grid',
    color: 'from-primary-600 to-primary-700',
  },
  {
    key: 'industrial',
    icon: Factory,
    image: '/images/solutions/industrial.jpg',
    href: '/solutions/industrial',
    color: 'from-gray-700 to-gray-900',
  },
  {
    key: 'renewable',
    icon: Sun,
    image: '/images/solutions/renewable.jpg',
    href: '/solutions/renewable',
    color: 'from-amber-500 to-orange-600',
  },
];

export default function SolutionsSection({ locale }: { locale: string }) {
  const t = useTranslations('solutions');

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <Link
              key={solution.key}
              href={solution.href}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${solution.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${solution.color} opacity-80`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                  <solution.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">
                  {t(`${solution.key}.title`)}
                </h3>
                <p className="text-sm text-white/80 text-center line-clamp-2">
                  {t(`${solution.key}.description`)}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                    {locale === 'zh' ? '了解更多' : 'Learn More'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}