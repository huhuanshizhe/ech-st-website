'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('home.hero');

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background with Pattern */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          background: `
            linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(15,23,42,0.75) 50%, rgba(30,58,138,0.85) 100%),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px),
            radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147,51,234,0.2) 0%, transparent 50%)
          `,
        }}
      >
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container-custom">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-white font-medium mb-8 max-w-2xl drop-shadow-md">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn-primary group"
              >
                {t('cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20"
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white">20+</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '年行业经验' : 'Years Experience'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '出口国家' : 'Export Countries'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '产品型号' : 'Product Models'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">ISO</div>
              <div className="text-sm text-gray-300">
                {locale === 'zh' ? '国际认证' : 'Certified'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}