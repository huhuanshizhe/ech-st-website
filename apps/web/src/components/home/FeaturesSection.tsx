'use client';

import { useTranslations } from 'next-intl';
import { Award, Lightbulb, Globe, Headphones, LucideIcon } from 'lucide-react';

type ColorKey = 'primary' | 'accent' | 'green' | 'purple';

const features: { key: string; icon: LucideIcon; color: ColorKey }[] = [
  { key: 'quality', icon: Award, color: 'primary' },
  { key: 'innovation', icon: Lightbulb, color: 'accent' },
  { key: 'global', icon: Globe, color: 'green' },
  { key: 'support', icon: Headphones, color: 'purple' },
];

const colorClasses: Record<ColorKey, string> = {
  primary: 'bg-primary-100 text-primary-600',
  accent: 'bg-amber-100 text-amber-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
};

export default function FeaturesSection() {
  const t = useTranslations('home.features');

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.key}
              className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-xl ${colorClasses[feature.color]} flex items-center justify-center mx-auto mb-4`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`${feature.key}.title`)}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(`${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}