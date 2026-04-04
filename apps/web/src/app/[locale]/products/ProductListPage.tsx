'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Filter, Download, ChevronRight, Grid, List } from 'lucide-react';
import { clsx } from 'clsx';

// 产品分类数据
const categories = [
  {
    id: 'mccb',
    name: { en: 'MCCB', zh: '塑壳断路器' },
    slug: 'mccb',
    description: { en: 'Molded Case Circuit Breakers', zh: '热磁式与电子式塑壳断路器' },
    image: '/images/products/mccb/category.jpg',
    count: 15,
    subcategories: [
      { slug: 'thermomagnetic', name: { en: 'Thermomagnetic', zh: '热磁式' } },
      { slug: 'electronic', name: { en: 'Electronic', zh: '电子式' } },
      { slug: 'residual-current', name: { en: 'Residual Current', zh: '剩余电流' } },
      { slug: 'iot', name: { en: 'IoT Smart', zh: '物联网智能' } },
      { slug: 'new-energy', name: { en: 'New Energy', zh: '新能源专用' } },
    ],
  },
  {
    id: 'mcb',
    name: { en: 'MCB', zh: '小型断路器' },
    slug: 'mcb',
    description: { en: 'Miniature Circuit Breakers', zh: '小型断路器及漏电保护器' },
    image: '/images/products/mcb/category.jpg',
    count: 8,
    subcategories: [
      { slug: 'standard', name: { en: 'Standard MCB', zh: '标准MCB' } },
      { slug: 'rcbo', name: { en: 'RCBO', zh: '漏电断路器' } },
      { slug: 'rccb', name: { en: 'RCCB', zh: '漏电保护器' } },
    ],
  },
  {
    id: 'circuit-protection',
    name: { en: 'Circuit Protection Devices', zh: '电路保护器件' },
    slug: 'circuit-protection',
    description: { en: 'SPD, MOV and Protection Devices', zh: '浪涌保护器、压敏电阻等' },
    image: '/images/products/protection/category.jpg',
    count: 6,
    subcategories: [
      { slug: 'spd', name: { en: 'SPD', zh: '浪涌保护器' } },
      { slug: 'mov', name: { en: 'MOV', zh: '压敏电阻' } },
    ],
  },
  {
    id: 'energy-storage',
    name: { en: 'Energy Storage Solutions', zh: '储能系统' },
    slug: 'energy-storage',
    description: { en: 'Microgrid & ESS Solutions', zh: '微电网与储能系统解决方案' },
    image: '/images/products/energy-storage/category.jpg',
    count: 4,
    subcategories: [
      { slug: 'all-in-one', name: { en: 'All-in-One ESS', zh: '一体式储能' } },
      { slug: 'commercial', name: { en: 'Commercial ESS', zh: '工商业储能' } },
    ],
  },
  {
    id: 'intelligent-devices',
    name: { en: 'Intelligent Devices', zh: '智能设备' },
    slug: 'intelligent-devices',
    description: { en: 'Smart Grid Devices', zh: '智能电网设备' },
    image: '/images/products/intelligent/category.jpg',
    count: 5,
    subcategories: [
      { slug: 'smart-fuse', name: { en: 'Smart Drop-out Fuse', zh: '智能跌落式熔断器' } },
      { slug: 'pole-breaker', name: { en: 'Pole-mounted Breaker', zh: '柱上断路器' } },
    ],
  },
  {
    id: 'rs485',
    name: { en: 'RS485 Communication Chip', zh: 'RS485通信芯片' },
    slug: 'rs485',
    description: { en: 'Serial Communication Chips', zh: '串行通信芯片' },
    image: '/images/products/rs485/category.jpg',
    count: 2,
    subcategories: [],
  },
  {
    id: 'accessories',
    name: { en: 'MCCB Accessories', zh: '断路器附件' },
    slug: 'accessories',
    description: { en: 'Accessories for MCCB/MCB', zh: '断路器配套附件' },
    image: '/images/products/accessories/category.jpg',
    count: 10,
    subcategories: [],
  },
];

export default function ProductListPage({ locale }: { locale: string }) {
  const t = useTranslations('products');
  const currentLocale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-200">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('tryAdjusting')}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('categories')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="card group overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={currentLocale === 'zh' ? category.name.zh : category.name.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">
                      {currentLocale === 'zh' ? category.name.zh : category.name.en}
                    </h3>
                    <p className="text-sm text-white/80">
                      {currentLocale === 'zh' ? category.description.zh : category.description.en}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {category.count} {currentLocale === 'zh' ? '款产品' : 'Products'}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('featured')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 这里会动态加载推荐产品 */}
            <div className="text-center text-gray-500 py-8">
              {currentLocale === 'zh' ? '点击分类查看产品详情' : 'Click a category to view products'}
            </div>
          </div>
        </div>

        {/* Download Catalog */}
        <div className="mt-8 bg-primary-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentLocale === 'zh' ? '下载产品目录' : 'Download Product Catalog'}
            </h3>
            <p className="text-gray-600">
              {currentLocale === 'zh' ? '获取完整产品规格手册' : 'Get complete product specifications'}
            </p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            {t('downloadCatalog')}
          </button>
        </div>
      </div>
    </div>
  );
}