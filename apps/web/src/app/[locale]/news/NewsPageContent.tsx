'use client';

import { useTranslations } from 'next-intl';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const newsArticles = [
  {
    id: 1,
    category: 'company',
    date: '2024-03-15',
    titleEn: 'ECH-ST Launches New DC Circuit Breaker Series for Energy Storage',
    titleZh: 'ECH-ST 推出用于储能的新型直流断路器系列',
    excerptEn: 'Our latest DC circuit breakers feature enhanced safety and reliability for energy storage applications.',
    excerptZh: '我们最新的直流断路器为储能应用提供增强的安全性和可靠性。',
    image: '/images/news/news-1.jpg',
  },
  {
    id: 2,
    category: 'product',
    date: '2024-02-28',
    titleEn: 'New MCCB Series with Intelligent Monitoring Capabilities',
    titleZh: '具有智能监控功能的新型 MCCB 系列',
    excerptEn: 'Advanced monitoring and communication features for smart industrial applications.',
    excerptZh: '为智能工业应用提供先进的监控和通信功能。',
    image: '/images/news/news-2.jpg',
  },
  {
    id: 3,
    category: 'industry',
    date: '2024-02-10',
    titleEn: 'The Future of Circuit Protection in Renewable Energy Systems',
    titleZh: '可再生能源系统中电路保护的未来',
    excerptEn: 'Exploring the evolving requirements for circuit protection in solar and wind power installations.',
    excerptZh: '探索太阳能和风能发电装置中电路保护不断发展的需求。',
    image: '/images/news/news-3.jpg',
  },
  {
    id: 4,
    category: 'company',
    date: '2024-01-20',
    titleEn: 'ECH-ST Expands Production Capacity to Meet Growing Demand',
    titleZh: 'ECH-ST 扩大产能以满足不断增长的需求',
    excerptEn: 'New manufacturing facility in Wenzhou to double production capacity by Q3 2024.',
    excerptZh: '温州新制造工厂将在 2024 年第三季度将产能翻倍。',
    image: '/images/news/news-4.jpg',
  },
  {
    id: 5,
    category: 'product',
    date: '2024-01-05',
    titleEn: 'Enhanced SPD Series for Better Surge Protection',
    titleZh: '增强型 SPD 系列提供更好的浪涌保护',
    excerptEn: 'Our upgraded surge protection devices offer faster response times and higher energy absorption.',
    excerptZh: '我们升级的浪涌保护器件提供更快的响应时间和更高的能量吸收能力。',
    image: '/images/news/news-5.jpg',
  },
  {
    id: 6,
    category: 'industry',
    date: '2023-12-15',
    titleEn: 'Understanding IEC Standards for Low-Voltage Circuit Breakers',
    titleZh: '了解低压断路器的 IEC 标准',
    excerptEn: 'A comprehensive guide to international standards and compliance requirements.',
    excerptZh: '国际标准和合规要求的综合指南。',
    image: '/images/news/news-6.jpg',
  },
];

const categoryLabels = {
  company: { en: 'Company News', zh: '公司新闻' },
  product: { en: 'Product Updates', zh: '产品动态' },
  industry: { en: 'Industry Insights', zh: '行业资讯' },
};

const categoryColors = {
  company: 'bg-blue-100 text-blue-700',
  product: 'bg-green-100 text-green-700',
  industry: 'bg-purple-100 text-purple-700',
};

export default function NewsPageContent({ locale }: { locale: string }) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {locale === 'zh' ? '新闻中心' : 'News Center'}
            </h1>
            <p className="text-xl text-gray-200">
              {locale === 'zh'
                ? '了解 ECH-ST 电气的最新动态、产品信息和行业资讯'
                : 'Stay updated with ECH-ST Electrics latest news, product information and industry insights.'}
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    {locale === 'zh' ? '新闻图片' : 'News Image'}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        categoryColors[article.category as keyof typeof categoryColors]
                      }`}
                    >
                      {
                        categoryLabels[article.category as keyof typeof categoryLabels][
                          locale === 'zh' ? 'zh' : 'en'
                        ]
                      }
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {locale === 'zh' ? article.titleZh : article.titleEn}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {locale === 'zh' ? article.excerptZh : article.excerptEn}
                  </p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                  >
                    {locale === 'zh' ? '阅读更多' : 'Read More'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="flex justify-center items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50">
              {locale === 'zh' ? '上一页' : 'Previous'}
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
              3
            </button>
            <span className="px-2 text-gray-600">...</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
              {locale === 'zh' ? '下一页' : 'Next'}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'zh' ? '订阅我们的新闻' : 'Subscribe to Our Newsletter'}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {locale === 'zh'
                ? '获取最新的产品更新、行业资讯和技术支持'
                : 'Get the latest product updates, industry insights and technical support.'}
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder={locale === 'zh' ? '您的邮箱' : 'Your Email'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                {locale === 'zh' ? '订阅' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
