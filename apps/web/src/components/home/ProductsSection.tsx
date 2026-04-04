'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, Download } from 'lucide-react';

// 模拟产品数据
const featuredProducts = [
  {
    id: '1',
    name: { en: 'MCCB Series', zh: '塑壳断路器系列' },
    model: 'ECHSTM6',
    image: '/images/products/mccb/main.jpg',
    category: 'mccb',
    description: { en: 'Thermomagnetic & Electronic Molded Case Circuit Breakers', zh: '热磁式与电子式塑壳断路器' },
  },
  {
    id: '2',
    name: { en: 'MCB Series', zh: '小型断路器系列' },
    model: 'ECHMCB',
    image: '/images/products/mcb/main.jpg',
    category: 'mcb',
    description: { en: 'Miniature Circuit Breakers for residential & commercial', zh: '住宅与商用小型断路器' },
  },
  {
    id: '3',
    name: { en: 'SPD Series', zh: '浪涌保护器系列' },
    model: 'ECHSPD',
    image: '/images/products/spd/main.jpg',
    category: 'circuit-protection',
    description: { en: 'Surge Protective Devices for power systems', zh: '电力系统浪涌保护器' },
  },
  {
    id: '4',
    name: { en: 'MOV Series', zh: '压敏电阻系列' },
    model: 'ECHMOV',
    image: '/images/products/mov/main.jpg',
    category: 'circuit-protection',
    description: { en: 'Metal Oxide Varistor for voltage protection', zh: '金属氧化物压敏电阻' },
  },
  {
    id: '5',
    name: { en: 'Energy Storage System', zh: '储能系统' },
    model: 'ECH-ESS',
    image: '/images/products/energy-storage/main.jpg',
    category: 'energy-storage',
    description: { en: 'Complete microgrid energy storage solutions', zh: '完整微电网储能解决方案' },
  },
  {
    id: '6',
    name: { en: 'IoT Smart Breaker', zh: '物联网智能断路器' },
    model: 'ECHSTM6ZY',
    image: '/images/products/iot/main.jpg',
    category: 'intelligent-devices',
    description: { en: 'Remote monitoring & control circuit breakers', zh: '远程监控智能断路器' },
  },
];

export default function ProductsSection({ locale }: { locale: string }) {
  const t = useTranslations('home.products');

  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="section-title">{t('title')}</h2>
            <p className="section-subtitle">{t('subtitle')}</p>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center text-primary-600 font-medium hover:text-primary-700 group"
          >
            {t('viewAll')}
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.category}/${product.id}`}
              className="card group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={locale === 'zh' ? product.name.zh : product.name.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-white text-sm">
                    <Download className="w-4 h-4" />
                    {locale === 'zh' ? '下载规格书' : 'Download Datasheet'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-primary-600 font-medium mb-1">
                  {product.model}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {locale === 'zh' ? product.name.zh : product.name.en}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {locale === 'zh' ? product.description.zh : product.description.en}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}